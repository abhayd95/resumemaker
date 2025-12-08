import '../../styles/templates.css'

const Template6 = ({ data, colorTheme = 'blue' }) => {
  const themes = {
    blue: { primary: '#0ea5e9', secondary: '#0284c7' },
    green: { primary: '#22c55e', secondary: '#16a34a' },
    purple: { primary: '#a855f7', secondary: '#9333ea' },
    red: { primary: '#f43f5e', secondary: '#e11d48' },
    orange: { primary: '#fb923c', secondary: '#f97316' }
  }
  
  const theme = themes[colorTheme] || themes.blue

  return (
    <div className="resume-template template-6" style={{ '--theme-color': theme.primary, '--theme-dark': theme.secondary }}>
      <div className="resume-sidebar-6">
        {data.personalInfo.photo && (
          <div className="photo-section-6">
            <img src={data.personalInfo.photo} alt={data.personalInfo.fullName} className="profile-photo-6" />
          </div>
        )}
        <div className="sidebar-content-6">
          <h1 className="name-6">{data.personalInfo.fullName}</h1>
          
          {data.summary && (
            <section className="sidebar-section-6">
              <h2 className="sidebar-title-6">About</h2>
              <p className="sidebar-text-6">{data.summary}</p>
            </section>
          )}

          <section className="sidebar-section-6">
            <h2 className="sidebar-title-6">Contact</h2>
            <div className="contact-list-6">
              {data.personalInfo.email && <div>📧 {data.personalInfo.email}</div>}
              {data.personalInfo.phone && <div>📱 {data.personalInfo.phone}</div>}
              {data.personalInfo.address && <div>📍 {data.personalInfo.address}</div>}
              {data.personalInfo.linkedin && <div>💼 <a href={data.personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></div>}
              {data.personalInfo.github && <div>💻 <a href={data.personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a></div>}
              {data.personalInfo.website && <div>🌐 <a href={data.personalInfo.website} target="_blank" rel="noopener noreferrer">Website</a></div>}
              {data.personalInfo.instagram && <div>📷 <a href={data.personalInfo.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></div>}
              {data.personalInfo.facebook && <div>👤 <a href={data.personalInfo.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></div>}
              {data.personalInfo.telegram && <div>✈️ <a href={data.personalInfo.telegram} target="_blank" rel="noopener noreferrer">Telegram</a></div>}
            </div>
          </section>

          {data.skills.length > 0 && (
            <section className="sidebar-section-6">
              <h2 className="sidebar-title-6">Skills</h2>
              <div className="skills-tags-6">
                {data.skills.filter(s => s.trim()).map((skill, index) => (
                  <span key={index} className="skill-tag-6">{skill}</span>
                ))}
              </div>
            </section>
          )}

          {data.languages && data.languages.length > 0 && (
            <section className="sidebar-section-6">
              <h2 className="sidebar-title-6">Languages</h2>
              {data.languages.map((lang, index) => (
                <div key={index} className="language-item-6">
                  <span className="lang-name-6">{lang.name}</span>
                  <span className="lang-level-6">{lang.proficiency}</span>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>

      <div className="resume-main-6">
        {data.experience.length > 0 && (
          <section className="main-section-6">
            <h2 className="main-title-6">Experience</h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="exp-item-6">
                <div className="exp-header-6">
                  <h3>{exp.position}</h3>
                  <span className="exp-date-6">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="exp-company-6">{exp.company}</div>
                {exp.description && <p className="exp-desc-6">{exp.description}</p>}
              </div>
            ))}
          </section>
        )}

        {data.education.length > 0 && (
          <section className="main-section-6">
            <h2 className="main-title-6">Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="edu-item-6">
                <h3>{edu.degree}</h3>
                <div className="edu-meta-6">
                  {edu.institution} {edu.field && `• ${edu.field}`}
                </div>
                <div className="edu-date-6">
                  {edu.startDate} - {edu.endDate} {edu.gpa && `• GPA: ${edu.gpa}`}
                </div>
              </div>
            ))}
          </section>
        )}

        {data.projects.length > 0 && (
          <section className="main-section-6">
            <h2 className="main-title-6">Projects</h2>
            {data.projects.map((proj, index) => (
              <div key={index} className="proj-item-6">
                <h3>{proj.name}</h3>
                {proj.technologies && <div className="proj-tech-6">{proj.technologies}</div>}
                {proj.description && <p className="proj-desc-6">{proj.description}</p>}
                {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="proj-link-6">View Project →</a>}
              </div>
            ))}
          </section>
        )}

        {data.certifications && data.certifications.length > 0 && (
          <section className="main-section-6">
            <h2 className="main-title-6">Certifications</h2>
            {data.certifications.map((cert, index) => (
              <div key={index} className="cert-item-6">
                <h3>{cert.name}</h3>
                <div className="cert-meta-6">
                  {cert.organization} {cert.date && `• ${cert.date}`}
                </div>
                {cert.credentialId && <div className="cert-id-6">ID: {cert.credentialId}</div>}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}

export default Template6

