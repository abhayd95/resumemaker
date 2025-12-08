import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { generateShareLink, copyToClipboard, shareViaEmail, shareViaWhatsApp } from '../utils/resumeSharing'

const ResumeShareModal = ({ isOpen, onClose, resume, userName }) => {
  const [shareLink, setShareLink] = useState('')
  const [copied, setCopied] = useState(false)
  const [isPublic, setIsPublic] = useState(false)

  useEffect(() => {
    if (isOpen && resume && userName) {
      const link = generateShareLink(resume.id, userName)
      setShareLink(link)
    }
  }, [isOpen, resume, userName])

  if (!isOpen) return null

  const handleCopy = async () => {
    const success = await copyToClipboard(shareLink)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleEmailShare = () => {
    const subject = `Check out my resume: ${resume.resume_data?.personalInfo?.fullName || 'Resume'}`
    const body = `Hi,\n\nPlease find my resume at: ${shareLink}\n\nBest regards`
    shareViaEmail(subject, body)
  }

  const handleWhatsAppShare = () => {
    const text = `Check out my resume: ${shareLink}`
    shareViaWhatsApp(text)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content share-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🔗 Share Resume</h2>
          <button onClick={onClose} className="btn-close-modal">✕</button>
        </div>

        <div className="share-content">
          <div className="share-link-section">
            <label>
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
              Make this resume publicly accessible
            </label>

            <div className="link-input-group">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="share-link-input"
              />
              <button
                onClick={handleCopy}
                className={`btn-copy ${copied ? 'copied' : ''}`}
              >
                {copied ? '✓ Copied!' : '📋 Copy'}
              </button>
            </div>
          </div>

          <div className="qr-code-section">
            <h3>QR Code</h3>
            <div className="qr-code-container">
              <QRCodeSVG value={shareLink} size={200} />
            </div>
            <p className="qr-hint">Scan to view resume on mobile</p>
          </div>

          <div className="share-buttons">
            <button onClick={handleEmailShare} className="btn-share-email">
              📧 Share via Email
            </button>
            <button onClick={handleWhatsAppShare} className="btn-share-whatsapp">
              💬 Share via WhatsApp
            </button>
          </div>

          <div className="share-info">
            <p>📊 Share this link to let others view your resume</p>
            <p className="info-note">
              {isPublic 
                ? '✅ This resume is publicly accessible' 
                : '🔒 This resume requires authentication'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeShareModal

