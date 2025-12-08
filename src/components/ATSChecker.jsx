import { useState, useEffect } from 'react'
import { checkATSCompliance, getATSScoreColor, getATSScoreLabel } from '../utils/atsChecker'

const ATSChecker = ({ formData, isOpen, onClose }) => {
  const [atsResult, setAtsResult] = useState(null)

  useEffect(() => {
    if (isOpen && formData) {
      const result = checkATSCompliance(formData)
      setAtsResult(result)
    }
  }, [isOpen, formData])

  if (!isOpen || !atsResult) return null

  const scoreColor = getATSScoreColor(atsResult.score)
  const scoreLabel = getATSScoreLabel(atsResult.score)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content ats-checker-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>✅ ATS Resume Checker</h2>
          <button onClick={onClose} className="btn-close-modal">✕</button>
        </div>

        <div className="ats-content">
          <div className="ats-score-section">
            <div className="ats-score-circle" style={{ borderColor: scoreColor }}>
              <div className="ats-score-number" style={{ color: scoreColor }}>
                {atsResult.score}
              </div>
              <div className="ats-score-label">{scoreLabel}</div>
            </div>
            <p className="ats-score-description">
              Your resume is {scoreLabel.toLowerCase()} for ATS (Applicant Tracking System) compatibility
            </p>
          </div>

          {atsResult.issues.length > 0 && (
            <div className="ats-issues">
              <h3>⚠️ Issues to Fix</h3>
              <ul>
                {atsResult.issues.map((issue, index) => (
                  <li key={index}>{issue}</li>
                ))}
              </ul>
            </div>
          )}

          {atsResult.suggestions.length > 0 && (
            <div className="ats-suggestions">
              <h3>💡 Suggestions</h3>
              <ul>
                {atsResult.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}

          {atsResult.foundKeywords.length > 0 && (
            <div className="ats-keywords">
              <h3>✅ Found Keywords</h3>
              <div className="keyword-tags">
                {atsResult.foundKeywords.map((keyword, index) => (
                  <span key={index} className="keyword-tag found">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {atsResult.missingKeywords.length > 0 && (
            <div className="ats-keywords">
              <h3>❌ Missing Keywords (Consider Adding)</h3>
              <div className="keyword-tags">
                {atsResult.missingKeywords.slice(0, 10).map((keyword, index) => (
                  <span key={index} className="keyword-tag missing">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="ats-stats">
            <div className="stat-item">
              <span className="stat-label">Action Verbs:</span>
              <span className="stat-value">{atsResult.actionVerbCount}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Has Numbers:</span>
              <span className="stat-value">{atsResult.hasNumbers ? 'Yes' : 'No'}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Length:</span>
              <span className="stat-value">{atsResult.totalLength} chars</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ATSChecker

