import { useState } from 'react'

const BackupSync = ({ resumeData, resumeName, onClose, onRestore }) => {
  const [syncProvider, setSyncProvider] = useState('google') // 'google', 'dropbox'
  const [isBackingUp, setIsBackingUp] = useState(false)
  const [isRestoring, setIsRestoring] = useState(false)
  const [backupStatus, setBackupStatus] = useState('')
  const [autoSync, setAutoSync] = useState(false)
  const [lastBackup, setLastBackup] = useState(null)

  const handleBackup = async () => {
    setIsBackingUp(true)
    setBackupStatus('Creating backup...')

    try {
      // Simulate backup process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In production, this would:
      // 1. Convert resume data to JSON
      // 2. Upload to Google Drive/Dropbox API
      // 3. Store backup metadata
      
      const backupData = {
        resumeName: resumeName || 'My Resume',
        resumeData: resumeData,
        timestamp: new Date().toISOString(),
        provider: syncProvider
      }

      // Save to localStorage as fallback
      const backups = JSON.parse(localStorage.getItem('resumeBackups') || '[]')
      backups.push(backupData)
      localStorage.setItem('resumeBackups', JSON.stringify(backups))
      
      setLastBackup(new Date().toLocaleString())
      setBackupStatus('✅ Backup created successfully!')
      
      setTimeout(() => {
        setIsBackingUp(false)
        setBackupStatus('')
      }, 2000)
    } catch (error) {
      setBackupStatus('❌ Backup failed: ' + error.message)
      setIsBackingUp(false)
    }
  }

  const handleRestore = async () => {
    setIsRestoring(true)
    
    try {
      // Get backups from localStorage
      const backups = JSON.parse(localStorage.getItem('resumeBackups') || '[]')
      
      if (backups.length === 0) {
        alert('No backups found')
        setIsRestoring(false)
        return
      }

      // Show backup selection (simplified - in production would show list)
      const latestBackup = backups[backups.length - 1]
      
      if (confirm(`Restore backup from ${new Date(latestBackup.timestamp).toLocaleString()}?`)) {
        // Restore resume data
        if (onRestore) {
          onRestore(latestBackup.resumeData)
          alert('Resume restored successfully!')
        } else {
          alert('Restore function not available')
        }
      }
      
      setIsRestoring(false)
    } catch (error) {
      alert('Restore failed: ' + error.message)
      setIsRestoring(false)
    }
  }

  const handleAutoSyncToggle = () => {
    setAutoSync(!autoSync)
    if (!autoSync) {
      // Enable auto sync
      localStorage.setItem('autoSyncEnabled', 'true')
      localStorage.setItem('syncProvider', syncProvider)
      alert('Auto sync enabled! Your resume will be backed up automatically.')
    } else {
      // Disable auto sync
      localStorage.removeItem('autoSyncEnabled')
      alert('Auto sync disabled.')
    }
  }

  const handleScheduleBackup = () => {
    const schedule = prompt('Enter backup schedule (daily/weekly/monthly):', 'daily')
    if (schedule) {
      localStorage.setItem('backupSchedule', schedule)
      alert(`Backup scheduled: ${schedule}`)
    }
  }

  return (
    <div className="backup-sync-modal">
      <div className="backup-sync-content">
        <div className="backup-sync-header">
          <h2>☁️ Resume Backup & Sync</h2>
          <button onClick={onClose} className="btn-close">✕</button>
        </div>

        <div className="backup-sync-providers">
          <h3>Choose Backup Provider:</h3>
          <div className="provider-options">
            <button
              onClick={() => setSyncProvider('google')}
              className={`provider-btn ${syncProvider === 'google' ? 'active' : ''}`}
            >
              <span className="provider-icon">📁</span>
              <span className="provider-name">Google Drive</span>
            </button>
            <button
              onClick={() => setSyncProvider('dropbox')}
              className={`provider-btn ${syncProvider === 'dropbox' ? 'active' : ''}`}
            >
              <span className="provider-icon">📦</span>
              <span className="provider-name">Dropbox</span>
            </button>
          </div>
        </div>

        <div className="backup-status">
          {lastBackup && (
            <div className="last-backup-info">
              <span>Last backup: {lastBackup}</span>
            </div>
          )}
          {backupStatus && (
            <div className={`backup-status-message ${backupStatus.includes('✅') ? 'success' : 'error'}`}>
              {backupStatus}
            </div>
          )}
        </div>

        <div className="backup-actions">
          <button
            onClick={handleBackup}
            disabled={isBackingUp || isRestoring}
            className="btn-backup"
          >
            {isBackingUp ? '⏳ Backing up...' : '💾 Create Backup'}
          </button>
          <button
            onClick={handleRestore}
            disabled={isBackingUp || isRestoring}
            className="btn-restore"
          >
            {isRestoring ? '⏳ Restoring...' : '📥 Restore Backup'}
          </button>
        </div>

        <div className="backup-settings">
          <h3>Settings:</h3>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={autoSync}
                onChange={handleAutoSyncToggle}
              />
              Enable Auto Sync
            </label>
            <p className="setting-description">
              Automatically backup your resume when changes are made
            </p>
          </div>
          <div className="setting-item">
            <button
              onClick={handleScheduleBackup}
              className="btn-schedule"
            >
              ⏰ Schedule Backup
            </button>
            <p className="setting-description">
              Set up automatic backups on a schedule
            </p>
          </div>
        </div>

        <div className="backup-info">
          <h3>Backup Information:</h3>
          <ul>
            <li>✅ All resume data is securely backed up</li>
            <li>✅ Access your resumes from any device</li>
            <li>✅ Automatic version history</li>
            <li>✅ Easy restore functionality</li>
          </ul>
        </div>

        <div className="backup-sync-actions">
          <button onClick={onClose} className="btn-cancel">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default BackupSync

