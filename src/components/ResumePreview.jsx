import { useRef } from 'react'
import Template1 from './templates/Template1'
import Template2 from './templates/Template2'
import Template3 from './templates/Template3'
import Template4 from './templates/Template4'
import Template5 from './templates/Template5'
import Template6 from './templates/Template6'
import Template7 from './templates/Template7'
import { generatePDF } from '../utils/pdfGenerator'

const ResumePreview = ({ data, templateId, colorTheme = 'blue', onBack, onSave }) => {
  const resumeRef = useRef(null)

  const handleDownload = () => {
    generatePDF(resumeRef.current, data.personalInfo.fullName || 'resume')
  }

  const handlePrintPreview = () => {
    window.print()
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
          <button onClick={onBack} className="btn-secondary">
            ← Back
          </button>
          {onSave && (
            <button onClick={onSave} className="btn-save">
              💾 Save
            </button>
          )}
          <button onClick={handlePrintPreview} className="btn-print">
            🖨️ Print Preview
          </button>
          <button onClick={handleDownload} className="btn-primary">
            📥 Download PDF
          </button>
        </div>
      </div>

      <div className="preview-container">
        <div className="resume-wrapper" ref={resumeRef}>
          {renderTemplate()}
        </div>
      </div>
    </div>
  )
}

export default ResumePreview

