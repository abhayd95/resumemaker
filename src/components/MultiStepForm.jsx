import { useState } from 'react'
import AutocompleteInput from './AutocompleteInput'

const MultiStepForm = ({ initialData, onSubmit, onSectionReorder }) => {
  const [data, setData] = useState(initialData)
  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState({})

  const totalSteps = 11
  const steps = [
    { id: 1, name: 'Personal Information', icon: '👤' },
    { id: 2, name: 'Professional Summary', icon: '📝' },
    { id: 3, name: 'Work Experience', icon: '💼' },
    { id: 4, name: 'Education', icon: '🎓' },
    { id: 5, name: 'Skills', icon: '🛠️' },
    { id: 6, name: 'Projects', icon: '🚀' },
    { id: 7, name: 'Languages', icon: '🌐' },
    { id: 8, name: 'Certifications', icon: '🏆' },
    { id: 9, name: 'References', icon: '📞' },
    { id: 10, name: 'Awards & Achievements', icon: '⭐' },
    { id: 11, name: 'Volunteer Work', icon: '🤝' }
  ]

  const updatePersonalInfo = (field, value) => {
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }))
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
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

  const validateStep = (step) => {
    const newErrors = {}
    
    if (step === 1) {
      if (!data.personalInfo.fullName) newErrors.fullName = 'Full Name is required'
      if (!data.personalInfo.email) newErrors.email = 'Email is required'
      if (!data.personalInfo.phone) newErrors.phone = 'Phone is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        onSubmit(data)
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleStepClick = (step) => {
    if (step <= currentStep) {
      setCurrentStep(step)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Experience functions
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

  // Education functions
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

  // Skills functions
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

  // Projects functions
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

  // Languages functions
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

  // Certifications functions
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

  // References functions
  const addReference = () => {
    setData(prev => ({
      ...prev,
      references: [...(prev.references || []), {
        name: '',
        position: '',
        company: '',
        email: '',
        phone: '',
        relationship: ''
      }]
    }))
  }

  const updateReference = (index, field, value) => {
    setData(prev => ({
      ...prev,
      references: (prev.references || []).map((ref, i) => 
        i === index ? { ...ref, [field]: value } : ref
      )
    }))
  }

  const removeReference = (index) => {
    setData(prev => ({
      ...prev,
      references: (prev.references || []).filter((_, i) => i !== index)
    }))
  }

  // Awards functions
  const addAward = () => {
    setData(prev => ({
      ...prev,
      awards: [...(prev.awards || []), {
        title: '',
        organization: '',
        date: '',
        description: ''
      }]
    }))
  }

  const updateAward = (index, field, value) => {
    setData(prev => ({
      ...prev,
      awards: (prev.awards || []).map((award, i) => 
        i === index ? { ...award, [field]: value } : award
      )
    }))
  }

  const removeAward = (index) => {
    setData(prev => ({
      ...prev,
      awards: (prev.awards || []).filter((_, i) => i !== index)
    }))
  }

  const handleAwardDateChange = (index, type, value) => {
    const currentDate = (data.awards || [])[index]?.date || ''
    let newDate = currentDate
    if (type === 'year') {
      const month = currentDate.split('-')[1] || '01'
      newDate = `${value}-${month}`
    } else if (type === 'month') {
      const year = currentDate.split('-')[0] || new Date().getFullYear()
      newDate = `${year}-${value}`
    }
    updateAward(index, 'date', newDate)
  }

  // Volunteer functions
  const addVolunteer = () => {
    setData(prev => ({
      ...prev,
      volunteer: [...(prev.volunteer || []), {
        organization: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }]
    }))
  }

  const updateVolunteer = (index, field, value) => {
    setData(prev => ({
      ...prev,
      volunteer: (prev.volunteer || []).map((vol, i) => 
        i === index ? { ...vol, [field]: value } : vol
      )
    }))
  }

  const removeVolunteer = (index) => {
    setData(prev => ({
      ...prev,
      volunteer: (prev.volunteer || []).filter((_, i) => i !== index)
    }))
  }

  const handleVolunteerDateChange = (index, field, type, value) => {
    const currentDate = (data.volunteer || [])[index]?.[field] || ''
    let newDate = currentDate
    if (type === 'year') {
      const month = currentDate.split('-')[1] || '01'
      newDate = `${value}-${month}`
    } else if (type === 'month') {
      const year = currentDate.split('-')[0] || new Date().getFullYear()
      newDate = `${year}-${value}`
    }
    updateVolunteer(index, field, newDate)
  }

  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2>👤 Personal Information</h2>
              <p>Let's start with your basic details</p>
            </div>
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
                  className={errors.fullName ? 'error' : ''}
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={data.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  required
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  value={data.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  required
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
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
          </div>
        )

      case 2:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2>📝 Professional Summary</h2>
              <p>Write a brief summary about yourself</p>
            </div>
            <div className="form-group">
              <textarea
                value={data.summary}
                onChange={(e) => setData(prev => ({ ...prev, summary: e.target.value }))}
                rows="8"
                placeholder="Example: Experienced software engineer with 5+ years of expertise in full-stack development. Specialized in React, Node.js, and cloud technologies..."
                className="summary-textarea"
              />
              <div className="char-count">{data.summary.length} characters</div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2>💼 Work Experience</h2>
              <p>Add your work experience (most recent first)</p>
            </div>
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
                    rows="4"
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
          </div>
        )

      case 4:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2>🎓 Education</h2>
              <p>Add your educational background</p>
            </div>
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
          </div>
        )

      case 5:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2>🛠️ Skills</h2>
              <p>Add your technical and soft skills</p>
            </div>
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
          </div>
        )

      case 6:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2>🚀 Projects</h2>
              <p>Showcase your projects and achievements</p>
            </div>
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
                    rows="4"
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
          </div>
        )

      case 7:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2>🌐 Languages</h2>
              <p>List the languages you speak</p>
            </div>
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
          </div>
        )

      case 8:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2>🏆 Certifications</h2>
              <p>Add your professional certifications</p>
            </div>
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
          </div>
        )

      case 9:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2>📞 References</h2>
              <p>Add professional references (optional)</p>
            </div>
            {(data.references || []).map((ref, index) => (
              <div key={index} className="form-item-group">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Name *</label>
                    <input
                      type="text"
                      value={ref.name}
                      onChange={(e) => updateReference(index, 'name', e.target.value)}
                      placeholder="Reference name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Position</label>
                    <input
                      type="text"
                      value={ref.position}
                      onChange={(e) => updateReference(index, 'position', e.target.value)}
                      placeholder="e.g., Senior Manager"
                    />
                  </div>
                  <div className="form-group">
                    <label>Company</label>
                    <input
                      type="text"
                      value={ref.company}
                      onChange={(e) => updateReference(index, 'company', e.target.value)}
                      placeholder="Company name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={ref.email}
                      onChange={(e) => updateReference(index, 'email', e.target.value)}
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={ref.phone}
                      onChange={(e) => updateReference(index, 'phone', e.target.value)}
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div className="form-group">
                    <label>Relationship</label>
                    <input
                      type="text"
                      value={ref.relationship}
                      onChange={(e) => updateReference(index, 'relationship', e.target.value)}
                      placeholder="e.g., Former Manager, Colleague"
                    />
                  </div>
                </div>
                <button type="button" onClick={() => removeReference(index)} className="btn-remove">
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addReference} className="btn-add">
              + Add Reference
            </button>
          </div>
        )

      case 10:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2>⭐ Awards & Achievements</h2>
              <p>Showcase your accomplishments</p>
            </div>
            {(data.awards || []).map((award, index) => (
              <div key={index} className="form-item-group">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Award Title *</label>
                    <input
                      type="text"
                      value={award.title}
                      onChange={(e) => updateAward(index, 'title', e.target.value)}
                      placeholder="e.g., Employee of the Year"
                    />
                  </div>
                  <div className="form-group">
                    <label>Organization</label>
                    <input
                      type="text"
                      value={award.organization}
                      onChange={(e) => updateAward(index, 'organization', e.target.value)}
                      placeholder="Issuing organization"
                    />
                  </div>
                  <div className="form-group">
                    <label>Date</label>
                    <div className="date-selector">
                      <select
                        value={award.date ? award.date.split('-')[0] : ''}
                        onChange={(e) => handleAwardDateChange(index, 'year', e.target.value)}
                        className="date-year"
                      >
                        <option value="">Year</option>
                        {generateYearOptions().map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      <select
                        value={award.date ? award.date.split('-')[1] : ''}
                        onChange={(e) => handleAwardDateChange(index, 'month', e.target.value)}
                        className="date-month"
                      >
                        <option value="">Month</option>
                        {generateMonthOptions().map(month => (
                          <option key={month.value} value={month.value}>{month.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={award.description}
                    onChange={(e) => updateAward(index, 'description', e.target.value)}
                    rows="3"
                    placeholder="Describe the award or achievement..."
                  />
                </div>
                <button type="button" onClick={() => removeAward(index)} className="btn-remove">
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addAward} className="btn-add">
              + Add Award
            </button>
          </div>
        )

      case 11:
        return (
          <div className="step-content">
            <div className="step-header">
              <h2>🤝 Volunteer Work</h2>
              <p>Show your community involvement</p>
            </div>
            {(data.volunteer || []).map((vol, index) => (
              <div key={index} className="form-item-group">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Organization *</label>
                    <input
                      type="text"
                      value={vol.organization}
                      onChange={(e) => updateVolunteer(index, 'organization', e.target.value)}
                      placeholder="Organization name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Position</label>
                    <input
                      type="text"
                      value={vol.position}
                      onChange={(e) => updateVolunteer(index, 'position', e.target.value)}
                      placeholder="e.g., Volunteer Coordinator"
                    />
                  </div>
                  <div className="form-group">
                    <label>Start Date</label>
                    <div className="date-selector">
                      <select
                        value={vol.startDate ? vol.startDate.split('-')[0] : ''}
                        onChange={(e) => handleVolunteerDateChange(index, 'startDate', 'year', e.target.value)}
                        className="date-year"
                      >
                        <option value="">Year</option>
                        {generateYearOptions().map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      <select
                        value={vol.startDate ? vol.startDate.split('-')[1] : ''}
                        onChange={(e) => handleVolunteerDateChange(index, 'startDate', 'month', e.target.value)}
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
                    {vol.current ? (
                      <div className="current-indicator">Present</div>
                    ) : (
                      <div className="date-selector">
                        <select
                          value={vol.endDate ? vol.endDate.split('-')[0] : ''}
                          onChange={(e) => handleVolunteerDateChange(index, 'endDate', 'year', e.target.value)}
                          className="date-year"
                        >
                          <option value="">Year</option>
                          {generateYearOptions().map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                        <select
                          value={vol.endDate ? vol.endDate.split('-')[1] : ''}
                          onChange={(e) => handleVolunteerDateChange(index, 'endDate', 'month', e.target.value)}
                          className="date-month"
                        >
                          <option value="">Month</option>
                          {generateMonthOptions().map(month => (
                            <option key={month.value} value={month.value}>{month.label}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={vol.current}
                        onChange={(e) => updateVolunteer(index, 'current', e.target.checked)}
                      />
                      Currently volunteering
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={vol.description}
                    onChange={(e) => updateVolunteer(index, 'description', e.target.value)}
                    rows="4"
                    placeholder="Describe your volunteer work and impact..."
                  />
                </div>
                <button type="button" onClick={() => removeVolunteer(index)} className="btn-remove">
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addVolunteer} className="btn-add">
              + Add Volunteer Work
            </button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="multi-step-form">
      {/* Step Progress Bar */}
      <div className="step-progress-container">
        <div className="step-progress-bar">
          {steps.map((step, index) => (
            <div key={step.id} className="step-progress-item">
              <div 
                className={`step-progress-circle ${currentStep >= step.id ? 'active' : ''} ${currentStep === step.id ? 'current' : ''}`}
                onClick={() => handleStepClick(step.id)}
              >
                {currentStep > step.id ? '✓' : step.id}
              </div>
              {index < steps.length - 1 && (
                <div className={`step-progress-line ${currentStep > step.id ? 'active' : ''}`}></div>
              )}
            </div>
          ))}
          {onSectionReorder && (
            <button 
              onClick={() => onSectionReorder()}
              className="btn-reorder-sections"
              title="Reorder Sections"
            >
              🔄 Reorder Sections
            </button>
          )}
        </div>
        <div className="step-names-mobile">
          <div className="current-step-name">
            {steps[currentStep - 1].icon} {steps[currentStep - 1].name}
          </div>
          <div className="step-counter">
            Step {currentStep} of {totalSteps}
          </div>
        </div>
      </div>

      {/* Step Names Desktop */}
      <div className="step-names-desktop">
        {steps.map((step) => (
          <div 
            key={step.id} 
            className={`step-name-item ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
            onClick={() => handleStepClick(step.id)}
          >
            <span className="step-icon">{step.icon}</span>
            <span className="step-name">{step.name}</span>
          </div>
        ))}
      </div>

      {/* Form Content */}
      <div className="form-wrapper">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="step-navigation">
        <button 
          type="button" 
          onClick={handlePrevious} 
          className="btn-nav btn-prev"
          disabled={currentStep === 1}
        >
          ← Previous
        </button>
        <div className="step-indicator-text">
          Step {currentStep} of {totalSteps}
        </div>
        <button 
          type="button" 
          onClick={handleNext} 
          className="btn-nav btn-next"
        >
          {currentStep === totalSteps ? 'Finish →' : 'Next →'}
        </button>
      </div>
    </div>
  )
}

export default MultiStepForm

