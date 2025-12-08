const SaveLoadPanel = ({ resumes, onLoad, onDelete, onDuplicate, onClose }) => {
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

  return (
    <div className="save-load-panel">
      <div className="save-load-header">
        <h2>Saved Resumes</h2>
        <button onClick={onClose} className="btn-close">✕</button>
      </div>
      
      {resumes.length === 0 ? (
        <div className="no-resumes">
          <p>No saved resumes yet. Save your first resume to see it here!</p>
        </div>
      ) : (
        <div className="resumes-list">
          {resumes.map((resume) => {
            const resumeData = typeof resume.resume_data === 'string' 
              ? JSON.parse(resume.resume_data) 
              : resume.resume_data
            const name = resumeData.personalInfo?.fullName || 'Untitled Resume'
            
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
                  <button 
                    onClick={() => onLoad(resume)} 
                    className="btn-load"
                  >
                    📂 Load
                  </button>
                  {onDuplicate && (
                    <button 
                      onClick={() => onDuplicate(resume)} 
                      className="btn-duplicate"
                    >
                      📋 Duplicate
                    </button>
                  )}
                  <button 
                    onClick={() => onDelete(resume.id)} 
                    className="btn-delete"
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

