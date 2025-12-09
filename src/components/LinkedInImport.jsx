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

    if (file.type !== 'application/json') {
      setError('Please upload a JSON file exported from LinkedIn')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        // Parse LinkedIn export JSON format
        const parsedData = parseLinkedInExport(data)
        setLinkedInData(parsedData)
        setError('')
      } catch (err) {
        setError('Invalid file format. Please upload a valid LinkedIn export JSON file.')
      }
    }
    reader.readAsText(file)
  }

  const parseLinkedInExport = (data) => {
    // Parse LinkedIn export JSON structure
    const profile = data.Profile || data.profile || {}
    const positions = data.Positions || data.positions || []
    const educations = data.Educations || data.educations || []
    const skills = data.Skills || data.skills || []
    const languages = data.Languages || data.languages || []

    return {
      fullName: profile.FirstName && profile.LastName 
        ? `${profile.FirstName} ${profile.LastName}` 
        : profile.fullName || '',
      email: profile.EmailAddresses?.[0] || profile.email || '',
      phone: profile.PhoneNumbers?.[0] || profile.phone || '',
      address: profile.Address || profile.address || '',
      linkedin: profile.ProfileUrl || profile.linkedin || '',
      summary: profile.Summary || profile.summary || '',
      experience: positions.map(pos => ({
        position: pos.Title || pos.title || '',
        company: pos.CompanyName || pos.company || '',
        startDate: formatDate(pos.StartDate || pos.startDate),
        endDate: pos.EndDate ? formatDate(pos.EndDate) : (pos.endDate ? formatDate(pos.endDate) : ''),
        current: !pos.EndDate && !pos.endDate,
        description: pos.Description || pos.description || ''
      })),
      education: educations.map(edu => ({
        degree: edu.Degree || edu.degree || '',
        institution: edu.SchoolName || edu.institution || '',
        field: edu.FieldOfStudy || edu.field || '',
        startDate: formatDate(edu.StartDate || edu.startDate),
        endDate: formatDate(edu.EndDate || edu.endDate),
        gpa: edu.Grade || edu.gpa || ''
      })),
      skills: skills.map(skill => skill.Name || skill.name || skill).filter(Boolean),
      languages: languages.map(lang => ({
        name: lang.Name || lang.name || '',
        proficiency: lang.Proficiency || lang.proficiency || 'Intermediate'
      }))
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

