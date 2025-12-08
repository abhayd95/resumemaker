import '../../styles/templates.css'

const Template7 = ({ data, colorTheme = 'blue' }) => {
  const themes = {
    blue: { primary: '#1e40af', secondary: '#1e3a8a' },
    green: { primary: '#15803d', secondary: '#166534' },
    purple: { primary: '#6b21a8', secondary: '#581c87' },
    red: { primary: '#b91c1c', secondary: '#991b1b' },
    orange: { primary: '#c2410c', secondary: '#9a3412' }
  }
  
  const theme = themes[colorTheme] || themes.blue

  return (
    <div className="resume-template template-7" style={{ '--theme-color': theme.primary, '--theme-dark': theme.secondary }}>
      <div className="resume-top-7">
        <div className="top-left-7">
          {data.personalInfo.photo && (
            <img src={data.personalInfo.photo} alt={data.personalInfo.fullName} className="photo-7" />
          )}
        </div>
        <div className="top-right-7">
          <h1 className="name-7">{data.personalInfo.fullName}</h1>
          <div className="contact-row-7">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>•</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo.address && <span>•</span>}
            {data.personalInfo.address && <span>{data.personalInfo.address}</span>}
          </div>
          <div className="social-row-7">
            {data.personalInfo.linkedin && <a href={data.personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
            {data.personalInfo.github && <a href={data.personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
            {data.personalInfo.website && <a href={data.personalInfo.website} target="_blank" rel="noopener noreferrer">Website</a>}
            {data.personalInfo.instagram && <a href={data.personalInfo.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
            {data.personalInfo.facebook && <a href={data.personalInfo.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>}
            {data.personalInfo.telegram && <a href={data.personalInfo.telegram} target="_blank" rel="noopener noreferrer">Telegram</a>}
          </div>
        </div>
      </div>

      {data.summary && (
        <section className="section-7">
          <h2 className="section-title-7">Professional Summary</h2>
          <p className="section-content-7">{data.summary}</p>
        </section>
      )}

      <div className="content-grid-7">
        <div className="left-column-7">
          {data.experience.length > 0 && (
            <section className="section-7">
              <h2 className="section-title-7">Work Experience</h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="item-7">
                  <div className="item-header-7">
                    <h3>{exp.position}</h3>
                    <span className="item-date-7">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="item-company-7">{exp.company}</div>
                  {exp.description && <p className="item-desc-7">{exp.description}</p>}
                </div>
              ))}
            </section>
          )}

          {data.projects.length > 0 && (
            <section className="section-7">
              <h2 className="section-title-7">Projects</h2>
              {data.projects.map((proj, index) => (
                <div key={index} className="item-7">
                  <h3>{proj.name}</h3>
                  {proj.technologies && <div className="item-tech-7">{proj.technologies}</div>}
                  {proj.description && <p className="item-desc-7">{proj.description}</p>}
                  {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="item-link-7">View →</a>}
                </div>
              ))}
            </section>
          )}
        </div>

        <div className="right-column-7">
          {data.education.length > 0 && (
            <section className="section-7">
              <h2 className="section-title-7">Education</h2>
              {data.education.map((edu, index) => (
                <div key={index} className="item-7">
                  <h3>{edu.degree}</h3>
                  <div className="item-meta-7">{edu.institution}</div>
                  {edu.field && <div className="item-meta-7">{edu.field}</div>}
                  <div className="item-date-7">
                    {edu.startDate} - {edu.endDate}
                    {edu.gpa && ` | ${edu.gpa}`}
                  </div>
                </div>
              ))}
            </section>
          )}

          {data.skills.length > 0 && (
            <section className="section-7">
              <h2 className="section-title-7">Skills</h2>
              <div className="skills-grid-7">
                {data.skills.filter(s => s.trim()).map((skill, index) => (
                  <div key={index} className="skill-box-7">{skill}</div>
                ))}
              </div>
            </section>
          )}

          {data.languages && data.languages.length > 0 && (
            <section className="section-7">
              <h2 className="section-title-7">Languages</h2>
              {data.languages.map((lang, index) => (
                <div key={index} className="lang-item-7">
                  <span>{lang.name}</span>
                  <span className="lang-proficiency-7">{lang.proficiency}</span>
                </div>
              ))}
            </section>
          )}

          {data.certifications && data.certifications.length > 0 && (
            <section className="section-7">
              <h2 className="section-title-7">Certifications</h2>
              {data.certifications.map((cert, index) => (
                <div key={index} className="cert-item-7">
                  <h3>{cert.name}</h3>
                  {cert.organization && <div className="item-meta-7">{cert.organization}</div>}
                  {cert.date && <div className="item-date-7">{cert.date}</div>}
                  {cert.credentialId && <div className="cert-id-7">{cert.credentialId}</div>}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default Template7

