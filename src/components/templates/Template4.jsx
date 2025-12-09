import '../../styles/templates.css'

const Template4 = ({ data, colorTheme = 'blue' }) => {
  const themes = {
    blue: { primary: '#2563eb', secondary: '#1e40af' },
    green: { primary: '#059669', secondary: '#047857' },
    purple: { primary: '#7c3aed', secondary: '#6d28d9' },
    red: { primary: '#dc2626', secondary: '#b91c1c' },
    orange: { primary: '#ea580c', secondary: '#c2410c' }
  }
  
  const theme = themes[colorTheme] || themes.blue

  return (
    <div className="resume-template template-4" style={{ '--theme-color': theme.primary, '--theme-dark': theme.secondary }}>
      <div className="resume-header-4">
        <div className="header-left-4">
          {data.personalInfo.photo && (
            <div className="photo-container-4">
              <img src={data.personalInfo.photo} alt={data.personalInfo.fullName} className="profile-photo-4" />
            </div>
          )}
          <div className="header-text-4">
            <h1 className="name-4">{data.personalInfo.fullName}</h1>
            <div className="contact-info-4">
              {data.personalInfo.email && <span>📧 {data.personalInfo.email}</span>}
              {data.personalInfo.phone && <span>📱 {data.personalInfo.phone}</span>}
              {data.personalInfo.address && <span>📍 {data.personalInfo.address}</span>}
            </div>
          </div>
        </div>
        <div className="header-right-4">
          {data.personalInfo.linkedin && <a href={data.personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
          {data.personalInfo.github && <a href={data.personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
          {data.personalInfo.website && <a href={data.personalInfo.website} target="_blank" rel="noopener noreferrer">Website</a>}
          {data.personalInfo.instagram && <a href={data.personalInfo.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
          {data.personalInfo.facebook && <a href={data.personalInfo.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>}
          {data.personalInfo.telegram && <a href={data.personalInfo.telegram} target="_blank" rel="noopener noreferrer">Telegram</a>}
        </div>
      </div>

      {data.summary && (
        <section className="resume-section-4">
          <h2 className="section-title-4">Summary</h2>
          <p className="section-content-4">{data.summary}</p>
        </section>
      )}

      <div className="two-column-4">
        <div className="column-left-4">
          {data.experience.length > 0 && (
            <section className="resume-section-4">
              <h2 className="section-title-4">Experience</h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="item-4">
                  <h3 className="item-title-4">{exp.position}</h3>
                  <div className="item-meta-4">
                    <span className="item-company-4">{exp.company}</span>
                    <span className="item-date-4">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p className="item-description-4">{exp.description}</p>}
                </div>
              ))}
            </section>
          )}

          {data.projects.length > 0 && (
            <section className="resume-section-4">
              <h2 className="section-title-4">Projects</h2>
              {data.projects.map((proj, index) => (
                <div key={index} className="item-4">
                  <h3 className="item-title-4">{proj.name}</h3>
                  {proj.technologies && <div className="item-meta-4">{proj.technologies}</div>}
                  {proj.description && <p className="item-description-4">{proj.description}</p>}
                  {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="link-4">View →</a>}
                </div>
              ))}
            </section>
          )}
        </div>

        <div className="column-right-4">
          {data.education.length > 0 && (
            <section className="resume-section-4">
              <h2 className="section-title-4">Education</h2>
              {data.education.map((edu, index) => (
                <div key={index} className="item-4">
                  <h3 className="item-title-4">{edu.degree}</h3>
                  <div className="item-meta-4">{edu.institution}</div>
                  {edu.field && <div className="item-meta-4">{edu.field}</div>}
                  <div className="item-date-4">
                    {edu.startDate} - {edu.endDate}
                    {edu.gpa && ` | GPA: ${edu.gpa}`}
                  </div>
                </div>
              ))}
            </section>
          )}

          {data.skills.length > 0 && (
            <section className="resume-section-4">
              <h2 className="section-title-4">Skills</h2>
              <div className="skills-list-4">
                {data.skills.filter(s => s.trim()).map((skill, index) => (
                  <div key={index} className="skill-item-4">{skill}</div>
                ))}
              </div>
            </section>
          )}

          {data.languages && data.languages.length > 0 && (
            <section className="resume-section-4">
              <h2 className="section-title-4">Languages</h2>
              <div className="skills-list-4">
                {data.languages.map((lang, index) => (
                  <div key={index} className="skill-item-4">{lang.name} ({lang.proficiency})</div>
                ))}
              </div>
            </section>
          )}

          {data.certifications && data.certifications.length > 0 && (
            <section className="resume-section-4">
              <h2 className="section-title-4">Certifications</h2>
              {data.certifications.map((cert, index) => (
                <div key={index} className="item-4">
                  <h3 className="item-title-4">{cert.name}</h3>
                  {cert.organization && <div className="item-meta-4">{cert.organization}</div>}
                  {cert.date && <div className="item-date-4">{cert.date}</div>}
                  {cert.credentialId && <div className="item-description-4">ID: {cert.credentialId}</div>}
                </div>
              ))}
            </section>
          )}

          {data.references && data.references.length > 0 && (
            <section className="resume-section-4">
              <h2 className="section-title-4">References</h2>
              {data.references.map((ref, index) => (
                <div key={index} className="item-4">
                  <h3 className="item-title-4">{ref.name}</h3>
                  {ref.position && <div className="item-meta-4">{ref.position}</div>}
                  {ref.company && <div className="item-meta-4">{ref.company}</div>}
                  <div className="item-description-4">
                    {ref.email && <span>📧 {ref.email}</span>}
                    {ref.phone && <span> 📱 {ref.phone}</span>}
                  </div>
                  {ref.relationship && <div className="item-description-4">{ref.relationship}</div>}
                </div>
              ))}
            </section>
          )}

          {data.awards && data.awards.length > 0 && (
            <section className="resume-section-4">
              <h2 className="section-title-4">Awards & Achievements</h2>
              {data.awards.map((award, index) => (
                <div key={index} className="item-4">
                  <h3 className="item-title-4">{award.title}</h3>
                  {award.organization && <div className="item-meta-4">{award.organization}</div>}
                  {award.date && <div className="item-date-4">{award.date}</div>}
                  {award.description && <div className="item-description-4">{award.description}</div>}
                </div>
              ))}
            </section>
          )}

          {data.volunteer && data.volunteer.length > 0 && (
            <section className="resume-section-4">
              <h2 className="section-title-4">Volunteer Work</h2>
              {data.volunteer.map((vol, index) => (
                <div key={index} className="item-4">
                  <h3 className="item-title-4">{vol.position || 'Volunteer'}</h3>
                  {vol.organization && <div className="item-meta-4">{vol.organization}</div>}
                  <div className="item-date-4">
                    {vol.startDate} - {vol.current ? 'Present' : vol.endDate}
                  </div>
                  {vol.description && <div className="item-description-4">{vol.description}</div>}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default Template4

