import { useRef, useState, useEffect } from 'react'
import Template1 from './templates/Template1'
import Template2 from './templates/Template2'
import Template3 from './templates/Template3'
import Template4 from './templates/Template4'
import Template5 from './templates/Template5'
import Template6 from './templates/Template6'
import Template7 from './templates/Template7'
import DropdownButton from './DropdownButton'
import { generatePDF } from '../utils/pdfGenerator'
import { exportToWord } from '../utils/wordExporter'
import { exportToTXT, exportToHTML, exportToJSON, downloadFile } from '../utils/exportFormats'

const ResumePreview = ({ data, templateId, colorTheme = 'blue', customColor = null, selectedFont = 'Segoe UI', fontSize = 'medium', previewMode = 'desktop', onBack, onSave, coverLetterData, userName, resumeId }) => {
  const resumeRef = useRef(null)
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [printMode, setPrintMode] = useState(false)
  const exportMenuRef = useRef(null)

  // Close export menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target)) {
        setShowExportMenu(false)
      }
    }

    if (showExportMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showExportMenu])

  const handleDownload = async () => {
    try {
      generatePDF(resumeRef.current, data.personalInfo.fullName || 'resume')
      // Track download
      if (userName && resumeId) {
        const { trackResumeDownload } = await import('../utils/analyticsTracker')
        trackResumeDownload(userName, resumeId)
      }
    } catch (error) {
      alert('Error downloading PDF: ' + error.message)
    }
  }

  const handleDownloadWord = async () => {
    try {
      setIsExporting(true)
      await exportToWord(data, data.personalInfo.fullName || 'resume')
      if (userName && resumeId) {
        const { trackResumeDownload } = await import('../utils/analyticsTracker')
        trackResumeDownload(userName, resumeId)
      }
    } catch (error) {
      alert('Error exporting to Word: ' + error.message)
    } finally {
      setIsExporting(false)
    }
  }

  const handleExport = async (format) => {
    try {
      setIsExporting(true)
      const filename = data.personalInfo?.fullName || 'resume'
      
      switch(format) {
        case 'txt':
          const txtContent = exportToTXT(data)
          downloadFile(txtContent, `${filename}.txt`, 'text/plain')
          break
        case 'html':
          const htmlContent = exportToHTML(data, templateId)
          downloadFile(htmlContent, `${filename}.html`, 'text/html')
          break
        case 'json':
          const jsonContent = exportToJSON(data, templateId, coverLetterData)
          downloadFile(jsonContent, `${filename}.json`, 'application/json')
          break
        case 'rtf':
          // RTF export - simple text format
          const rtfContent = `{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Times New Roman;}}\\f0\\fs24 ${exportToTXT(data).replace(/\n/g, '\\par ')}}`
          downloadFile(rtfContent, `${filename}.rtf`, 'application/rtf')
          break
        case 'markdown':
          // Markdown export
          let mdContent = `# ${data.personalInfo?.fullName || 'Resume'}\n\n`
          mdContent += `**Email:** ${data.personalInfo?.email || ''}\n`
          mdContent += `**Phone:** ${data.personalInfo?.phone || ''}\n\n`
          if (data.summary) {
            mdContent += `## Professional Summary\n\n${data.summary}\n\n`
          }
          if (data.experience && data.experience.length > 0) {
            mdContent += `## Work Experience\n\n`
            data.experience.forEach(exp => {
              mdContent += `### ${exp.position} at ${exp.company}\n`
              mdContent += `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}\n`
              if (exp.description) mdContent += `${exp.description}\n\n`
            })
          }
          downloadFile(mdContent, `${filename}.md`, 'text/markdown')
          break
        default:
          break
      }
      
      if (userName && resumeId) {
        const { trackResumeDownload } = await import('../utils/analyticsTracker')
        trackResumeDownload(userName, resumeId)
      }
      
      setShowExportMenu(false)
    } catch (error) {
      alert('Error exporting: ' + error.message)
    } finally {
      setIsExporting(false)
    }
  }

  const handlePrintPreview = () => {
    setPrintMode(true)
    setTimeout(() => {
      window.print()
      setTimeout(() => setPrintMode(false), 100)
    }, 100)
  }

  const handlePrintSettings = () => {
    // Open print dialog with settings
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Print Resume - ${data.personalInfo?.fullName || 'Resume'}</title>
            <style>
              @page {
                size: A4;
                margin: 0.5in;
              }
              body {
                margin: 0;
                padding: 0;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              }
              .resume-wrapper {
                width: 100%;
                max-width: 100%;
              }
            </style>
          </head>
          <body>
            ${resumeRef.current?.innerHTML || ''}
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.focus()
      setTimeout(() => {
        printWindow.print()
        printWindow.close()
      }, 250)
    }
  }

  const renderTemplate = () => {
    switch(templateId) {
      case 1:
        return <Template1 data={data} />
      case 2:
        return <Template2 data={data} />
      case 3:
        return <Template3 data={data} />
      case 4:
        return <Template4 data={data} colorTheme={colorTheme} />
      case 5:
        return <Template5 data={data} colorTheme={colorTheme} />
      case 6:
        return <Template6 data={data} colorTheme={colorTheme} />
      case 7:
        return <Template7 data={data} colorTheme={colorTheme} />
      default:
        return <Template1 data={data} />
    }
  }

  return (
    <div className="resume-preview">
      <div className="preview-header">
        <h2>Your Resume Preview</h2>
        <div className="preview-actions">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('openCustomization'))} 
            className="btn-customize"
            title="Customize Font, Colors, and Preview Mode"
          >
            🎨 Customize
          </button>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('openEmailIntegration'))} 
            className="btn-email-send"
            title="Send Resume via Email"
          >
            📧 Email Resume
          </button>
          <button onClick={onBack} className="btn-secondary">
            ← Back
          </button>
          {onSave && (
            <DropdownButton
              label="💾 Save"
              options={saveOptions}
              onSelect={handleSaveSelect}
              className="save-dropdown"
              buttonClassName="btn-save"
            />
          )}
          <DropdownButton
            label="🖨️ Print"
            options={printOptions}
            onSelect={handlePrintSelect}
            className="print-dropdown"
            buttonClassName="btn-print"
          />
          <DropdownButton
            label={isExporting ? '⏳ Exporting...' : '📤 Export'}
            options={exportOptions}
            onSelect={handleExportSelect}
            className="export-dropdown"
            buttonClassName="btn-export"
            align="right"
          />
          <DropdownButton
            label="📥 Download"
            options={downloadOptions}
            onSelect={handleDownloadSelect}
            className="download-dropdown"
            buttonClassName="btn-primary"
            align="right"
          />
        </div>
      </div>

      <div className={`preview-container ${printMode ? 'print-mode' : ''} preview-${previewMode}`}>
        <div 
          className="resume-wrapper" 
          ref={resumeRef}
          style={{
            fontFamily: selectedFont,
            fontSize: getFontSize(),
            '--custom-color': customColor || (colorTheme === 'blue' ? '#667eea' : colorTheme === 'green' ? '#48bb78' : colorTheme === 'purple' ? '#9f7aea' : colorTheme === 'red' ? '#f56565' : colorTheme === 'orange' ? '#ed8936' : colorTheme === 'teal' ? '#38b2ac' : colorTheme === 'pink' ? '#ed64a6' : '#667eea')
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  )
}

export default ResumePreview

