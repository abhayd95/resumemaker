import { useState } from 'react'

const ResumeComparison = ({ savedResumes, onClose }) => {
  const [resume1, setResume1] = useState(null)
  const [resume2, setResume2] = useState(null)
  const [comparison, setComparison] = useState(null)

  const handleCompare = () => {
    if (!resume1 || !resume2) {
      alert('Please select two resumes to compare')
      return
    }

    const data1 = typeof resume1.resume_data === 'string' 
      ? JSON.parse(resume1.resume_data) 
      : resume1.resume_data
    const data2 = typeof resume2.resume_data === 'string' 
      ? JSON.parse(resume2.resume_data) 
      : resume2.resume_data

    const differences = {
      personalInfo: compareObjects(data1.personalInfo, data2.personalInfo),
      summary: data1.summary !== data2.summary,
      experience: compareArrays(data1.experience, data2.experience),
      education: compareArrays(data1.education, data2.education),
      skills: compareArrays(data1.skills, data2.skills),
      projects: compareArrays(data1.projects, data2.projects)
    }

    setComparison({
      resume1: { name: resume1.resume_name, data: data1 },
      resume2: { name: resume2.resume_name, data: data2 },
      differences
    })
  }

  const compareObjects = (obj1, obj2) => {
    const diff = {}
    const allKeys = new Set([...Object.keys(obj1 || {}), ...Object.keys(obj2 || {})])
    allKeys.forEach(key => {
      if (obj1?.[key] !== obj2?.[key]) {
        diff[key] = { old: obj1?.[key], new: obj2?.[key] }
      }
    })
    return Object.keys(diff).length > 0 ? diff : null
  }

  const compareArrays = (arr1, arr2) => {
    if (!arr1 && !arr2) return null
    if (!arr1 || !arr2) return { different: true }
    if (arr1.length !== arr2.length) return { different: true, length1: arr1.length, length2: arr2.length }
    
    const diff = []
    const maxLen = Math.max(arr1.length, arr2.length)
    for (let i = 0; i < maxLen; i++) {
      if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) {
        diff.push(i)
      }
    }
    return diff.length > 0 ? { different: true, indices: diff } : null
  }

  return (
    <div className="resume-comparison-modal">
      <div className="resume-comparison-content">
        <div className="comparison-header">
          <h2>📊 Resume Comparison</h2>
          <button onClick={onClose} className="btn-close">✕</button>
        </div>

        <div className="comparison-selector">
          <div className="selector-group">
            <label>Select First Resume:</label>
            <select
              value={resume1?.id || ''}
              onChange={(e) => {
                const resume = savedResumes.find(r => r.id === parseInt(e.target.value))
                setResume1(resume)
                setComparison(null)
              }}
              className="resume-select"
            >
              <option value="">-- Select Resume --</option>
              {savedResumes.map(resume => (
                <option key={resume.id} value={resume.id}>
                  {resume.resume_name}
                </option>
              ))}
            </select>
          </div>

          <div className="selector-group">
            <label>Select Second Resume:</label>
            <select
              value={resume2?.id || ''}
              onChange={(e) => {
                const resume = savedResumes.find(r => r.id === parseInt(e.target.value))
                setResume2(resume)
                setComparison(null)
              }}
              className="resume-select"
            >
              <option value="">-- Select Resume --</option>
              {savedResumes.map(resume => (
                <option key={resume.id} value={resume.id}>
                  {resume.resume_name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleCompare}
            disabled={!resume1 || !resume2}
            className="btn-compare"
          >
            🔍 Compare Resumes
          </button>
        </div>

        {comparison && (
          <div className="comparison-results">
            <div className="comparison-header-info">
              <h3>{comparison.resume1.name} vs {comparison.resume2.name}</h3>
            </div>

            <div className="comparison-grid">
              <div className="comparison-section">
                <h4>Personal Information</h4>
                {comparison.differences.personalInfo ? (
                  <div className="diff-item">
                    {Object.entries(comparison.differences.personalInfo).map(([key, value]) => (
                      <div key={key} className="diff-field">
                        <strong>{key}:</strong>
                        <div className="diff-values">
                          <span className="diff-old">{value.old || 'N/A'}</span>
                          <span className="diff-arrow">→</span>
                          <span className="diff-new">{value.new || 'N/A'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-diff">✓ No differences</p>
                )}
              </div>

              <div className="comparison-section">
                <h4>Summary</h4>
                {comparison.differences.summary ? (
                  <div className="diff-item">
                    <div className="diff-values">
                      <div className="diff-old">
                        <strong>Resume 1:</strong>
                        <p>{comparison.resume1.data.summary || 'N/A'}</p>
                      </div>
                      <div className="diff-new">
                        <strong>Resume 2:</strong>
                        <p>{comparison.resume2.data.summary || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="no-diff">✓ No differences</p>
                )}
              </div>

              <div className="comparison-section">
                <h4>Experience</h4>
                {comparison.differences.experience ? (
                  <div className="diff-item">
                    <p>
                      Resume 1: {comparison.resume1.data.experience?.length || 0} entries<br />
                      Resume 2: {comparison.resume2.data.experience?.length || 0} entries
                    </p>
                    {comparison.differences.experience.indices && (
                      <p>Differences found at indices: {comparison.differences.experience.indices.join(', ')}</p>
                    )}
                  </div>
                ) : (
                  <p className="no-diff">✓ No differences</p>
                )}
              </div>

              <div className="comparison-section">
                <h4>Education</h4>
                {comparison.differences.education ? (
                  <div className="diff-item">
                    <p>
                      Resume 1: {comparison.resume1.data.education?.length || 0} entries<br />
                      Resume 2: {comparison.resume2.data.education?.length || 0} entries
                    </p>
                  </div>
                ) : (
                  <p className="no-diff">✓ No differences</p>
                )}
              </div>

              <div className="comparison-section">
                <h4>Skills</h4>
                {comparison.differences.skills ? (
                  <div className="diff-item">
                    <div className="diff-values">
                      <div className="diff-old">
                        <strong>Resume 1:</strong>
                        <p>{comparison.resume1.data.skills?.join(', ') || 'N/A'}</p>
                      </div>
                      <div className="diff-new">
                        <strong>Resume 2:</strong>
                        <p>{comparison.resume2.data.skills?.join(', ') || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="no-diff">✓ No differences</p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="comparison-actions">
          <button onClick={onClose} className="btn-cancel">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResumeComparison

