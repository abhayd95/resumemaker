const SaveLoadPanel = ({ resumes, onLoad, onDelete, onDuplicate, onView, onDownload, onEdit, onShare, onClose, userName }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterTemplate, setFilterTemplate] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const formatDate = (dateString) => {
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

  return (
    <div className="save-load-panel">
      <div className="save-load-header">
        <h2>Saved Resumes ({sortedResumes.length})</h2>
        <button onClick={onClose} className="btn-close">✕</button>
      </div>

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
              <div key={resume.id} className="resume-item">
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
