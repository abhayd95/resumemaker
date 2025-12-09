import { useState, useEffect } from 'react'
import { resumeAPI } from '../utils/api'

const ResumeVersionHistory = ({ isOpen, onClose, resume, userName, onRestore }) => {
  const [versions, setVersions] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedVersions, setSelectedVersions] = useState([])
  const [showCompare, setShowCompare] = useState(false)

  useEffect(() => {
    if (isOpen && resume && userName) {
      loadVersions()
    }
  }, [isOpen, resume, userName])

  const loadVersions = async () => {
    try {
      setLoading(true)
      const result = await resumeAPI.getVersions(userName, resume.id)
      if (result.success) {
        setVersions(result.versions || [])
      } else {
        alert('Error loading versions: ' + result.error)
      }
    } catch (error) {
      alert('Error loading versions: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRestore = async (version) => {
    if (!confirm(`Are you sure you want to restore version ${version.version_number}? This will replace your current resume.`)) {
      return
    }

    try {
      const result = await resumeAPI.restoreVersion(userName, resume.id, version.id)
      if (result.success) {
        alert('Version restored successfully!')
        if (onRestore) {
          onRestore(result.resumeData, result.templateId, result.coverLetterData)
        }
        onClose()
      } else {
        alert('Error restoring version: ' + result.error)
      }
    } catch (error) {
      alert('Error restoring version: ' + error.message)
    }
  }

  const handleCompare = () => {
    if (selectedVersions.length === 2) {
      setShowCompare(true)
    } else {
      alert('Please select exactly 2 versions to compare.')
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isOpen) return null

  return (
    <div className="version-history-modal">
      <div className="version-history-content">
        <div className="version-history-header">
          <h2>📚 Version History</h2>
          <button onClick={onClose} className="btn-close">✕</button>
        </div>

        {loading ? (
          <div className="loading">Loading versions...</div>
        ) : versions.length === 0 ? (
          <div className="no-versions">
            <p>No version history available for this resume.</p>
            <p className="hint-text">Versions are automatically created when you save changes to your resume.</p>
          </div>
        ) : (
          <>
            <div className="version-actions">
              <button
                onClick={handleCompare}
                disabled={selectedVersions.length !== 2}
                className="btn-compare"
              >
                🔍 Compare Selected ({selectedVersions.length}/2)
              </button>
            </div>

            <div className="versions-list">
              {versions.map((version) => {
                const resumeData = typeof version.resume_data === 'string'
                  ? JSON.parse(version.resume_data)
                  : version.resume_data
                const name = resumeData?.personalInfo?.fullName || 'Untitled Resume'
                const isSelected = selectedVersions.includes(version.id)

                return (
                  <div
                    key={version.id}
                    className={`version-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedVersions(selectedVersions.filter(id => id !== version.id))
                      } else {
                        if (selectedVersions.length < 2) {
                          setSelectedVersions([...selectedVersions, version.id])
                        } else {
                          alert('You can only select 2 versions for comparison.')
                        }
                      }
                    }}
                  >
                    <div className="version-info">
                      <h3>Version {version.version_number}</h3>
                      <p className="version-meta">
                        {name} • Template {version.template_id} • {formatDate(version.created_at)}
                      </p>
                      {version.version_notes && (
                        <p className="version-notes">{version.version_notes}</p>
                      )}
                    </div>
                    <div className="version-actions-item">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRestore(version)
                        }}
                        className="btn-restore"
                        title="Restore this version"
                      >
                        ↶ Restore
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}

        {showCompare && selectedVersions.length === 2 && (
          <VersionCompare
            versions={versions.filter(v => selectedVersions.includes(v.id))}
            onClose={() => {
              setShowCompare(false)
              setSelectedVersions([])
            }}
          />
        )}
      </div>
    </div>
  )
}

const VersionCompare = ({ versions, onClose }) => {
  if (versions.length !== 2) return null

  const [v1, v2] = versions
  const data1 = typeof v1.resume_data === 'string' ? JSON.parse(v1.resume_data) : v1.resume_data
  const data2 = typeof v2.resume_data === 'string' ? JSON.parse(v2.resume_data) : v2.resume_data

  const compareField = (field, getValue) => {
    const val1 = getValue(data1)
    const val2 = getValue(data2)
    return val1 !== val2
  }

  return (
    <div className="version-compare-modal">
      <div className="version-compare-content">
        <div className="version-compare-header">
          <h3>Comparing Version {v1.version_number} vs Version {v2.version_number}</h3>
          <button onClick={onClose} className="btn-close">✕</button>
        </div>
        <div className="version-compare-body">
          <div className="compare-column">
            <h4>Version {v1.version_number}</h4>
            <div className="compare-details">
              <p><strong>Name:</strong> {data1?.personalInfo?.fullName || 'N/A'}</p>
              <p><strong>Email:</strong> {data1?.personalInfo?.email || 'N/A'}</p>
              <p><strong>Template:</strong> {v1.template_id}</p>
              <p><strong>Experience:</strong> {data1?.experience?.length || 0} entries</p>
              <p><strong>Education:</strong> {data1?.education?.length || 0} entries</p>
              <p><strong>Skills:</strong> {data1?.skills?.length || 0} items</p>
              <p><strong>Created:</strong> {new Date(v1.created_at).toLocaleString()}</p>
            </div>
          </div>
          <div className="compare-column">
            <h4>Version {v2.version_number}</h4>
            <div className="compare-details">
              <p><strong>Name:</strong> {data2?.personalInfo?.fullName || 'N/A'}</p>
              <p><strong>Email:</strong> {data2?.personalInfo?.email || 'N/A'}</p>
              <p><strong>Template:</strong> {v2.template_id}</p>
              <p><strong>Experience:</strong> {data2?.experience?.length || 0} entries</p>
              <p><strong>Education:</strong> {data2?.education?.length || 0} entries</p>
              <p><strong>Skills:</strong> {data2?.skills?.length || 0} items</p>
              <p><strong>Created:</strong> {new Date(v2.created_at).toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="version-compare-footer">
          <button onClick={onClose} className="btn-secondary">Close</button>
        </div>
      </div>
    </div>
  )
}

export default ResumeVersionHistory

