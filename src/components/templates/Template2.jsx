import '../../styles/templates.css'

const Template2 = ({ data }) => {
  return (
    <div className="resume-template template-2">
      <div className="resume-header-2">
        <div className="header-left">
          <h1 className="name">{data.personalInfo.fullName}</h1>
        </div>
        <div className="header-right">
          <div className="contact-details">
            {data.personalInfo.email && <div>Email: {data.personalInfo.email}</div>}
            {data.personalInfo.phone && <div>Phone: {data.personalInfo.phone}</div>}
            {data.personalInfo.address && <div>Address: {data.personalInfo.address}</div>}
            {data.personalInfo.linkedin && <div>LinkedIn: <a href={data.personalInfo.linkedin} target="_blank" rel="noopener noreferrer">Profile</a></div>}
            {data.personalInfo.github && <div>GitHub: <a href={data.personalInfo.github} target="_blank" rel="noopener noreferrer">Profile</a></div>}
            {data.personalInfo.website && <div>Website: <a href={data.personalInfo.website} target="_blank" rel="noopener noreferrer">Visit</a></div>}
            {data.personalInfo.instagram && <div>Instagram: <a href={data.personalInfo.instagram} target="_blank" rel="noopener noreferrer">Profile</a></div>}
            {data.personalInfo.facebook && <div>Facebook: <a href={data.personalInfo.facebook} target="_blank" rel="noopener noreferrer">Profile</a></div>}
            {data.personalInfo.telegram && <div>Telegram: <a href={data.personalInfo.telegram} target="_blank" rel="noopener noreferrer">Contact</a></div>}
          </div>
        </div>
      </div>

      {data.summary && (
        <section className="resume-section-2">
          <h2 className="section-title-2">Summary</h2>
          <div className="section-divider"></div>
          <p>{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="resume-section-2">
          <h2 className="section-title-2">Experience</h2>
          <div className="section-divider"></div>
          {data.experience.map((exp, index) => (
            <div key={index} className="item-block">
              <div className="item-title-row">
                <h3>{exp.position}</h3>
                <span className="date-range">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div className="item-subtitle">{exp.company}</div>
              {exp.description && <p className="item-text">{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {data.education.length > 0 && (
        <section className="resume-section-2">
          <h2 className="section-title-2">Education</h2>
          <div className="section-divider"></div>
          {data.education.map((edu, index) => (
            <div key={index} className="item-block">
              <div className="item-title-row">
                <h3>{edu.degree}</h3>
                <span className="date-range">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <div className="item-subtitle">{edu.institution}</div>
              {edu.field && <div className="item-text">Field: {edu.field}</div>}
              {edu.gpa && <div className="item-text">GPA: {edu.gpa}</div>}
            </div>
          ))}
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="resume-section-2">
          <h2 className="section-title-2">Skills</h2>
          <div className="section-divider"></div>
          <div className="skills-grid-2">
            {data.skills.filter(s => s.trim()).map((skill, index) => (
              <div key={index} className="skill-item-2">• {skill}</div>
            ))}
          </div>
        </section>
      )}

      {data.projects.length > 0 && (
        <section className="resume-section-2">
          <h2 className="section-title-2">Projects</h2>
          <div className="section-divider"></div>
          {data.projects.map((proj, index) => (
            <div key={index} className="item-block">
              <h3>{proj.name}</h3>
              {proj.technologies && <div className="item-text">Technologies: {proj.technologies}</div>}
              {proj.description && <p className="item-text">{proj.description}</p>}
              {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="project-link-2">View Project →</a>}
            </div>
          ))}
        </section>
      )}

      {data.languages && data.languages.length > 0 && (
        <section className="resume-section-2">
          <h2 className="section-title-2">Languages</h2>
          <div className="section-divider"></div>
          <div className="skills-grid-2">
            {data.languages.map((lang, index) => (
              <div key={index} className="skill-item-2">• {lang.name} ({lang.proficiency})</div>
            ))}
          </div>
        </section>
      )}

      {data.certifications && data.certifications.length > 0 && (
        <section className="resume-section-2">
          <h2 className="section-title-2">Certifications</h2>
          <div className="section-divider"></div>
          {data.certifications.map((cert, index) => (
            <div key={index} className="item-block">
              <div className="item-title-row">
                <h3>{cert.name}</h3>
                {cert.date && <span className="date-range">{cert.date}</span>}
              </div>
              {cert.organization && <div className="item-subtitle">{cert.organization}</div>}
              {cert.credentialId && <div className="item-text">Credential ID: {cert.credentialId}</div>}
            </div>
          ))}
        </section>
      )}
    </div>
  )
}

export default Template2

