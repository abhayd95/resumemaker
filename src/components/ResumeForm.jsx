import { useState } from 'react'
import AutocompleteInput from './AutocompleteInput'

const ResumeForm = ({ initialData, onSubmit }) => {
  const [data, setData] = useState(initialData)

  const updatePersonalInfo = (field, value) => {
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }))
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        updatePersonalInfo('photo', reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const generateYearOptions = (startYear = 2000, endYear = new Date().getFullYear() + 1) => {
    const years = []
    for (let year = endYear; year >= startYear; year--) {
      years.push(year)
    }
    return years
  }

  const generateMonthOptions = () => {
    return [
      { value: '01', label: 'January' },
      { value: '02', label: 'February' },
      { value: '03', label: 'March' },
      { value: '04', label: 'April' },
      { value: '05', label: 'May' },
      { value: '06', label: 'June' },
      { value: '07', label: 'July' },
      { value: '08', label: 'August' },
      { value: '09', label: 'September' },
      { value: '10', label: 'October' },
      { value: '11', label: 'November' },
      { value: '12', label: 'December' }
    ]
  }

  const handleDateChange = (index, field, type, value, isExperience = true) => {
    const currentDate = isExperience 
      ? data.experience[index][field] || ''
      : data.education[index][field] || ''
    
    let newDate = currentDate
    if (type === 'year') {
      const month = currentDate.split('-')[1] || '01'
      newDate = `${value}-${month}`
    } else if (type === 'month') {
      const year = currentDate.split('-')[0] || new Date().getFullYear()
      newDate = `${year}-${value}`
    }

    if (isExperience) {
      updateExperience(index, field, newDate)
    } else {
      updateEducation(index, field, newDate)
    }
  }

  const addExperience = () => {
    setData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }]
    }))
  }

  const updateExperience = (index, field, value) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const removeExperience = (index) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }))
  }

  const addEducation = () => {
    setData(prev => ({
      ...prev,
      education: [...prev.education, {
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: ''
      }]
    }))
  }

  const updateEducation = (index, field, value) => {
    setData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }))
  }

  const removeEducation = (index) => {
    setData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }))
  }

  const addSkill = () => {
    setData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }))
  }

  const updateSkill = (index, value) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
    }))
  }

  const removeSkill = (index) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }))
  }

  const addProject = () => {
    setData(prev => ({
      ...prev,
      projects: [...prev.projects, {
        name: '',
        description: '',
        technologies: '',
        link: ''
      }]
    }))
  }

  const updateProject = (index, field, value) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === index ? { ...proj, [field]: value } : proj
      )
    }))
  }

  const removeProject = (index) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }))
  }

  const addLanguage = () => {
    setData(prev => ({
      ...prev,
      languages: [...prev.languages, {
        name: '',
        proficiency: ''
      }]
    }))
  }

  const updateLanguage = (index, field, value) => {
    setData(prev => ({
      ...prev,
      languages: prev.languages.map((lang, i) => 
        i === index ? { ...lang, [field]: value } : lang
      )
    }))
  }

  const removeLanguage = (index) => {
    setData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }))
  }

  const addCertification = () => {
    setData(prev => ({
      ...prev,
      certifications: [...prev.certifications, {
        name: '',
        organization: '',
        date: '',
        credentialId: ''
      }]
    }))
  }

  const updateCertification = (index, field, value) => {
    setData(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) => 
        i === index ? { ...cert, [field]: value } : cert
      )
    }))
  }

  const removeCertification = (index) => {
    setData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }))
  }

  const handleCertDateChange = (index, type, value) => {
    const currentDate = data.certifications[index].date || ''
    let newDate = currentDate
    if (type === 'year') {
      const month = currentDate.split('-')[1] || '01'
      newDate = `${value}-${month}`
    } else if (type === 'month') {
      const year = currentDate.split('-')[0] || new Date().getFullYear()
      newDate = `${year}-${value}`
    }
    updateCertification(index, 'date', newDate)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(data)
  }

  return (
    <div className="resume-form">
      <h2>Fill Your Details</h2>
      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <section className="form-section">
          <h3>Personal Information</h3>
          <div className="form-grid">
            <div className="form-group photo-upload-group">
              <label>Profile Photo (Optional)</label>
              <div className="photo-upload-container">
                {data.personalInfo.photo ? (
                  <div className="photo-preview">
                    <img src={data.personalInfo.photo} alt="Profile" />
                    <button 
                      type="button" 
                      onClick={() => updatePersonalInfo('photo', '')}
                      className="btn-remove-photo"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="photo-upload-label">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      style={{ display: 'none' }}
                    />
                    <div className="photo-upload-placeholder">
                      <span>📷</span>
                      <span>Click to upload photo</span>
                      <small>Max 2MB, JPG/PNG</small>
                    </div>
                  </label>
                )}
              </div>
            </div>
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                value={data.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                value={data.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                value={data.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                value={data.personalInfo.address}
                onChange={(e) => updatePersonalInfo('address', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>LinkedIn</label>
              <input
                type="url"
                value={data.personalInfo.linkedin}
                onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
            <div className="form-group">
              <label>GitHub</label>
              <input
                type="url"
                value={data.personalInfo.github}
                onChange={(e) => updatePersonalInfo('github', e.target.value)}
                placeholder="https://github.com/yourusername"
              />
            </div>
            <div className="form-group">
              <label>Website</label>
              <input
                type="url"
                value={data.personalInfo.website}
                onChange={(e) => updatePersonalInfo('website', e.target.value)}
                placeholder="https://yourwebsite.com"
              />
            </div>
            <div className="form-group">
              <label>Instagram</label>
              <input
                type="url"
                value={data.personalInfo.instagram}
                onChange={(e) => updatePersonalInfo('instagram', e.target.value)}
                placeholder="https://instagram.com/yourprofile"
              />
            </div>
            <div className="form-group">
              <label>Facebook</label>
              <input
                type="url"
                value={data.personalInfo.facebook}
                onChange={(e) => updatePersonalInfo('facebook', e.target.value)}
                placeholder="https://facebook.com/yourprofile"
              />
            </div>
            <div className="form-group">
              <label>Telegram</label>
              <input
                type="url"
                value={data.personalInfo.telegram}
                onChange={(e) => updatePersonalInfo('telegram', e.target.value)}
                placeholder="https://t.me/yourusername"
              />
            </div>
          </div>
        </section>

        {/* Professional Summary */}
        <section className="form-section">
          <h3>Professional Summary</h3>
          <div className="form-group">
            <textarea
              value={data.summary}
              onChange={(e) => setData(prev => ({ ...prev, summary: e.target.value }))}
              rows="4"
              placeholder="Write a brief summary about yourself..."
            />
          </div>
        </section>

        {/* Experience */}
        <section className="form-section">
          <h3>Work Experience</h3>
          {data.experience.map((exp, index) => (
            <div key={index} className="form-item-group">
              <div className="form-grid">
                <div className="form-group">
                  <label>Company Name *</label>
                  <AutocompleteInput
                    value={exp.company}
                    onChange={(value) => updateExperience(index, 'company', value)}
                    placeholder="e.g., Google, Microsoft"
                    suggestionType="company"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Position *</label>
                  <AutocompleteInput
                    value={exp.position}
                    onChange={(value) => updateExperience(index, 'position', value)}
                    placeholder="e.g., Software Engineer"
                    suggestionType="jobTitle"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Start Date</label>
                  <div className="date-selector">
                    <select
                      value={exp.startDate ? exp.startDate.split('-')[0] : ''}
                      onChange={(e) => handleDateChange(index, 'startDate', 'year', e.target.value, true)}
                      className="date-year"
                    >
                      <option value="">Year</option>
                      {generateYearOptions().map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <select
                      value={exp.startDate ? exp.startDate.split('-')[1] : ''}
                      onChange={(e) => handleDateChange(index, 'startDate', 'month', e.target.value, true)}
                      className="date-month"
                    >
                      <option value="">Month</option>
                      {generateMonthOptions().map(month => (
                        <option key={month.value} value={month.value}>{month.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <div className="date-selector">
                    <select
                      value={exp.endDate ? exp.endDate.split('-')[0] : ''}
                      onChange={(e) => handleDateChange(index, 'endDate', 'year', e.target.value, true)}
                      className="date-year"
                      disabled={exp.current}
                    >
                      <option value="">Year</option>
                      {generateYearOptions().map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <select
                      value={exp.endDate ? exp.endDate.split('-')[1] : ''}
                      onChange={(e) => handleDateChange(index, 'endDate', 'month', e.target.value, true)}
                      className="date-month"
                      disabled={exp.current}
                    >
                      <option value="">Month</option>
                      {generateMonthOptions().map(month => (
                        <option key={month.value} value={month.value}>{month.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                    />
                    Currently Working Here
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(index, 'description', e.target.value)}
                  rows="3"
                  placeholder="Describe your responsibilities and achievements..."
                />
              </div>
              <button type="button" onClick={() => removeExperience(index)} className="btn-remove">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addExperience} className="btn-add">
            + Add Experience
          </button>
        </section>

        {/* Education */}
        <section className="form-section">
          <h3>Education</h3>
          {data.education.map((edu, index) => (
            <div key={index} className="form-item-group">
              <div className="form-grid">
                <div className="form-group">
                  <label>Institution *</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Degree *</label>
                  <AutocompleteInput
                    value={edu.degree}
                    onChange={(value) => updateEducation(index, 'degree', value)}
                    placeholder="e.g., Bachelor of Science"
                    suggestionType="degree"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Field of Study</label>
                  <AutocompleteInput
                    value={edu.field}
                    onChange={(value) => updateEducation(index, 'field', value)}
                    placeholder="e.g., Computer Science"
                    suggestionType="field"
                  />
                </div>
                <div className="form-group">
                  <label>Start Date</label>
                  <div className="date-selector">
                    <select
                      value={edu.startDate ? edu.startDate.split('-')[0] : ''}
                      onChange={(e) => handleDateChange(index, 'startDate', 'year', e.target.value, false)}
                      className="date-year"
                    >
                      <option value="">Year</option>
                      {generateYearOptions().map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <select
                      value={edu.startDate ? edu.startDate.split('-')[1] : ''}
                      onChange={(e) => handleDateChange(index, 'startDate', 'month', e.target.value, false)}
                      className="date-month"
                    >
                      <option value="">Month</option>
                      {generateMonthOptions().map(month => (
                        <option key={month.value} value={month.value}>{month.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <div className="date-selector">
                    <select
                      value={edu.endDate ? edu.endDate.split('-')[0] : ''}
                      onChange={(e) => handleDateChange(index, 'endDate', 'year', e.target.value, false)}
                      className="date-year"
                    >
                      <option value="">Year</option>
                      {generateYearOptions().map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <select
                      value={edu.endDate ? edu.endDate.split('-')[1] : ''}
                      onChange={(e) => handleDateChange(index, 'endDate', 'month', e.target.value, false)}
                      className="date-month"
                    >
                      <option value="">Month</option>
                      {generateMonthOptions().map(month => (
                        <option key={month.value} value={month.value}>{month.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>GPA</label>
                  <input
                    type="text"
                    value={edu.gpa}
                    onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                    placeholder="e.g., 3.8/4.0"
                  />
                </div>
              </div>
              <button type="button" onClick={() => removeEducation(index)} className="btn-remove">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addEducation} className="btn-add">
            + Add Education
          </button>
        </section>

        {/* Skills */}
        <section className="form-section">
          <h3>Skills</h3>
          <div className="skills-container">
            {data.skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <AutocompleteInput
                  value={skill}
                  onChange={(value) => updateSkill(index, value)}
                  placeholder="e.g., JavaScript, Python, React"
                  suggestionType="skill"
                />
                <button type="button" onClick={() => removeSkill(index)} className="btn-remove-small">
                  ×
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addSkill} className="btn-add">
            + Add Skill
          </button>
        </section>

        {/* Projects */}
        <section className="form-section">
          <h3>Projects</h3>
          {data.projects.map((proj, index) => (
            <div key={index} className="form-item-group">
              <div className="form-grid">
                <div className="form-group">
                  <label>Project Name *</label>
                  <input
                    type="text"
                    value={proj.name}
                    onChange={(e) => updateProject(index, 'name', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Technologies</label>
                  <input
                    type="text"
                    value={proj.technologies}
                    onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                    placeholder="e.g., React, Node.js, MongoDB"
                  />
                </div>
                <div className="form-group">
                  <label>Project Link</label>
                  <input
                    type="url"
                    value={proj.link}
                    onChange={(e) => updateProject(index, 'link', e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={proj.description}
                  onChange={(e) => updateProject(index, 'description', e.target.value)}
                  rows="3"
                  placeholder="Describe your project..."
                />
              </div>
              <button type="button" onClick={() => removeProject(index)} className="btn-remove">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addProject} className="btn-add">
            + Add Project
          </button>
        </section>

        {/* Languages */}
        <section className="form-section">
          <h3>Languages</h3>
          {data.languages.map((lang, index) => (
            <div key={index} className="form-item-group">
              <div className="form-grid">
                <div className="form-group">
                  <label>Language *</label>
                  <AutocompleteInput
                    value={lang.name}
                    onChange={(value) => updateLanguage(index, 'name', value)}
                    placeholder="e.g., English, Hindi, Spanish"
                    suggestionType="language"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Proficiency Level *</label>
                  <select
                    value={lang.proficiency}
                    onChange={(e) => updateLanguage(index, 'proficiency', e.target.value)}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Native">Native</option>
                  </select>
                </div>
              </div>
              <button type="button" onClick={() => removeLanguage(index)} className="btn-remove">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addLanguage} className="btn-add">
            + Add Language
          </button>
        </section>

        {/* Certifications */}
        <section className="form-section">
          <h3>Certifications</h3>
          {data.certifications.map((cert, index) => (
            <div key={index} className="form-item-group">
              <div className="form-grid">
                <div className="form-group">
                  <label>Certification Name *</label>
                  <AutocompleteInput
                    value={cert.name}
                    onChange={(value) => updateCertification(index, 'name', value)}
                    placeholder="e.g., AWS Certified Developer"
                    suggestionType="certification"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Issuing Organization</label>
                  <input
                    type="text"
                    value={cert.organization}
                    onChange={(e) => updateCertification(index, 'organization', e.target.value)}
                    placeholder="e.g., Amazon Web Services"
                  />
                </div>
                <div className="form-group">
                  <label>Issue Date</label>
                  <div className="date-selector">
                    <select
                      value={cert.date ? cert.date.split('-')[0] : ''}
                      onChange={(e) => handleCertDateChange(index, 'year', e.target.value)}
                      className="date-year"
                    >
                      <option value="">Year</option>
                      {generateYearOptions().map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <select
                      value={cert.date ? cert.date.split('-')[1] : ''}
                      onChange={(e) => handleCertDateChange(index, 'month', e.target.value)}
                      className="date-month"
                    >
                      <option value="">Month</option>
                      {generateMonthOptions().map(month => (
                        <option key={month.value} value={month.value}>{month.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Credential ID / Link</label>
                  <input
                    type="text"
                    value={cert.credentialId}
                    onChange={(e) => updateCertification(index, 'credentialId', e.target.value)}
                    placeholder="Certificate ID or verification link"
                  />
                </div>
              </div>
              <button type="button" onClick={() => removeCertification(index)} className="btn-remove">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addCertification} className="btn-add">
            + Add Certification
          </button>
        </section>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Continue to Template Selection →
          </button>
        </div>
      </form>
    </div>
  )
}

export default ResumeForm

