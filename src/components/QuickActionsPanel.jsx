import { useState } from 'react'

const QuickActionsPanel = ({ 
  onSave, 
  onDownload, 
  onShare, 
  onATSCheck, 
  onCoverLetter,
  onExamples,
  onCustomize,
  onGrammarCheck,
  onBackupSync,
  onLinkedInImport,
  onEmailIntegration,
  onJobMatch,
  onAIAssistant,
  onCompare,
  onPortfolio,
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
      id: 'grammar',
      name: 'Grammar Check',
      icon: '✍️',
      action: onGrammarCheck,
      shortcut: 'Ctrl+G',
      color: '#8b5cf6'
    },
    {
      id: 'backup',
      name: 'Backup & Sync',
      icon: '☁️',
      action: onBackupSync,
      shortcut: 'Ctrl+B',
      color: '#4299e1'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn Import',
      icon: '🔗',
      action: onLinkedInImport,
      shortcut: 'Ctrl+I',
      color: '#0077b5'
    },
    {
      id: 'email',
      name: 'Email Resume',
      icon: '📧',
      action: onEmailIntegration,
      shortcut: 'Ctrl+M',
      color: '#f56565'
    },
    {
      id: 'jobmatch',
      name: 'Job Match',
      icon: '🎯',
      action: onJobMatch,
      shortcut: 'Ctrl+J',
      color: '#ed8936'
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
    },
    {
      id: 'ai',
      name: 'AI Assistant',
      icon: '🤖',
      action: onAIAssistant,
      shortcut: 'Ctrl+A',
      color: '#9333ea'
    },
    {
      id: 'compare',
      name: 'Compare',
      icon: '📊',
      action: onCompare,
      shortcut: 'Ctrl+Shift+C',
      color: '#06b6d4'
    },
    {
      id: 'portfolio',
      name: 'Portfolio',
      icon: '🎨',
      action: onPortfolio,
      shortcut: 'Ctrl+P',
      color: '#ec4899'
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

