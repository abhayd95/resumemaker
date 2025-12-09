import '../../styles/templates.css'

const Template3 = ({ data }) => {
  return (
    <div className="resume-template template-3">
      <div className="resume-header-3">
        <div className="header-content-3">
          <h1 className="name-3">{data.personalInfo.fullName}</h1>
          <div className="contact-bar-3">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>|</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo.linkedin && <span>|</span>}
            {data.personalInfo.linkedin && <span><a href={data.personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></span>}
            {data.personalInfo.github && <span>|</span>}
            {data.personalInfo.github && <span><a href={data.personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a></span>}
            {data.personalInfo.website && <span>|</span>}
            {data.personalInfo.website && <span><a href={data.personalInfo.website} target="_blank" rel="noopener noreferrer">Website</a></span>}
            {data.personalInfo.instagram && <span>|</span>}
            {data.personalInfo.instagram && <span><a href={data.personalInfo.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></span>}
            {data.personalInfo.facebook && <span>|</span>}
            {data.personalInfo.facebook && <span><a href={data.personalInfo.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></span>}
            {data.personalInfo.telegram && <span>|</span>}
            {data.personalInfo.telegram && <span><a href={data.personalInfo.telegram} target="_blank" rel="noopener noreferrer">Telegram</a></span>}
          </div>
        </div>
      </div>

      <div className="resume-body-3">
        {data.summary && (
          <section className="resume-section-3">
            <h2 className="section-title-3">About</h2>
            <p className="section-content-3">{data.summary}</p>
          </section>
        )}

        <div className="two-column-3">
          <div className="column-left-3">
            {data.experience.length > 0 && (
              <section className="resume-section-3">
                <h2 className="section-title-3">Experience</h2>
                {data.experience.map((exp, index) => (
                  <div key={index} className="item-3">
                    <h3 className="item-title-3">{exp.position}</h3>
                    <div className="item-meta-3">
                      <span className="item-company-3">{exp.company}</span>
                      <span className="item-date-3">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    {exp.description && <p className="item-description-3">{exp.description}</p>}
                  </div>
                ))}
              </section>
            )}

            {data.projects.length > 0 && (
              <section className="resume-section-3">
                <h2 className="section-title-3">Projects</h2>
                {data.projects.map((proj, index) => (
                  <div key={index} className="item-3">
                    <h3 className="item-title-3">{proj.name}</h3>
                    {proj.technologies && <div className="item-meta-3">{proj.technologies}</div>}
                    {proj.description && <p className="item-description-3">{proj.description}</p>}
                    {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="link-3">View →</a>}
                  </div>
                ))}
              </section>
            )}
          </div>

          <div className="column-right-3">
            {data.education.length > 0 && (
              <section className="resume-section-3">
                <h2 className="section-title-3">Education</h2>
                {data.education.map((edu, index) => (
                  <div key={index} className="item-3">
                    <h3 className="item-title-3">{edu.degree}</h3>
                    <div className="item-meta-3">{edu.institution}</div>
                    {edu.field && <div className="item-meta-3">{edu.field}</div>}
                    <div className="item-date-3">
                      {edu.startDate} - {edu.endDate}
                      {edu.gpa && ` | GPA: ${edu.gpa}`}
                    </div>
                  </div>
                ))}
              </section>
            )}

            {data.skills.length > 0 && (
              <section className="resume-section-3">
                <h2 className="section-title-3">Skills</h2>
                <div className="skills-list-3">
                  {data.skills.filter(s => s.trim()).map((skill, index) => (
                    <div key={index} className="skill-item-3">{skill}</div>
                  ))}
                </div>
              </section>
            )}

            {data.languages && data.languages.length > 0 && (
              <section className="resume-section-3">
                <h2 className="section-title-3">Languages</h2>
                <div className="skills-list-3">
                  {data.languages.map((lang, index) => (
                    <div key={index} className="skill-item-3">{lang.name} ({lang.proficiency})</div>
                  ))}
                </div>
              </section>
            )}

            {data.certifications && data.certifications.length > 0 && (
              <section className="resume-section-3">
                <h2 className="section-title-3">Certifications</h2>
                {data.certifications.map((cert, index) => (
                  <div key={index} className="item-3">
                    <h3 className="item-title-3">{cert.name}</h3>
                    {cert.organization && <div className="item-meta-3">{cert.organization}</div>}
                    {cert.date && <div className="item-date-3">{cert.date}</div>}
                    {cert.credentialId && <div className="item-description-3">ID: {cert.credentialId}</div>}
                  </div>
                ))}
              </section>
            )}

            {data.references && data.references.length > 0 && (
              <section className="resume-section-3">
                <h2 className="section-title-3">References</h2>
                {data.references.map((ref, index) => (
                  <div key={index} className="item-3">
                    <h3 className="item-title-3">{ref.name}</h3>
                    {ref.position && <div className="item-meta-3">{ref.position}</div>}
                    {ref.company && <div className="item-meta-3">{ref.company}</div>}
                    <div className="item-description-3">
                      {ref.email && <span>📧 {ref.email}</span>}
                      {ref.phone && <span> 📱 {ref.phone}</span>}
                    </div>
                    {ref.relationship && <div className="item-description-3">{ref.relationship}</div>}
                  </div>
                ))}
              </section>
            )}

            {data.awards && data.awards.length > 0 && (
              <section className="resume-section-3">
                <h2 className="section-title-3">Awards & Achievements</h2>
                {data.awards.map((award, index) => (
                  <div key={index} className="item-3">
                    <h3 className="item-title-3">{award.title}</h3>
                    {award.organization && <div className="item-meta-3">{award.organization}</div>}
                    {award.date && <div className="item-date-3">{award.date}</div>}
                    {award.description && <div className="item-description-3">{award.description}</div>}
                  </div>
                ))}
              </section>
            )}

            {data.volunteer && data.volunteer.length > 0 && (
              <section className="resume-section-3">
                <h2 className="section-title-3">Volunteer Work</h2>
                {data.volunteer.map((vol, index) => (
                  <div key={index} className="item-3">
                    <h3 className="item-title-3">{vol.position || 'Volunteer'}</h3>
                    {vol.organization && <div className="item-meta-3">{vol.organization}</div>}
                    <div className="item-date-3">
                      {vol.startDate} - {vol.current ? 'Present' : vol.endDate}
                    </div>
                    {vol.description && <div className="item-description-3">{vol.description}</div>}
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Template3

