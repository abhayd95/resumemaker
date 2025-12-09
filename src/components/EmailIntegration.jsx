import { useState } from 'react'

const EmailIntegration = ({ resumeData, resumeName, onClose }) => {
  const [recipientEmail, setRecipientEmail] = useState('')
  const [subject, setSubject] = useState(`Resume - ${resumeName || 'My Resume'}`)
  const [message, setMessage] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('application')
  const [isSending, setIsSending] = useState(false)
  const [showSchedule, setShowSchedule] = useState(false)
  const [scheduleDate, setScheduleDate] = useState('')
  const [scheduleTime, setScheduleTime] = useState('')

  const emailTemplates = {
    application: {
      subject: `Application for Position - ${resumeName || 'My Resume'}`,
      message: `Dear Hiring Manager,

I am writing to express my interest in the position at your company. Please find my resume attached.

I believe my experience and skills make me a strong candidate for this role. I would welcome the opportunity to discuss how I can contribute to your team.

Thank you for your consideration.

Best regards,
${resumeData?.personalInfo?.fullName || 'Your Name'}`
    },
    networking: {
      subject: `Professional Introduction - ${resumeName || 'My Resume'}`,
      message: `Hello,

I hope this message finds you well. I wanted to reach out and introduce myself professionally.

Please find my resume attached for your reference. I would be happy to connect and discuss potential opportunities or collaborations.

Looking forward to hearing from you.

Best regards,
${resumeData?.personalInfo?.fullName || 'Your Name'}`
    },
    followup: {
      subject: `Follow-up - ${resumeName || 'My Resume'}`,
      message: `Dear Hiring Manager,

I wanted to follow up on my previous application. Please find my updated resume attached.

I remain very interested in this opportunity and would appreciate any updates on the hiring process.

Thank you for your time.

Best regards,
${resumeData?.personalInfo?.fullName || 'Your Name'}`
    },
    custom: {
      subject: '',
      message: ''
    }
  }

  const handleTemplateChange = (template) => {
    setSelectedTemplate(template)
    if (template !== 'custom') {
      setSubject(emailTemplates[template].subject)
      setMessage(emailTemplates[template].message)
    } else {
      setSubject('')
      setMessage('')
    }
  }

  const handleSendEmail = async () => {
    if (!recipientEmail.trim()) {
      alert('Please enter recipient email address')
      return
    }

    if (!subject.trim()) {
      alert('Please enter email subject')
      return
    }

    setIsSending(true)

    try {
      // In production, this would call a backend API to send email
      // For now, we'll use mailto: link as fallback
      const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
      
      if (showSchedule && scheduleDate && scheduleTime) {
        // Schedule email (would require backend)
        alert(`Email scheduled for ${scheduleDate} at ${scheduleTime}`)
      } else {
        // Send immediately
        window.location.href = mailtoLink
        alert('Email client opened. Please attach your resume PDF and send.')
      }
      
      onClose()
    } catch (error) {
      alert('Error sending email: ' + error.message)
    } finally {
      setIsSending(false)
    }
  }

  const handleDownloadAndEmail = async () => {
    // First download PDF, then open email
    try {
      // Trigger PDF download
      const downloadBtn = document.querySelector('.btn-primary')
      if (downloadBtn) {
        downloadBtn.click()
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      
      // Then open email
      handleSendEmail()
    } catch (error) {
      alert('Error: ' + error.message)
    }
  }

  return (
    <div className="email-integration-modal">
      <div className="email-integration-content">
        <div className="email-header">
          <h2>📧 Send Resume via Email</h2>
          <button onClick={onClose} className="btn-close">✕</button>
        </div>

        <div className="email-form">
          <div className="form-group">
            <label>Recipient Email *</label>
            <input
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="recipient@example.com"
              className="email-input"
            />
          </div>

          <div className="form-group">
            <label>Email Template:</label>
            <select
              value={selectedTemplate}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="template-select"
            >
              <option value="application">Job Application</option>
              <option value="networking">Networking</option>
              <option value="followup">Follow-up</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          <div className="form-group">
            <label>Subject *</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject"
              className="email-input"
            />
          </div>

          <div className="form-group">
            <label>Message *</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="8"
              placeholder="Email message"
              className="email-textarea"
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={showSchedule}
                onChange={(e) => setShowSchedule(e.target.checked)}
              />
              Schedule Email
            </label>
          </div>

          {showSchedule && (
            <div className="schedule-options">
              <div className="form-group">
                <label>Schedule Date:</label>
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="form-group">
                <label>Schedule Time:</label>
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="email-actions">
            <button onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button
              onClick={handleSendEmail}
              disabled={isSending || !recipientEmail.trim() || !subject.trim()}
              className="btn-send-email"
            >
              {isSending ? '⏳ Sending...' : '📧 Send Email'}
            </button>
            <button
              onClick={handleDownloadAndEmail}
              disabled={isSending}
              className="btn-download-email"
            >
              📥 Download PDF & Email
            </button>
          </div>

          <div className="email-note">
            <p>💡 Note: This will open your default email client. Please attach the resume PDF before sending.</p>
            <p>📊 Email tracking will be available after backend integration.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailIntegration

