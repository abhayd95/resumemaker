/**
 * Export resume to Plain Text format
 */
export const exportToTXT = (formData) => {
  let text = ''
  
  // Personal Information
  if (formData.personalInfo) {
    const pi = formData.personalInfo
    text += `${pi.fullName || ''}\n`
    if (pi.email) text += `Email: ${pi.email}\n`
    if (pi.phone) text += `Phone: ${pi.phone}\n`
    if (pi.address) text += `Address: ${pi.address}\n`
    if (pi.linkedin) text += `LinkedIn: ${pi.linkedin}\n`
    if (pi.github) text += `GitHub: ${pi.github}\n`
    if (pi.website) text += `Website: ${pi.website}\n`
    text += '\n'
  }
  
  // Professional Summary
  if (formData.summary) {
    text += `PROFESSIONAL SUMMARY\n${'='.repeat(50)}\n${formData.summary}\n\n`
  }
  
  // Work Experience
  if (formData.experience && formData.experience.length > 0) {
    text += `WORK EXPERIENCE\n${'='.repeat(50)}\n`
    formData.experience.forEach((exp, idx) => {
      text += `\n${idx + 1}. ${exp.position || 'Position'} at ${exp.company || 'Company'}\n`
      if (exp.startDate || exp.endDate) {
        text += `   ${exp.startDate || ''} - ${exp.endDate || 'Present'}\n`
      }
      if (exp.description) {
        text += `   ${exp.description}\n`
      }
    })
    text += '\n'
  }
  
  // Education
  if (formData.education && formData.education.length > 0) {
    text += `EDUCATION\n${'='.repeat(50)}\n`
    formData.education.forEach((edu, idx) => {
      text += `\n${idx + 1}. ${edu.degree || 'Degree'} in ${edu.fieldOfStudy || 'Field'}\n`
      text += `   ${edu.institution || 'Institution'}\n`
      if (edu.startDate || edu.endDate) {
        text += `   ${edu.startDate || ''} - ${edu.endDate || 'Present'}\n`
      }
      if (edu.gpa) {
        text += `   GPA: ${edu.gpa}\n`
      }
    })
    text += '\n'
  }
  
  // Skills
  if (formData.skills && formData.skills.length > 0) {
    text += `SKILLS\n${'='.repeat(50)}\n`
    formData.skills.forEach((skill, idx) => {
      text += `${skill.name || skill}${idx < formData.skills.length - 1 ? ', ' : ''}`
    })
    text += '\n\n'
  }
  
  // Projects
  if (formData.projects && formData.projects.length > 0) {
    text += `PROJECTS\n${'='.repeat(50)}\n`
    formData.projects.forEach((proj, idx) => {
      text += `\n${idx + 1}. ${proj.name || 'Project Name'}\n`
      if (proj.description) {
        text += `   ${proj.description}\n`
      }
      if (proj.technologies) {
        text += `   Technologies: ${proj.technologies}\n`
      }
      if (proj.link) {
        text += `   Link: ${proj.link}\n`
      }
    })
    text += '\n'
  }
  
  // Certifications
  if (formData.certifications && formData.certifications.length > 0) {
    text += `CERTIFICATIONS\n${'='.repeat(50)}\n`
    formData.certifications.forEach((cert, idx) => {
      text += `${idx + 1}. ${cert.name || cert}\n`
    })
    text += '\n'
  }
  
  // Languages
  if (formData.languages && formData.languages.length > 0) {
    text += `LANGUAGES\n${'='.repeat(50)}\n`
    formData.languages.forEach((lang, idx) => {
      text += `${idx + 1}. ${lang.name || lang}${lang.proficiency ? ` - ${lang.proficiency}` : ''}\n`
    })
  }
  
  return text
}

/**
 * Export resume to HTML format
 */
export const exportToHTML = (formData, templateId = 1) => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
  const bgColor = isDark ? '#1a1a1a' : '#ffffff'
  const textColor = isDark ? '#e0e0e0' : '#333333'
  const accentColor = '#6366f1'
  
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${formData.personalInfo?.fullName || 'Resume'}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: ${bgColor};
      color: ${textColor};
      line-height: 1.6;
      padding: 20px;
    }
    .resume-container {
      max-width: 800px;
      margin: 0 auto;
      background: ${bgColor};
      padding: 40px;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
    }
    .header {
      border-bottom: 3px solid ${accentColor};
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    h1 { color: ${accentColor}; font-size: 2.5em; margin-bottom: 10px; }
    .contact-info { display: flex; flex-wrap: wrap; gap: 15px; }
    .contact-info span { color: #666; }
    .section { margin: 30px 0; }
    .section-title {
      color: ${accentColor};
      font-size: 1.5em;
      border-bottom: 2px solid ${accentColor};
      padding-bottom: 5px;
      margin-bottom: 15px;
    }
    .experience-item, .education-item, .project-item {
      margin: 20px 0;
      padding-left: 20px;
      border-left: 3px solid ${accentColor};
    }
    .item-title { font-weight: bold; font-size: 1.1em; color: ${accentColor}; }
    .item-meta { color: #666; font-size: 0.9em; margin: 5px 0; }
    .skills-list { display: flex; flex-wrap: wrap; gap: 10px; }
    .skill-tag {
      background: ${accentColor};
      color: white;
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 0.9em;
    }
    @media print {
      body { padding: 0; }
      .resume-container { box-shadow: none; }
    }
  </style>
</head>
<body>
  <div class="resume-container">
    <div class="header">
      <h1>${formData.personalInfo?.fullName || ''}</h1>
      <div class="contact-info">
        ${formData.personalInfo?.email ? `<span>📧 ${formData.personalInfo.email}</span>` : ''}
        ${formData.personalInfo?.phone ? `<span>📱 ${formData.personalInfo.phone}</span>` : ''}
        ${formData.personalInfo?.address ? `<span>📍 ${formData.personalInfo.address}</span>` : ''}
        ${formData.personalInfo?.linkedin ? `<span>🔗 <a href="${formData.personalInfo.linkedin}" target="_blank">LinkedIn</a></span>` : ''}
        ${formData.personalInfo?.github ? `<span>💻 <a href="${formData.personalInfo.github}" target="_blank">GitHub</a></span>` : ''}
      </div>
    </div>
    
    ${formData.summary ? `
    <div class="section">
      <h2 class="section-title">Professional Summary</h2>
      <p>${formData.summary.replace(/\n/g, '<br>')}</p>
    </div>
    ` : ''}
    
    ${formData.experience && formData.experience.length > 0 ? `
    <div class="section">
      <h2 class="section-title">Work Experience</h2>
      ${formData.experience.map(exp => `
        <div class="experience-item">
          <div class="item-title">${exp.position || ''} at ${exp.company || ''}</div>
          <div class="item-meta">${exp.startDate || ''} - ${exp.endDate || 'Present'}</div>
          <p>${exp.description ? exp.description.replace(/\n/g, '<br>') : ''}</p>
        </div>
      `).join('')}
    </div>
    ` : ''}
    
    ${formData.education && formData.education.length > 0 ? `
    <div class="section">
      <h2 class="section-title">Education</h2>
      ${formData.education.map(edu => `
        <div class="education-item">
          <div class="item-title">${edu.degree || ''} in ${edu.fieldOfStudy || ''}</div>
          <div class="item-meta">${edu.institution || ''} | ${edu.startDate || ''} - ${edu.endDate || 'Present'}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</div>
        </div>
      `).join('')}
    </div>
    ` : ''}
    
    ${formData.skills && formData.skills.length > 0 ? `
    <div class="section">
      <h2 class="section-title">Skills</h2>
      <div class="skills-list">
        ${formData.skills.map(skill => `
          <span class="skill-tag">${typeof skill === 'string' ? skill : skill.name || ''}</span>
        `).join('')}
      </div>
    </div>
    ` : ''}
    
    ${formData.projects && formData.projects.length > 0 ? `
    <div class="section">
      <h2 class="section-title">Projects</h2>
      ${formData.projects.map(proj => `
        <div class="project-item">
          <div class="item-title">${proj.name || ''}</div>
          <p>${proj.description ? proj.description.replace(/\n/g, '<br>') : ''}</p>
          ${proj.technologies ? `<div class="item-meta">Technologies: ${proj.technologies}</div>` : ''}
          ${proj.link ? `<div class="item-meta">🔗 <a href="${proj.link}" target="_blank">${proj.link}</a></div>` : ''}
        </div>
      `).join('')}
    </div>
    ` : ''}
    
    ${formData.certifications && formData.certifications.length > 0 ? `
    <div class="section">
      <h2 class="section-title">Certifications</h2>
      <ul>
        ${formData.certifications.map(cert => `
          <li>${typeof cert === 'string' ? cert : cert.name || ''}</li>
        `).join('')}
      </ul>
    </div>
    ` : ''}
    
    ${formData.languages && formData.languages.length > 0 ? `
    <div class="section">
      <h2 class="section-title">Languages</h2>
      <ul>
        ${formData.languages.map(lang => `
          <li>${typeof lang === 'string' ? lang : lang.name || ''}${typeof lang === 'object' && lang.proficiency ? ` - ${lang.proficiency}` : ''}</li>
        `).join('')}
      </ul>
    </div>
    ` : ''}
  </div>
</body>
</html>`
  
  return html
}

/**
 * Export resume to JSON format (for backup/restore)
 */
export const exportToJSON = (formData, templateId, coverLetterData) => {
  const exportData = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    templateId: templateId || 1,
    resumeData: formData,
    coverLetterData: coverLetterData || null,
  }
  
  return JSON.stringify(exportData, null, 2)
}

/**
 * Download file helper
 */
export const downloadFile = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

