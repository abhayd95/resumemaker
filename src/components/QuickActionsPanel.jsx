import { useState } from 'react'

const QuickActionsPanel = ({ 
  onSave, 
  onDownload, 
  onShare, 
  onATSCheck, 
  onCoverLetter,
  onExamples,
  onCustomize,
  onClose 
}) => {
  const quickActions = [
    {
      id: 'save',
      name: 'Save Resume',
      icon: '💾',
      action: onSave,
      shortcut: 'Ctrl+S',
      color: '#28a745'
    },
    {
      id: 'download',
      name: 'Download PDF',
      icon: '📥',
      action: onDownload,
      shortcut: 'Ctrl+D',
      color: '#667eea'
    },
    {
      id: 'share',
      name: 'Share Resume',
      icon: '🔗',
      action: onShare,
      shortcut: 'Ctrl+Shift+S',
      color: '#17a2b8'
    },
    {
      id: 'ats',
      name: 'ATS Check',
      icon: '✅',
      action: onATSCheck,
      shortcut: 'Ctrl+K',
      color: '#48bb78'
    },
    {
      id: 'cover',
      name: 'Cover Letter',
      icon: '📝',
      action: onCoverLetter,
      shortcut: 'Ctrl+L',
      color: '#ed8936'
    },
    {
      id: 'examples',
      name: 'Examples',
      icon: '📚',
      action: onExamples,
      shortcut: 'Ctrl+E',
      color: '#f5576c'
    },
    {
      id: 'customize',
      name: 'Customize',
      icon: '🎨',
      action: onCustomize,
      shortcut: 'Ctrl+C',
      color: '#9f7aea'
    }
  ]

  return (
    <div className="quick-actions-panel">
      <div className="quick-actions-content">
        <div className="quick-actions-header">
          <h2>⚡ Quick Actions</h2>
          <button onClick={onClose} className="btn-close">✕</button>
        </div>
        <div className="quick-actions-grid">
          {quickActions.map(action => (
            <button
              key={action.id}
              onClick={() => {
                if (action.action) action.action()
                onClose()
              }}
              className="quick-action-btn"
              style={{ '--action-color': action.color }}
              title={`${action.name} (${action.shortcut})`}
            >
              <span className="action-icon">{action.icon}</span>
              <span className="action-name">{action.name}</span>
              <span className="action-shortcut">{action.shortcut}</span>
            </button>
          ))}
        </div>
        <div className="quick-actions-footer">
          <p>💡 Tip: Use keyboard shortcuts for faster access</p>
        </div>
      </div>
    </div>
  )
}

export default QuickActionsPanel

