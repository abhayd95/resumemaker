import '../../styles/templates.css'

const Template1 = ({ data }) => {
  return (
    <div className="resume-template template-1">
      <div className="resume-header">
        <h1 className="name">{data.personalInfo.fullName}</h1>
        <div className="contact-info">
          {data.personalInfo.email && <span>📧 {data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>📱 {data.personalInfo.phone}</span>}
          {data.personalInfo.address && <span>📍 {data.personalInfo.address}</span>}
          {data.personalInfo.linkedin && <span>💼 <a href={data.personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></span>}
          {data.personalInfo.github && <span>💻 <a href={data.personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a></span>}
          {data.personalInfo.website && <span>🌐 <a href={data.personalInfo.website} target="_blank" rel="noopener noreferrer">Website</a></span>}
          {data.personalInfo.instagram && <span>📷 <a href={data.personalInfo.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></span>}
          {data.personalInfo.facebook && <span>👤 <a href={data.personalInfo.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></span>}
          {data.personalInfo.telegram && <span>✈️ <a href={data.personalInfo.telegram} target="_blank" rel="noopener noreferrer">Telegram</a></span>}
        </div>
      </div>

      {data.summary && (
        <section className="resume-section">
          <h2 className="section-title">Professional Summary</h2>
          <p className="section-content">{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section className="resume-section">
          <h2 className="section-title">Work Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="item-header">
                <h3>{exp.position}</h3>
                <span className="company">{exp.company}</span>
                <span className="date">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              {exp.description && <p className="item-description">{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {data.education.length > 0 && (
        <section className="resume-section">
          <h2 className="section-title">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="education-item">
              <div className="item-header">
                <h3>{edu.degree}</h3>
                <span className="institution">{edu.institution}</span>
                {edu.field && <span className="field">{edu.field}</span>}
                <span className="date">
                  {edu.startDate} - {edu.endDate}
                </span>
                {edu.gpa && <span className="gpa">GPA: {edu.gpa}</span>}
              </div>
            </div>
          ))}
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="resume-section">
          <h2 className="section-title">Skills</h2>
          <div className="skills-list">
            {data.skills.filter(s => s.trim()).map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </section>
      )}

      {data.projects.length > 0 && (
        <section className="resume-section">
          <h2 className="section-title">Projects</h2>
          {data.projects.map((proj, index) => (
            <div key={index} className="project-item">
              <div className="item-header">
                <h3>{proj.name}</h3>
                {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="project-link">🔗 View Project</a>}
              </div>
              {proj.technologies && <p className="technologies">Tech: {proj.technologies}</p>}
              {proj.description && <p className="item-description">{proj.description}</p>}
            </div>
          ))}
        </section>
      )}

      {data.languages && data.languages.length > 0 && (
        <section className="resume-section">
          <h2 className="section-title">Languages</h2>
          <div className="languages-list">
            {data.languages.map((lang, index) => (
              <div key={index} className="language-item">
                <span className="language-name">{lang.name}</span>
                <span className="language-proficiency">({lang.proficiency})</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.certifications && data.certifications.length > 0 && (
        <section className="resume-section">
          <h2 className="section-title">Certifications</h2>
          {data.certifications.map((cert, index) => (
            <div key={index} className="certification-item">
              <div className="item-header">
                <h3>{cert.name}</h3>
                {cert.organization && <span className="organization">{cert.organization}</span>}
                {cert.date && <span className="date">{cert.date}</span>}
              </div>
              {cert.credentialId && <p className="credential-id">ID: {cert.credentialId}</p>}
            </div>
          ))}
        </section>
      )}
    </div>
  )
}

export default Template1

