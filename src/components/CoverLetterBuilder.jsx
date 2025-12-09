import { useState, useEffect } from 'react'
import { exportToWord } from '../utils/wordExporter'
import { generatePDF } from '../utils/pdfGenerator'

const COVER_LETTER_TEMPLATES = [
  {
    id: 1,
    name: 'Professional Standard',
    greeting: 'Dear Hiring Manager,',
    closing: 'Sincerely,'
  },
  {
    id: 2,
    name: 'Formal Business',
    greeting: 'Dear Sir/Madam,',
    closing: 'Yours faithfully,'
  },
  {
    id: 3,
    name: 'Friendly Professional',
    greeting: 'Hello,',
    closing: 'Best regards,'
  },
  {
    id: 4,
    name: 'Creative Industry',
    greeting: 'Hi there,',
    closing: 'Cheers,'
  },
  {
    id: 5,
    name: 'Academic/Research',
    greeting: 'Dear Dr./Professor [Last Name],',
    closing: 'Respectfully,'
  }
]

const CoverLetterBuilder = ({ isOpen, onClose, resumeData, onSave, userName, resumeId }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(1)
  const [coverLetter, setCoverLetter] = useState({
    greeting: 'Dear Hiring Manager,',
    paragraph1: '',
    paragraph2: '',
    paragraph3: '',
    closing: 'Sincerely,',
    signature: ''
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (isOpen && resumeData) {
      // Auto-fill signature with name
      const name = resumeData.personalInfo?.fullName || ''
      setCoverLetter(prev => ({
        ...prev,
        signature: name
      }))
    }
  }, [isOpen, resumeData])

  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId)
    const template = COVER_LETTER_TEMPLATES.find(t => t.id === templateId)
    if (template) {
      setCoverLetter(prev => ({
        ...prev,
        greeting: template.greeting,
        closing: template.closing
      }))
    }
  }

  const handleSave = async () => {
    if (!coverLetter.paragraph1 && !coverLetter.paragraph2 && !coverLetter.paragraph3) {
      alert('Please write at least one paragraph before saving.')
      return
    }
    
    setIsSaving(true)
    try {
      if (onSave) {
        await onSave(coverLetter)
        alert('Cover letter saved successfully!')
      }
    } catch (error) {
      alert('Error saving cover letter: ' + error.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDownloadPDF = () => {
    const coverLetterElement = document.querySelector('.cover-letter-preview')
    if (coverLetterElement) {
      generatePDF(coverLetterElement, `${resumeData?.personalInfo?.fullName || 'cover-letter'}_cover-letter`)
    }
  }

  const handleDownloadWord = async () => {
    try {
      // Create a simple document structure for Word export
      const content = `
${resumeData?.personalInfo?.fullName || ''}
${resumeData?.personalInfo?.email || ''}
${resumeData?.personalInfo?.phone || ''}

${new Date().toLocaleDateString()}

${coverLetter.greeting}

${coverLetter.paragraph1}

${coverLetter.paragraph2}

${coverLetter.paragraph3}

${coverLetter.closing}

${coverLetter.signature}
      `.trim()
      
      // Use a simple text export for now (can be enhanced with proper Word formatting)
      const blob = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${resumeData?.personalInfo?.fullName || 'cover-letter'}_cover-letter.txt`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      alert('Error downloading cover letter: ' + error.message)
    }
  }

  if (!isOpen) return null

  return (
    <div className="cover-letter-modal">
      <div className="cover-letter-content">
        <div className="cover-letter-header">
          <h2>📝 Cover Letter Builder</h2>
          <button onClick={onClose} className="btn-close">✕</button>
        </div>

        <div className="cover-letter-body">
          {/* Template Selection */}
          <div className="template-selector-section">
            <label>Select Template:</label>
            <select 
              value={selectedTemplate} 
              onChange={(e) => handleTemplateChange(parseInt(e.target.value))}
              className="template-select"
            >
              {COVER_LETTER_TEMPLATES.map(template => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>

          {/* Form Fields */}
          <div className="cover-letter-form">
            <div className="form-group">
              <label>Greeting:</label>
              <input
                type="text"
                value={coverLetter.greeting}
                onChange={(e) => setCoverLetter(prev => ({ ...prev, greeting: e.target.value }))}
                placeholder="Dear Hiring Manager,"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>First Paragraph (Introduction):</label>
              <textarea
                value={coverLetter.paragraph1}
                onChange={(e) => setCoverLetter(prev => ({ ...prev, paragraph1: e.target.value }))}
                placeholder="I am writing to express my interest in the [Position] role at [Company]..."
                rows={4}
                className="form-textarea"
              />
            </div>

            <div className="form-group">
              <label>Second Paragraph (Why You):</label>
              <textarea
                value={coverLetter.paragraph2}
                onChange={(e) => setCoverLetter(prev => ({ ...prev, paragraph2: e.target.value }))}
                placeholder="With my experience in [relevant experience], I am confident that I would be a valuable addition to your team..."
                rows={4}
                className="form-textarea"
              />
            </div>

            <div className="form-group">
              <label>Third Paragraph (Closing):</label>
              <textarea
                value={coverLetter.paragraph3}
                onChange={(e) => setCoverLetter(prev => ({ ...prev, paragraph3: e.target.value }))}
                placeholder="I would welcome the opportunity to discuss how my skills and experience align with your needs..."
                rows={4}
                className="form-textarea"
              />
            </div>

            <div className="form-group">
              <label>Closing:</label>
              <input
                type="text"
                value={coverLetter.closing}
                onChange={(e) => setCoverLetter(prev => ({ ...prev, closing: e.target.value }))}
                placeholder="Sincerely,"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Signature:</label>
              <input
                type="text"
                value={coverLetter.signature}
                onChange={(e) => setCoverLetter(prev => ({ ...prev, signature: e.target.value }))}
                placeholder={resumeData?.personalInfo?.fullName || 'Your Name'}
                className="form-input"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="cover-letter-preview-section">
            <h3>Preview</h3>
            <div className="cover-letter-preview">
              <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
                <div style={{ marginBottom: '20px' }}>
                  <div>{resumeData?.personalInfo?.fullName || ''}</div>
                  <div>{resumeData?.personalInfo?.email || ''}</div>
                  <div>{resumeData?.personalInfo?.phone || ''}</div>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  {new Date().toLocaleDateString()}
                </div>
                
                <div style={{ marginBottom: '10px' }}>{coverLetter.greeting}</div>
                
                <div style={{ marginBottom: '15px', textAlign: 'justify' }}>
                  {coverLetter.paragraph1 || <span style={{ color: '#999' }}>First paragraph...</span>}
                </div>
                
                <div style={{ marginBottom: '15px', textAlign: 'justify' }}>
                  {coverLetter.paragraph2 || <span style={{ color: '#999' }}>Second paragraph...</span>}
                </div>
                
                <div style={{ marginBottom: '15px', textAlign: 'justify' }}>
                  {coverLetter.paragraph3 || <span style={{ color: '#999' }}>Third paragraph...</span>}
                </div>
                
                <div style={{ marginTop: '20px', marginBottom: '10px' }}>{coverLetter.closing}</div>
                
                <div style={{ marginTop: '40px' }}>{coverLetter.signature}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="cover-letter-actions">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button onClick={handleDownloadWord} className="btn-word">
            📄 Download Word
          </button>
          <button onClick={handleDownloadPDF} className="btn-primary">
            📥 Download PDF
          </button>
          <button onClick={handleSave} className="btn-save" disabled={isSaving}>
            {isSaving ? '💾 Saving...' : '💾 Save Cover Letter'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CoverLetterBuilder

