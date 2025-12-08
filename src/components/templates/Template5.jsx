import '../../styles/templates.css'

const Template5 = ({ data, colorTheme = 'blue' }) => {
  const themes = {
    blue: { primary: '#3b82f6', secondary: '#1e40af' },
    green: { primary: '#10b981', secondary: '#047857' },
    purple: { primary: '#8b5cf6', secondary: '#6d28d9' },
    red: { primary: '#ef4444', secondary: '#b91c1c' },
    orange: { primary: '#f97316', secondary: '#c2410c' }
  }
  
  const theme = themes[colorTheme] || themes.blue

  return (
    <div className="resume-template template-5" style={{ '--theme-color': theme.primary, '--theme-dark': theme.secondary }}>
      <div className="resume-header-5">
        <div className="header-content-5">
          {data.personalInfo.photo && (
            <div className="photo-wrapper-5">
              <img src={data.personalInfo.photo} alt={data.personalInfo.fullName} className="profile-photo-5" />
            </div>
          )}
          <h1 className="name-5">{data.personalInfo.fullName}</h1>
          <div className="contact-bar-5">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>|</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo.address && <span>|</span>}
            {data.personalInfo.address && <span>{data.personalInfo.address}</span>}
          </div>
          <div className="social-links-5">
            {data.personalInfo.linkedin && <a href={data.personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
            {data.personalInfo.github && <a href={data.personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
            {data.personalInfo.website && <a href={data.personalInfo.website} target="_blank" rel="noopener noreferrer">Website</a>}
            {data.personalInfo.instagram && <a href={data.personalInfo.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
            {data.personalInfo.facebook && <a href={data.personalInfo.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>}
            {data.personalInfo.telegram && <a href={data.personalInfo.telegram} target="_blank" rel="noopener noreferrer">Telegram</a>}
          </div>
        </div>
      </div>

      <div className="resume-body-5">
        {data.summary && (
          <section className="resume-section-5">
            <h2 className="section-title-5">About</h2>
            <p className="section-content-5">{data.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="resume-section-5">
            <h2 className="section-title-5">Work Experience</h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="experience-item-5">
                <div className="exp-header-5">
                  <h3>{exp.position}</h3>
                  <span className="exp-date-5">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="exp-company-5">{exp.company}</div>
                {exp.description && <p className="exp-description-5">{exp.description}</p>}
              </div>
            ))}
          </section>
        )}

        {data.education.length > 0 && (
          <section className="resume-section-5">
            <h2 className="section-title-5">Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="education-item-5">
                <h3>{edu.degree}</h3>
                <div className="edu-meta-5">
                  {edu.institution} {edu.field && `• ${edu.field}`}
                </div>
                <div className="edu-date-5">
                  {edu.startDate} - {edu.endDate} {edu.gpa && `• GPA: ${edu.gpa}`}
                </div>
              </div>
            ))}
          </section>
        )}

        {data.skills.length > 0 && (
          <section className="resume-section-5">
            <h2 className="section-title-5">Skills</h2>
            <div className="skills-grid-5">
              {data.skills.filter(s => s.trim()).map((skill, index) => (
                <div key={index} className="skill-badge-5">{skill}</div>
              ))}
            </div>
          </section>
        )}

        {data.projects.length > 0 && (
          <section className="resume-section-5">
            <h2 className="section-title-5">Projects</h2>
            {data.projects.map((proj, index) => (
              <div key={index} className="project-item-5">
                <h3>{proj.name}</h3>
                {proj.technologies && <div className="proj-tech-5">{proj.technologies}</div>}
                {proj.description && <p className="proj-description-5">{proj.description}</p>}
                {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="proj-link-5">View Project →</a>}
              </div>
            ))}
          </section>
        )}

        {data.languages && data.languages.length > 0 && (
          <section className="resume-section-5">
            <h2 className="section-title-5">Languages</h2>
            <div className="skills-grid-5">
              {data.languages.map((lang, index) => (
                <div key={index} className="skill-badge-5">{lang.name} ({lang.proficiency})</div>
              ))}
            </div>
          </section>
        )}

        {data.certifications && data.certifications.length > 0 && (
          <section className="resume-section-5">
            <h2 className="section-title-5">Certifications</h2>
            {data.certifications.map((cert, index) => (
              <div key={index} className="education-item-5">
                <h3>{cert.name}</h3>
                <div className="edu-meta-5">
                  {cert.organization} {cert.date && `• ${cert.date}`}
                </div>
                {cert.credentialId && <div className="edu-date-5">Credential ID: {cert.credentialId}</div>}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}

export default Template5

