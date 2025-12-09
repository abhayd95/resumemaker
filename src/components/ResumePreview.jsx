import { useRef, useState, useEffect } from 'react'
import Template1 from './templates/Template1'
import Template2 from './templates/Template2'
import Template3 from './templates/Template3'
import Template4 from './templates/Template4'
import Template5 from './templates/Template5'
import Template6 from './templates/Template6'
import Template7 from './templates/Template7'
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
          <button onClick={onBack} className="btn-secondary">
            ← Back
          </button>
          {onSave && (
            <button onClick={onSave} className="btn-save">
              💾 Save
            </button>
          )}
          <div className="print-actions" style={{ position: 'relative' }}>
            <button onClick={handlePrintPreview} className="btn-print">
              🖨️ Print
            </button>
            <button onClick={handlePrintSettings} className="btn-print-settings" title="Print with Settings">
              ⚙️
            </button>
          </div>
          <div className="export-dropdown" style={{ position: 'relative' }} ref={exportMenuRef}>
            <button 
              onClick={() => setShowExportMenu(!showExportMenu)} 
              className="btn-export"
              disabled={isExporting}
            >
              {isExporting ? '⏳ Exporting...' : '📤 Export'}
            </button>
            {showExportMenu && (
              <div className="export-menu">
                <button onClick={() => handleExport('txt')} className="export-option">
                  📝 Plain Text (.txt)
                </button>
                <button onClick={() => handleExport('html')} className="export-option">
                  🌐 HTML (.html)
                </button>
                <button onClick={() => handleExport('json')} className="export-option">
                  💾 JSON (.json)
                </button>
              </div>
            )}
          </div>
          <button onClick={handleDownloadWord} className="btn-word">
            📄 Download Word
          </button>
          <button onClick={handleDownload} className="btn-primary">
            📥 Download PDF
          </button>
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

