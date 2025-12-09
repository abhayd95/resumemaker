import { useState, useMemo } from 'react'
import Template1 from './templates/Template1'
import Template2 from './templates/Template2'
import Template3 from './templates/Template3'
import Template4 from './templates/Template4'
import Template5 from './templates/Template5'
import Template6 from './templates/Template6'
import Template7 from './templates/Template7'
import { generateDemoResumes, searchDemos, filterDemosByTemplate } from '../utils/demoResumeGenerator'
import { generatePDF } from '../utils/pdfGenerator'

const DemoResumeModal = ({ isOpen, onClose, onUseDemo }) => {
  const [selectedDemo, setSelectedDemo] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterTemplate, setFilterTemplate] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const demosPerPage = 12

  // Original 4 demo resumes
  const originalDemos = [
    {
      id: 1,
      name: 'Software Engineer',
      template: 1,
      data: {
        personalInfo: {
          fullName: 'John Smith',
          email: 'john.smith@email.com',
          phone: '+1 (555) 123-4567',
          address: 'San Francisco, CA',
          linkedin: 'https://linkedin.com/in/johnsmith',
          github: 'https://github.com/johnsmith',
          website: 'https://johnsmith.dev',
          instagram: '',
          facebook: '',
          telegram: '',
          photo: 'https://via.placeholder.com/150'
        },
        summary: 'Experienced software engineer with 5+ years of expertise in full-stack development. Specialized in React, Node.js, and cloud technologies. Passionate about building scalable applications and leading development teams.',
        experience: [
          {
            company: 'Tech Corp',
            position: 'Senior Software Engineer',
            startDate: '2020-01',
            endDate: '2024-12',
            current: true,
            description: 'Led development of microservices architecture serving 1M+ users. Implemented CI/CD pipelines reducing deployment time by 60%.'
          },
          {
            company: 'StartupXYZ',
            position: 'Full Stack Developer',
            startDate: '2018-06',
            endDate: '2019-12',
            current: false,
            description: 'Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to deliver features.'
          }
        ],
        education: [
          {
            institution: 'University of Technology',
            degree: 'Bachelor of Science',
            field: 'Computer Science',
            startDate: '2014-09',
            endDate: '2018-05',
            gpa: '3.8/4.0'
          }
        ],
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes'],
        projects: [
          {
            name: 'E-Commerce Platform',
            description: 'Built a scalable e-commerce platform with payment integration',
            technologies: 'React, Node.js, MongoDB, Stripe',
            link: 'https://example.com'
          }
        ],
        languages: [],
        certifications: []
      }
    },
    {
      id: 2,
      name: 'Marketing Manager',
      template: 2,
      data: {
        personalInfo: {
          fullName: 'Sarah Johnson',
          email: 'sarah.j@email.com',
          phone: '+1 (555) 987-6543',
          address: 'New York, NY',
          linkedin: 'https://linkedin.com/in/sarahjohnson',
          github: '',
          website: '',
          instagram: '',
          facebook: '',
          telegram: '',
          photo: 'https://via.placeholder.com/150'
        },
        summary: 'Creative marketing professional with expertise in digital marketing, brand management, and campaign strategy. Proven track record of increasing brand awareness and driving revenue growth.',
        experience: [
          {
            company: 'Global Marketing Agency',
            position: 'Marketing Manager',
            startDate: '2019-03',
            endDate: '2024-12',
            current: true,
            description: 'Managed multi-channel marketing campaigns with $2M+ budget. Increased brand awareness by 150% and improved conversion rates by 40%.'
          }
        ],
        education: [
          {
            institution: 'Business University',
            degree: 'MBA',
            field: 'Marketing',
            startDate: '2015-09',
            endDate: '2017-05',
            gpa: '3.9/4.0'
          }
        ],
        skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics', 'Social Media'],
        projects: [],
        languages: [],
        certifications: []
      }
    },
    {
      id: 3,
      name: 'Graphic Designer',
      template: 3,
      data: {
        personalInfo: {
          fullName: 'Alex Chen',
          email: 'alex.chen@email.com',
          phone: '+1 (555) 456-7890',
          address: 'Los Angeles, CA',
          linkedin: 'https://linkedin.com/in/alexchen',
          github: 'https://github.com/alexchen',
          website: 'https://alexchen.design',
          instagram: '',
          facebook: '',
          telegram: '',
          photo: 'https://via.placeholder.com/150'
        },
        summary: 'Creative graphic designer specializing in brand identity, web design, and digital illustrations. Passionate about creating visually stunning designs that tell compelling stories.',
        experience: [
          {
            company: 'Creative Studio',
            position: 'Senior Graphic Designer',
            startDate: '2021-01',
            endDate: '2024-12',
            current: true,
            description: 'Designed brand identities for 50+ clients. Created award-winning designs featured in design publications.'
          }
        ],
        education: [
          {
            institution: 'Art Institute',
            degree: 'Bachelor of Fine Arts',
            field: 'Graphic Design',
            startDate: '2016-09',
            endDate: '2020-05',
            gpa: '3.7/4.0'
          }
        ],
        skills: ['Adobe Creative Suite', 'Figma', 'UI/UX Design', 'Branding', 'Illustration'],
        projects: [
          {
            name: 'Brand Identity Project',
            description: 'Complete brand identity redesign for tech startup',
            technologies: 'Illustrator, Photoshop, Figma',
            link: 'https://example.com'
          }
        ],
        languages: [],
        certifications: []
      }
    },
    {
      id: 4,
      name: 'Full Stack Developer (Abhay Tiwari) - Complete Profile',
      template: 1,
      data: {
        personalInfo: {
          fullName: 'Abhay Tiwari',
          email: 'at02032004@gmail.com',
          phone: '9792215126',
          address: 'Bhiduna Meerganj, Jaunpur, Uttar Pradesh, India',
          linkedin: 'https://www.linkedin.com/in/abhay-tiwari-545a57358',
          github: 'https://github.com/abhayd95',
          website: 'https://abhayvirus.onrender.com',
          instagram: 'https://www.instagram.com/abhay_d95',
          facebook: 'https://www.facebook.com/share/16213qbyn8/',
          telegram: 'https://t.me/abhayd95',
          photo: 'https://github.com/abhayd95.png'
        },
        summary: '🚀 Passionate Full Stack Developer & creative Video Editor. From basic to advanced video editing with professional tools. Currently working at Corementores Pvt. Ltd. Learning Next.js, UI/UX, and advanced backend systems. Open to collaborations on full-stack projects & creative editing. Code is my craft, and editing is my art. ⚡',
        experience: [
          {
            company: 'Corementores Pvt Ltd',
            position: 'Full Stack Developer',
            startDate: '2024-01',
            endDate: '2024-12',
            current: true,
            description: 'Working on full-stack development projects, building scalable web applications with modern technologies. Developing responsive user interfaces using React and TailwindCSS. Implementing RESTful APIs with Node.js and Express.js. Managing databases (MySQL, MongoDB) and ensuring optimal performance. Collaborating with cross-functional teams to deliver high-quality software solutions. Contributing to code reviews and maintaining best practices.'
          },
          {
            company: 'Freelance',
            position: 'Web Developer & Video Editor',
            startDate: '2022-06',
            endDate: '2023-12',
            current: false,
            description: 'Developed custom websites for clients using modern web technologies. Created engaging video content using Adobe Premiere Pro, After Effects, and DaVinci Resolve. Managed multiple projects simultaneously while maintaining high quality standards.'
          }
        ],
        education: [
          {
            institution: 'PICS (Pratap Institute of Computer Science)',
            degree: 'Bachelor of Computer Applications',
            field: 'Computer Science',
            startDate: '2020-01',
            endDate: '2023-12',
            gpa: '89%'
          }
        ],
        skills: [
          'HTML5', 'CSS3', 'JavaScript', 'React', 'TailwindCSS', 'Node.js', 
          'Express.js', 'MySQL', 'MongoDB', 'Git', 'REST API', 'Responsive Design',
          'Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Video Editing',
          'UI/UX Design', 'Problem Solving', 'Team Collaboration'
        ],
        projects: [
          {
            name: 'Abhay Virus Portfolio',
            description: 'Official web experience combining creative design with full-stack development to deliver a seamless online presence. Features modern UI/UX, responsive design, and interactive elements showcasing professional work and skills.',
            technologies: 'React, JavaScript, TailwindCSS, Node.js',
            link: 'https://abhayvirus.onrender.com'
          },
          {
            name: 'Resume Maker Application',
            description: 'A comprehensive resume builder with multiple templates, PDF generation, and database integration. Built with React, Express.js, and MySQL.',
            technologies: 'React, Node.js, Express.js, MySQL, jsPDF',
            link: 'https://github.com/abhayd95'
          }
        ],
        languages: [
          { name: 'English', proficiency: 'Advanced' },
          { name: 'Hindi', proficiency: 'Native' }
        ],
        certifications: [
          {
            name: 'Web Development Certification',
            organization: 'Online Platform',
            date: '2023-06',
            credentialId: 'WEB-DEV-2023'
          }
        ]
      }
    }
  ]

  // Generate 1000+ demo resumes
  const generatedDemos = useMemo(() => generateDemoResumes(), [])
  
  // Combine original and generated
  const allDemos = useMemo(() => {
    return [...originalDemos, ...generatedDemos]
  }, [generatedDemos])

  // Filter and search
  const filteredDemos = useMemo(() => {
    let demos = allDemos
    
    if (searchQuery) {
      demos = searchDemos(searchQuery, demos)
    }
    
    if (filterTemplate !== 'all') {
      demos = filterDemosByTemplate(parseInt(filterTemplate), demos)
    }
    
    return demos
  }, [allDemos, searchQuery, filterTemplate])

  // Pagination
  const totalPages = Math.ceil(filteredDemos.length / demosPerPage)
  const startIndex = (currentPage - 1) * demosPerPage
  const endIndex = startIndex + demosPerPage
  const currentDemos = filteredDemos.slice(startIndex, endIndex)

  if (!isOpen) return null

  const handleUseDemo = (demo) => {
    if (onUseDemo) {
      onUseDemo(demo.data, demo.template)
    }
    onClose()
  }

  const handleDownloadDemo = async (demo, e) => {
    e.stopPropagation()
    
    // Show preview first, then download
    setSelectedDemo(demo)
    
    // Wait for preview to render, then download
    setTimeout(() => {
      const resumeElement = document.querySelector('.demo-preview-container .resume-wrapper')
      if (resumeElement) {
        generatePDF(resumeElement, demo.data.personalInfo?.fullName || 'demo-resume')
      } else {
        // Try again after a bit more time
        setTimeout(() => {
          const retryElement = document.querySelector('.demo-preview-container .resume-wrapper')
          if (retryElement) {
            generatePDF(retryElement, demo.data.personalInfo?.fullName || 'demo-resume')
          } else {
            alert('Please wait for preview to load, then click the Download PDF button in the preview section')
          }
        }, 1000)
      }
    }, 800)
  }

  const renderDemoPreview = (demo, isMini = false) => {
    const templates = {
      1: Template1,
      2: Template2,
      3: Template3,
      4: Template4,
      5: Template5,
      6: Template6,
      7: Template7
    }
    const Template = templates[demo.template] || Template1
    const colorTheme = demo.data.colorTheme || 'blue'
    
    if (isMini) {
      return (
        <div className="demo-preview-wrapper">
          <div className="resume-wrapper" style={{ 
            minHeight: 'auto',
            width: '100%',
            display: 'block',
            position: 'relative'
          }}>
            <Template data={demo.data} colorTheme={colorTheme} />
          </div>
        </div>
      )
    }
    
    return (
      <div className="demo-preview-wrapper">
        <Template data={demo.data} colorTheme={colorTheme} />
      </div>
    )
  }

  return (
    <div className="demo-modal-overlay" onClick={onClose}>
      <div className="demo-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="demo-modal-header">
          <h2>📋 View Demo Resumes</h2>
          <button onClick={onClose} className="btn-close-modal">✕</button>
        </div>

        {/* Search and Filters */}
        <div className="demo-filters">
          <div className="demo-search-box">
            <input
              type="text"
              placeholder="🔍 Search demo resumes..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="demo-search-input"
            />
          </div>
          <select
            value={filterTemplate}
            onChange={(e) => {
              setFilterTemplate(e.target.value)
              setCurrentPage(1)
            }}
            className="demo-filter-select"
          >
            <option value="all">All Templates</option>
            <option value="1">Template 1</option>
            <option value="2">Template 2</option>
            <option value="3">Template 3</option>
            <option value="4">Template 4</option>
            <option value="5">Template 5</option>
            <option value="6">Template 6</option>
            <option value="7">Template 7</option>
          </select>
        </div>

        <div className="demo-count">
          Showing {currentDemos.length} of {filteredDemos.length} demo resumes
        </div>
        
        <div className="demo-resumes-grid">
          {currentDemos.map((demo) => (
            <div 
              key={demo.id} 
              className={`demo-resume-card ${selectedDemo?.id === demo.id ? 'selected' : ''}`}
              onClick={() => {
                setSelectedDemo(demo)
                // Scroll to preview section
                setTimeout(() => {
                  const previewSection = document.querySelector('.demo-full-preview')
                  if (previewSection) {
                    previewSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }, 100)
              }}
            >
              <div className="demo-card-header">
                <h3>{demo.name}</h3>
                <span className="demo-template-badge">Template {demo.template}</span>
              </div>
              <div className="demo-preview-mini">
                {renderDemoPreview(demo, true)}
              </div>
              <div className="demo-card-actions">
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDownloadDemo(demo, e)
                  }}
                  className="btn-download-demo premium-download"
                  title="Download Premium PDF"
                >
                  <span className="download-icon">⬇️</span>
                  <span className="download-text">Download PDF</span>
                  <span className="premium-badge">PREMIUM</span>
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    handleUseDemo(demo)
                  }}
                  className="btn-use-demo"
                >
                  Use This Demo
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="demo-pagination">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              ← Previous
            </button>
            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next →
            </button>
          </div>
        )}

        {selectedDemo && (
          <div className="demo-full-preview" id="demo-preview-section">
            <div className="demo-preview-header">
              <div className="preview-title-section">
                <h3>✨ Premium Preview: {selectedDemo.name}</h3>
                <p className="preview-subtitle">Click Download to get your professional PDF resume</p>
              </div>
              <div className="demo-preview-actions">
                <button 
                  onClick={() => {
                    const resumeElement = document.querySelector('.demo-preview-container .resume-wrapper')
                    if (resumeElement) {
                      generatePDF(resumeElement, selectedDemo.data.personalInfo?.fullName || 'demo-resume')
                    } else {
                      alert('Please wait for preview to load...')
                    }
                  }}
                  className="btn-download-preview premium-download-btn"
                >
                  <span className="download-icon-large">⬇️</span>
                  <span className="download-text-large">Download Premium PDF</span>
                  <span className="premium-shine">✨</span>
                </button>
                <button 
                  onClick={() => handleUseDemo(selectedDemo)}
                  className="btn-use-preview"
                >
                  ✨ Use This Demo
                </button>
                <button 
                  onClick={() => setSelectedDemo(null)}
                  className="btn-close-preview"
                >
                  ✕ Close
                </button>
              </div>
            </div>
            <div className="demo-preview-container">
              <div className="resume-wrapper">
                {renderDemoPreview(selectedDemo)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DemoResumeModal
