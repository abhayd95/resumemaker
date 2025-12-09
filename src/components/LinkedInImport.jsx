import { useState } from 'react'

const LinkedInImport = ({ onImport, onClose }) => {
  const [importMethod, setImportMethod] = useState('manual') // 'manual', 'url', 'file'
  const [linkedInUrl, setLinkedInUrl] = useState('')
  const [linkedInData, setLinkedInData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    summary: '',
    experience: [],
    education: [],
    skills: [],
    languages: []
  })
  const [isImporting, setIsImporting] = useState(false)
  const [error, setError] = useState('')

  const handleManualInput = () => {
    setImportMethod('manual')
  }

  const handleUrlImport = async () => {
    if (!linkedInUrl.trim()) {
      setError('Please enter a valid LinkedIn profile URL')
      return
    }

    setIsImporting(true)
    setError('')

    try {
      // Simulate LinkedIn data extraction
      // In production, this would use LinkedIn API or web scraping
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock data extraction from URL
      const extractedData = {
        fullName: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        address: 'San Francisco, CA',
        linkedin: linkedInUrl,
        summary: 'Experienced software engineer with 5+ years in web development...',
        experience: [
          {
            position: 'Senior Software Engineer',
            company: 'Tech Company',
            startDate: '2020-01',
            endDate: '',
            current: true,
            description: 'Led development of multiple web applications...'
          }
        ],
        education: [
          {
            degree: 'Bachelor of Science',
            institution: 'University',
            field: 'Computer Science',
            startDate: '2015-09',
            endDate: '2019-05',
            gpa: '3.8'
          }
        ],
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
        languages: [
          { name: 'English', proficiency: 'Native' },
          { name: 'Spanish', proficiency: 'Intermediate' }
        ]
      }

      setLinkedInData(extractedData)
      setError('')
    } catch (err) {
      setError('Failed to import from LinkedIn URL. Please try manual import.')
    } finally {
      setIsImporting(false)
    }
  }

  const handleFileImport = (event) => {
    const file = event.target.files[0]
    if (!file) return

    // Accept both JSON and text files (LinkedIn exports can be .txt or .json)
    if (!file.name.endsWith('.json') && !file.name.endsWith('.txt')) {
      setError('Please upload a JSON or TXT file exported from LinkedIn')
      return
    }

    setIsImporting(true)
    setError('')

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        // Parse LinkedIn export JSON format
        const parsedData = parseLinkedInExport(data)
        
        // Validate parsed data
        if (!parsedData.fullName && !parsedData.email) {
          throw new Error('No valid profile data found in file')
        }
        
        setLinkedInData(parsedData)
        setError('')
        alert('✅ LinkedIn data imported successfully from file!')
      } catch (err) {
        setError(`Invalid file format: ${err.message}. Please upload a valid LinkedIn export file.`)
        console.error('File import error:', err)
      } finally {
        setIsImporting(false)
      }
    }
    
    reader.onerror = () => {
      setError('Error reading file. Please try again.')
      setIsImporting(false)
    }
    
    reader.readAsText(file)
  }

  const parseLinkedInExport = (data) => {
    // Handle different LinkedIn export formats
    // Format 1: Direct object with Profile, Positions, etc.
    // Format 2: Array of objects
    // Format 3: Nested structure
    
    let profile = {}
    let positions = []
    let educations = []
    let skills = []
    let languages = []
    
    // Check if data is an array
    if (Array.isArray(data)) {
      // Find profile object in array
      profile = data.find(item => item.Profile || item.profile) || {}
      positions = data.find(item => item.Positions || item.positions)?.Positions || 
                  data.find(item => item.Positions || item.positions)?.positions || []
      educations = data.find(item => item.Educations || item.educations)?.Educations || 
                  data.find(item => item.Educations || item.educations)?.educations || []
      skills = data.find(item => item.Skills || item.skills)?.Skills || 
               data.find(item => item.Skills || item.skills)?.skills || []
    } else {
      // Direct object structure
      profile = data.Profile || data.profile || data
      positions = data.Positions || data.positions || data.Experience || data.experience || []
      educations = data.Educations || data.educations || data.Education || data.education || []
      skills = data.Skills || data.skills || []
      languages = data.Languages || data.languages || []
    }
    
    // Extract profile info (handle nested structures)
    const profileData = profile.Profile || profile.profile || profile
    
    return {
      fullName: (profileData.FirstName && profileData.LastName) 
        ? `${profileData.FirstName} ${profileData.LastName}` 
        : profileData.fullName || profileData.name || profileData.Name || '',
      email: profileData.EmailAddresses?.[0] || profileData.EmailAddress || 
             profileData.email || profileData.Email || '',
      phone: profileData.PhoneNumbers?.[0] || profileData.PhoneNumber || 
             profileData.phone || profileData.Phone || '',
      address: profileData.Address || profileData.address || profileData.Location || profileData.location || '',
      linkedin: profileData.ProfileUrl || profileData.profileUrl || profileData.ProfileURL || 
                profileData.linkedin || profileData.LinkedIn || '',
      summary: profileData.Summary || profileData.summary || profileData.Headline || profileData.headline || '',
      experience: (Array.isArray(positions) ? positions : []).map(pos => {
        const posData = pos.Position || pos.position || pos
        return {
          position: posData.Title || posData.title || posData.Position || posData.position || '',
          company: posData.CompanyName || posData.companyName || posData.Company || posData.company || '',
          startDate: formatDate(posData.StartDate || posData.startDate || posData.Start || posData.start),
          endDate: posData.EndDate ? formatDate(posData.EndDate) : 
                   (posData.endDate ? formatDate(posData.endDate) : 
                   (posData.End ? formatDate(posData.End) : '')),
          current: !posData.EndDate && !posData.endDate && !posData.End && !posData.end,
          description: posData.Description || posData.description || posData.Summary || posData.summary || ''
        }
      }),
      education: (Array.isArray(educations) ? educations : []).map(edu => {
        const eduData = edu.Education || edu.education || edu
        return {
          degree: eduData.Degree || eduData.degree || eduData.DegreeName || eduData.degreeName || '',
          institution: eduData.SchoolName || eduData.schoolName || eduData.School || eduData.school || 
                       eduData.Institution || eduData.institution || '',
          field: eduData.FieldOfStudy || eduData.fieldOfStudy || eduData.Field || eduData.field || '',
          startDate: formatDate(eduData.StartDate || eduData.startDate || eduData.Start || eduData.start),
          endDate: formatDate(eduData.EndDate || eduData.endDate || eduData.End || eduData.end),
          gpa: eduData.Grade || eduData.grade || eduData.GPA || eduData.gpa || ''
        }
      }),
      skills: (Array.isArray(skills) ? skills : []).map(skill => {
        const skillData = skill.Skill || skill.skill || skill
        return skillData.Name || skillData.name || skillData || skill
      }).filter(Boolean),
      languages: (Array.isArray(languages) ? languages : []).map(lang => {
        const langData = lang.Language || lang.language || lang
        return {
          name: langData.Name || langData.name || langData || lang,
          proficiency: langData.Proficiency || langData.proficiency || 'Intermediate'
        }
      })
    }
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    return `${year}-${month}`
  }

  const handleApplyImport = () => {
    if (onImport) {
      onImport(linkedInData)
    }
    onClose()
  }

  const handleManualFieldChange = (field, value) => {
    setLinkedInData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="linkedin-import-modal">
      <div className="linkedin-import-content">
        <div className="import-header">
          <h2>🔗 Import from LinkedIn</h2>
          <button onClick={onClose} className="btn-close">✕</button>
        </div>

        <div className="import-methods">
          <div className="method-tabs">
            <button
              onClick={handleManualInput}
              className={`method-tab ${importMethod === 'manual' ? 'active' : ''}`}
            >
              📝 Manual Entry
            </button>
            <button
              onClick={() => setImportMethod('url')}
              className={`method-tab ${importMethod === 'url' ? 'active' : ''}`}
            >
              🔗 LinkedIn URL
            </button>
            <button
              onClick={() => setImportMethod('file')}
              className={`method-tab ${importMethod === 'file' ? 'active' : ''}`}
            >
              📄 Export File
            </button>
          </div>

          {importMethod === 'url' && (
            <div className="import-section">
              <label>LinkedIn Profile URL:</label>
              <input
                type="url"
                value={linkedInUrl}
                onChange={(e) => setLinkedInUrl(e.target.value)}
                placeholder="https://www.linkedin.com/in/your-profile"
                className="linkedin-url-input"
              />
              <button
                onClick={handleUrlImport}
                disabled={isImporting || !linkedInUrl.trim()}
                className="btn-import-url"
              >
                {isImporting ? '⏳ Importing...' : '📥 Import from URL'}
              </button>
              <p className="import-note">
                💡 Note: This feature extracts public profile data. For full import, use LinkedIn export file.
              </p>
            </div>
          )}

          {importMethod === 'file' && (
            <div className="import-section">
              <label>Upload LinkedIn Export File:</label>
              <input
                type="file"
                accept=".json"
                onChange={handleFileImport}
                className="file-input"
              />
              <p className="import-note">
                💡 To export your LinkedIn data: Settings → Data Privacy → Get a copy of your data → Select "LinkedIn" → Request archive
              </p>
            </div>
          )}

          {importMethod === 'manual' && (
            <div className="import-section">
              <div className="manual-import-form">
                <div className="form-group">
                  <label>Full Name:</label>
                  <input
                    type="text"
                    value={linkedInData.fullName}
                    onChange={(e) => handleManualFieldChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={linkedInData.email}
                    onChange={(e) => handleManualFieldChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="form-group">
                  <label>Phone:</label>
                  <input
                    type="tel"
                    value={linkedInData.phone}
                    onChange={(e) => handleManualFieldChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="form-group">
                  <label>LinkedIn URL:</label>
                  <input
                    type="url"
                    value={linkedInData.linkedin}
                    onChange={(e) => handleManualFieldChange('linkedin', e.target.value)}
                    placeholder="https://www.linkedin.com/in/your-profile"
                  />
                </div>
                <div className="form-group">
                  <label>Professional Summary:</label>
                  <textarea
                    value={linkedInData.summary}
                    onChange={(e) => handleManualFieldChange('summary', e.target.value)}
                    rows="4"
                    placeholder="Paste your LinkedIn summary here..."
                  />
                </div>
                <div className="form-group">
                  <label>Skills (comma-separated):</label>
                  <input
                    type="text"
                    value={linkedInData.skills.join(', ')}
                    onChange={(e) => handleManualFieldChange('skills', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                    placeholder="JavaScript, React, Node.js, Python"
                  />
                </div>
                <div className="form-group">
                  <label>Add Work Experience:</label>
                  <button
                    type="button"
                    onClick={() => {
                      setLinkedInData(prev => ({
                        ...prev,
                        experience: [...prev.experience, {
                          position: '',
                          company: '',
                          startDate: '',
                          endDate: '',
                          current: false,
                          description: ''
                        }]
                      }))
                    }}
                    className="btn-add-experience"
                  >
                    + Add Experience
                  </button>
                  {linkedInData.experience.map((exp, idx) => (
                    <div key={idx} className="experience-item">
                      <input
                        type="text"
                        placeholder="Position (e.g., Software Engineer)"
                        value={exp.position}
                        onChange={(e) => {
                          const newExp = [...linkedInData.experience]
                          newExp[idx].position = e.target.value
                          setLinkedInData(prev => ({ ...prev, experience: newExp }))
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={exp.company}
                        onChange={(e) => {
                          const newExp = [...linkedInData.experience]
                          newExp[idx].company = e.target.value
                          setLinkedInData(prev => ({ ...prev, experience: newExp }))
                        }}
                      />
                      <div className="date-inputs">
                        <input
                          type="month"
                          placeholder="Start Date"
                          value={exp.startDate}
                          onChange={(e) => {
                            const newExp = [...linkedInData.experience]
                            newExp[idx].startDate = e.target.value
                            setLinkedInData(prev => ({ ...prev, experience: newExp }))
                          }}
                        />
                        <input
                          type="month"
                          placeholder="End Date"
                          value={exp.endDate}
                          onChange={(e) => {
                            const newExp = [...linkedInData.experience]
                            newExp[idx].endDate = e.target.value
                            setLinkedInData(prev => ({ ...prev, experience: newExp }))
                          }}
                          disabled={exp.current}
                        />
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={exp.current}
                            onChange={(e) => {
                              const newExp = [...linkedInData.experience]
                              newExp[idx].current = e.target.checked
                              if (e.target.checked) newExp[idx].endDate = ''
                              setLinkedInData(prev => ({ ...prev, experience: newExp }))
                            }}
                          />
                          Current
                        </label>
                      </div>
                      <textarea
                        placeholder="Job description..."
                        value={exp.description}
                        onChange={(e) => {
                          const newExp = [...linkedInData.experience]
                          newExp[idx].description = e.target.value
                          setLinkedInData(prev => ({ ...prev, experience: newExp }))
                        }}
                        rows="2"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setLinkedInData(prev => ({
                            ...prev,
                            experience: prev.experience.filter((_, i) => i !== idx)
                          }))
                        }}
                        className="btn-remove"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <div className="form-group">
                  <label>Add Education:</label>
                  <button
                    type="button"
                    onClick={() => {
                      setLinkedInData(prev => ({
                        ...prev,
                        education: [...prev.education, {
                          degree: '',
                          institution: '',
                          field: '',
                          startDate: '',
                          endDate: '',
                          gpa: ''
                        }]
                      }))
                    }}
                    className="btn-add-education"
                  >
                    + Add Education
                  </button>
                  {linkedInData.education.map((edu, idx) => (
                    <div key={idx} className="education-item">
                      <input
                        type="text"
                        placeholder="Degree (e.g., Bachelor of Science)"
                        value={edu.degree}
                        onChange={(e) => {
                          const newEdu = [...linkedInData.education]
                          newEdu[idx].degree = e.target.value
                          setLinkedInData(prev => ({ ...prev, education: newEdu }))
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Institution Name"
                        value={edu.institution}
                        onChange={(e) => {
                          const newEdu = [...linkedInData.education]
                          newEdu[idx].institution = e.target.value
                          setLinkedInData(prev => ({ ...prev, education: newEdu }))
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Field of Study"
                        value={edu.field}
                        onChange={(e) => {
                          const newEdu = [...linkedInData.education]
                          newEdu[idx].field = e.target.value
                          setLinkedInData(prev => ({ ...prev, education: newEdu }))
                        }}
                      />
                      <div className="date-inputs">
                        <input
                          type="month"
                          placeholder="Start Date"
                          value={edu.startDate}
                          onChange={(e) => {
                            const newEdu = [...linkedInData.education]
                            newEdu[idx].startDate = e.target.value
                            setLinkedInData(prev => ({ ...prev, education: newEdu }))
                          }}
                        />
                        <input
                          type="month"
                          placeholder="End Date"
                          value={edu.endDate}
                          onChange={(e) => {
                            const newEdu = [...linkedInData.education]
                            newEdu[idx].endDate = e.target.value
                            setLinkedInData(prev => ({ ...prev, education: newEdu }))
                          }}
                        />
                        <input
                          type="text"
                          placeholder="GPA (optional)"
                          value={edu.gpa}
                          onChange={(e) => {
                            const newEdu = [...linkedInData.education]
                            newEdu[idx].gpa = e.target.value
                            setLinkedInData(prev => ({ ...prev, education: newEdu }))
                          }}
                          className="gpa-input"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setLinkedInData(prev => ({
                            ...prev,
                            education: prev.education.filter((_, i) => i !== idx)
                          }))
                        }}
                        className="btn-remove"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="import-error">
            ⚠️ {error}
          </div>
        )}

        {linkedInData.fullName && (
          <div className="import-preview">
            <h3>Preview Imported Data:</h3>
            <div className="preview-content">
              <p><strong>Name:</strong> {linkedInData.fullName}</p>
              {linkedInData.email && <p><strong>Email:</strong> {linkedInData.email}</p>}
              {linkedInData.experience.length > 0 && (
                <p><strong>Experience:</strong> {linkedInData.experience.length} position(s)</p>
              )}
              {linkedInData.education.length > 0 && (
                <p><strong>Education:</strong> {linkedInData.education.length} entry/entries</p>
              )}
              {linkedInData.skills.length > 0 && (
                <p><strong>Skills:</strong> {linkedInData.skills.length} skill(s)</p>
              )}
            </div>
          </div>
        )}

        <div className="import-actions">
          <button onClick={onClose} className="btn-cancel">
            Cancel
          </button>
          <button
            onClick={handleApplyImport}
            disabled={!linkedInData.fullName}
            className="btn-apply-import"
          >
            ✓ Apply Import
          </button>
        </div>
      </div>
    </div>
  )
}

export default LinkedInImport

