import { useState } from 'react'

const ResumeTipsPanel = ({ currentSection, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('general')

  const tips = {
    general: [
      {
        title: 'Keep it Concise',
        description: 'Aim for 1-2 pages. Recruiters spend only 6-7 seconds on initial review.',
        icon: '📏'
      },
      {
        title: 'Use Action Verbs',
        description: 'Start bullet points with strong action verbs like "Developed", "Led", "Implemented".',
        icon: '💪'
      },
      {
        title: 'Quantify Achievements',
        description: 'Use numbers and metrics. "Increased sales by 30%" is better than "Increased sales".',
        icon: '📊'
      },
      {
        title: 'Tailor for Each Job',
        description: 'Customize your resume for each position. Highlight relevant skills and experiences.',
        icon: '🎯'
      },
      {
        title: 'Proofread Carefully',
        description: 'Typos and grammar errors can eliminate you. Use spell check and have someone review it.',
        icon: '✅'
      }
    ],
    personalInfo: [
      {
        title: 'Professional Email',
        description: 'Use a professional email address. Avoid nicknames or unprofessional handles.',
        icon: '📧'
      },
      {
        title: 'LinkedIn Profile',
        description: 'Include your LinkedIn URL. Make sure your profile is complete and matches your resume.',
        icon: '💼'
      },
      {
        title: 'Phone Number',
        description: 'Use a professional voicemail message. Answer professionally when job hunting.',
        icon: '📱'
      },
      {
        title: 'Location',
        description: 'City and state are usually sufficient. Full address is not necessary.',
        icon: '📍'
      }
    ],
    summary: [
      {
        title: 'Keep it Brief',
        description: '2-3 sentences maximum. Summarize your key qualifications and career goals.',
        icon: '✍️'
      },
      {
        title: 'Be Specific',
        description: 'Mention years of experience, key skills, and what you bring to the role.',
        icon: '🎯'
      },
      {
        title: 'Match Job Description',
        description: 'Use keywords from the job posting to show you\'re a good fit.',
        icon: '🔍'
      }
    ],
    experience: [
      {
        title: 'Reverse Chronological',
        description: 'List most recent job first. Include company, title, dates, and location.',
        icon: '📅'
      },
      {
        title: 'Use Bullet Points',
        description: '3-5 bullet points per position. Focus on achievements, not just duties.',
        icon: '•'
      },
      {
        title: 'Show Impact',
        description: 'Describe what you accomplished, not just what you did. Use numbers when possible.',
        icon: '📈'
      },
      {
        title: 'Relevant Experience',
        description: 'Focus on experiences relevant to the job you\'re applying for.',
        icon: '🎯'
      }
    ],
    education: [
      {
        title: 'Include GPA if High',
        description: 'Only include GPA if it\'s 3.5 or higher. Otherwise, omit it.',
        icon: '🎓'
      },
      {
        title: 'Relevant Coursework',
        description: 'For recent graduates, include relevant coursework or projects.',
        icon: '📚'
      },
      {
        title: 'Degree First',
        description: 'List degree, then institution, then graduation date.',
        icon: '🏆'
      }
    ],
    skills: [
      {
        title: 'Technical Skills',
        description: 'List specific technologies, software, and tools you\'re proficient with.',
        icon: '💻'
      },
      {
        title: 'Soft Skills',
        description: 'Include communication, leadership, problem-solving, etc.',
        icon: '🤝'
      },
      {
        title: 'Match Job Requirements',
        description: 'Prioritize skills mentioned in the job description.',
        icon: '✅'
      }
    ],
    projects: [
      {
        title: 'Showcase Impact',
        description: 'Describe what problem you solved and the results achieved.',
        icon: '🚀'
      },
      {
        title: 'Include Links',
        description: 'Add GitHub, live demo, or portfolio links when available.',
        icon: '🔗'
      },
      {
        title: 'Technologies Used',
        description: 'List the technologies, frameworks, and tools used in each project.',
        icon: '🛠️'
      }
    ]
  }

  const categories = [
    { id: 'general', name: 'General Tips', icon: '💡' },
    { id: 'personalInfo', name: 'Personal Info', icon: '👤' },
    { id: 'summary', name: 'Summary', icon: '📝' },
    { id: 'experience', name: 'Experience', icon: '💼' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'skills', name: 'Skills', icon: '🛠️' },
    { id: 'projects', name: 'Projects', icon: '🚀' }
  ]

  const currentTips = tips[selectedCategory] || tips.general

  return (
    <div className="resume-tips-panel">
      <div className="tips-content">
        <div className="tips-header">
          <h2>💡 Resume Tips & Guides</h2>
          <button onClick={onClose} className="btn-close">✕</button>
        </div>
        
        <div className="tips-categories">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        <div className="tips-list">
          {currentTips.map((tip, index) => (
            <div key={index} className="tip-item">
              <div className="tip-icon">{tip.icon}</div>
              <div className="tip-content">
                <h3>{tip.title}</h3>
                <p>{tip.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="tips-footer">
          <p>💬 Need more help? Check out our resume examples library!</p>
        </div>
      </div>
    </div>
  )
}

export default ResumeTipsPanel

