import { useState, useEffect } from 'react'
import { getResumeAnalytics } from '../utils/analyticsTracker'

const SaveLoadPanel = ({ resumes, onLoad, onDelete, onDuplicate, onView, onDownload, onEdit, onShare, onVersionHistory, onClose, userName }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterTemplate, setFilterTemplate] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [analytics, setAnalytics] = useState({})
  const [selectedResumes, setSelectedResumes] = useState(new Set())
  const [bulkMode, setBulkMode] = useState(false)

  // Load analytics for all resumes
  useEffect(() => {
    const loadAnalytics = async () => {
      const analyticsData = {}
      for (const resume of resumes) {
        try {
          const data = await getResumeAnalytics(userName, resume.id)
          if (data) {
            analyticsData[resume.id] = data
          }
        } catch (error) {
          console.error(`Error loading analytics for resume ${resume.id}:`, error)
        }
      }
      setAnalytics(analyticsData)
    }
    
    if (userName && resumes.length > 0) {
      loadAnalytics()
    }
  }, [userName, resumes])

  const formatDate = (dateString) => {
    if (!dateString) return 'Never'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Filter and search resumes with error handling
  const filteredResumes = resumes.filter(resume => {
    try {
      const resumeData = typeof resume.resume_data === 'string' 
        ? JSON.parse(resume.resume_data) 
        : resume.resume_data
      const name = resumeData?.personalInfo?.fullName || 'Untitled Resume'
      
      const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesTemplate = filterTemplate === 'all' || resume.template_id === parseInt(filterTemplate)
      
      return matchesSearch && matchesTemplate
    } catch (error) {
      console.error('Error parsing resume data:', error)
      // Include resume even if parsing fails, but it won't match search
      return filterTemplate === 'all' || resume.template_id === parseInt(filterTemplate)
    }
  })

  // Sort resumes
  const sortedResumes = [...filteredResumes].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.created_at) - new Date(a.created_at)
    } else if (sortBy === 'oldest') {
      return new Date(a.created_at) - new Date(b.created_at)
    } else if (sortBy === 'name') {
      const nameA = typeof a.resume_data === 'string' 
        ? JSON.parse(a.resume_data).personalInfo?.fullName || '' 
        : a.resume_data.personalInfo?.fullName || ''
      const nameB = typeof b.resume_data === 'string' 
        ? JSON.parse(b.resume_data).personalInfo?.fullName || '' 
        : b.resume_data.personalInfo?.fullName || ''
      return nameA.localeCompare(nameB)
    }
    return 0
  })

  // Bulk Actions Handlers
  const handleSelectAll = () => {
    if (selectedResumes.size === sortedResumes.length) {
      setSelectedResumes(new Set())
    } else {
      setSelectedResumes(new Set(sortedResumes.map(r => r.id)))
    }
  }

  const handleToggleSelect = (resumeId) => {
    const newSelected = new Set(selectedResumes)
    if (newSelected.has(resumeId)) {
      newSelected.delete(resumeId)
    } else {
      newSelected.add(resumeId)
    }
    setSelectedResumes(newSelected)
  }

  const handleBulkDelete = () => {
    if (selectedResumes.size === 0) {
      alert('Please select at least one resume to delete.')
      return
    }
    if (window.confirm(`Are you sure you want to delete ${selectedResumes.size} resume(s)?`)) {
      selectedResumes.forEach(id => {
        onDelete(id)
      })
      setSelectedResumes(new Set())
      setBulkMode(false)
    }
  }

  const handleBulkExport = async () => {
    if (selectedResumes.size === 0) {
      alert('Please select at least one resume to export.')
      return
    }
    try {
      const selectedResumeObjects = sortedResumes.filter(r => selectedResumes.has(r.id))
      for (const resume of selectedResumeObjects) {
        if (onDownload) {
          await onDownload(resume)
          // Small delay between downloads
          await new Promise(resolve => setTimeout(resolve, 500))
        }
      }
      alert(`Successfully exported ${selectedResumes.size} resume(s)!`)
      setSelectedResumes(new Set())
      setBulkMode(false)
    } catch (error) {
      alert('Error exporting resumes: ' + error.message)
    }
  }

  const handleBulkTemplateChange = () => {
    if (selectedResumes.size === 0) {
      alert('Please select at least one resume.')
      return
    }
    const newTemplate = prompt('Enter new template ID (1-7):')
    if (newTemplate && parseInt(newTemplate) >= 1 && parseInt(newTemplate) <= 7) {
      // This would require a new API endpoint for bulk template update
      alert(`Bulk template change feature requires backend API. Selected ${selectedResumes.size} resume(s) for template ${newTemplate}`)
      setSelectedResumes(new Set())
      setBulkMode(false)
    }
  }

  return (
    <div className="save-load-panel">
      <div className="save-load-header">
        <h2>Saved Resumes ({sortedResumes.length})</h2>
        <div className="header-actions">
          <button 
            onClick={() => {
              setBulkMode(!bulkMode)
              setSelectedResumes(new Set())
            }} 
            className={`btn-bulk-toggle ${bulkMode ? 'active' : ''}`}
            title="Bulk Actions Mode"
          >
            {bulkMode ? '✓ Bulk Mode' : '📦 Bulk Actions'}
          </button>
          <button onClick={onClose} className="btn-close">✕</button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {bulkMode && (
        <div className="bulk-actions-bar">
          <div className="bulk-info">
            <span>{selectedResumes.size} selected</span>
            <button onClick={handleSelectAll} className="btn-select-all">
              {selectedResumes.size === sortedResumes.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
          <div className="bulk-buttons">
            <button onClick={handleBulkExport} className="btn-bulk-export" disabled={selectedResumes.size === 0}>
              ⬇️ Export Selected ({selectedResumes.size})
            </button>
            <button onClick={handleBulkTemplateChange} className="btn-bulk-template" disabled={selectedResumes.size === 0}>
              🎨 Change Template
            </button>
            <button onClick={handleBulkDelete} className="btn-bulk-delete" disabled={selectedResumes.size === 0}>
              🗑️ Delete Selected ({selectedResumes.size})
            </button>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      {resumes.length > 0 && (
        <div className="resume-filters">
          <input
            type="text"
            placeholder="🔍 Search resumes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="resume-search-input"
          />
          <select
            value={filterTemplate}
            onChange={(e) => setFilterTemplate(e.target.value)}
            className="resume-filter-select"
          >
            <option value="all">All Templates</option>
            <option value="1">Template 1</option>
            <option value="2">Template 2</option>
            <option value="3">Template 3</option>
            <option value="4">Template 4</option>
            <option value="5">Template 5</option>
            <option value="6">Template 6</option>
            <option value="7">Template 7</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="resume-sort-select"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
      )}
      
      {!userName ? (
        <div className="no-resumes">
          <p>Please enter your username to view saved resumes.</p>
        </div>
      ) : resumes.length === 0 ? (
        <div className="no-resumes">
          <p>No saved resumes yet. Save your first resume to see it here!</p>
          <p className="hint-text">Go to step 2 or 3 and click "Save Resume" to save your resume.</p>
        </div>
      ) : sortedResumes.length === 0 ? (
        <div className="no-resumes">
          <p>No resumes match your search criteria.</p>
        </div>
      ) : (
        <div className="resumes-list">
          {sortedResumes.map((resume) => {
            let resumeData
            let name = 'Untitled Resume'
            try {
              resumeData = typeof resume.resume_data === 'string' 
                ? JSON.parse(resume.resume_data) 
                : resume.resume_data
              name = resumeData?.personalInfo?.fullName || 'Untitled Resume'
            } catch (error) {
              console.error('Error parsing resume data for display:', error)
              resumeData = {}
            }
            
            return (
              <div key={resume.id} className={`resume-item ${selectedResumes.has(resume.id) ? 'selected' : ''}`}>
                {bulkMode && (
                  <div className="resume-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedResumes.has(resume.id)}
                      onChange={() => handleToggleSelect(resume.id)}
                      className="bulk-checkbox"
                    />
                  </div>
                )}
                <div className="resume-item-info">
                  <h3>{name}</h3>
                  <p className="resume-meta">
                    Template {resume.template_id} • {formatDate(resume.created_at)}
                  </p>
                  {resume.updated_at !== resume.created_at && (
                    <p className="resume-updated">
                      Updated: {formatDate(resume.updated_at)}
                    </p>
                  )}
                  {/* Analytics Badge */}
                  {analytics[resume.id] && (
                    <div className="resume-analytics">
                      <span className="analytics-badge" title="Views">
                        👁️ {analytics[resume.id].view_count || 0}
                      </span>
                      <span className="analytics-badge" title="Downloads">
                        ⬇️ {analytics[resume.id].download_count || 0}
                      </span>
                      {analytics[resume.id].last_viewed_at && (
                        <span className="analytics-badge" title="Last Viewed">
                          🕒 {formatDate(analytics[resume.id].last_viewed_at)}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="resume-item-actions">
                  {onView && (
                    <button 
                      onClick={() => onView(resume)} 
                      className="btn-view"
                      title="View Resume"
                    >
                      👁️ View
                    </button>
                  )}
                  {onEdit && (
                    <button 
                      onClick={() => onEdit(resume)} 
                      className="btn-edit"
                      title="Edit Resume"
                    >
                      ✏️ Edit
                    </button>
                  )}
                  {onDownload && (
                    <button 
                      onClick={() => onDownload(resume)} 
                      className="btn-download"
                      title="Download PDF"
                    >
                      ⬇️ Download
                    </button>
                  )}
                  {onShare && (
                    <button 
                      onClick={() => onShare(resume)} 
                      className="btn-share"
                      title="Share Resume"
                    >
                      🔗 Share
                    </button>
                  )}
                  {onVersionHistory && (
                    <button 
                      onClick={() => onVersionHistory(resume)} 
                      className="btn-version"
                      title="Version History"
                    >
                      📚 Versions
                    </button>
                  )}
                  <button 
                    onClick={() => onLoad(resume)} 
                    className="btn-load"
                    title="Load Resume"
                  >
                    📂 Load
                  </button>
                  {onDuplicate && (
                    <button 
                      onClick={() => onDuplicate(resume)} 
                      className="btn-duplicate"
                      title="Duplicate Resume"
                    >
                      📋 Duplicate
                    </button>
                  )}
                  <button 
                    onClick={() => onDelete(resume.id)} 
                    className="btn-delete"
                    title="Delete Resume"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SaveLoadPanel
