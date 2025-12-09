import { useState } from 'react'
import Template1 from './templates/Template1'
import Template2 from './templates/Template2'
import Template3 from './templates/Template3'
import Template4 from './templates/Template4'
import Template5 from './templates/Template5'
import Template6 from './templates/Template6'
import Template7 from './templates/Template7'

const ResumeExamplesLibrary = ({ onUseExample, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedExample, setSelectedExample] = useState(null)

  const categories = [
    { id: 'all', name: 'All Examples', icon: '📚' },
    { id: 'tech', name: 'Technology', icon: '💻' },
    { id: 'design', name: 'Design', icon: '🎨' },
    { id: 'business', name: 'Business', icon: '💼' },
    { id: 'marketing', name: 'Marketing', icon: '📈' },
    { id: 'student', name: 'Student', icon: '🎓' },
    { id: 'executive', name: 'Executive', icon: '👔' }
  ]

  const examples = [
    {
      id: 1,
      name: 'Software Engineer - Entry Level',
      category: 'tech',
      template: 1,
      description: 'Perfect for fresh graduates and entry-level developers',
      data: {
        personalInfo: {
          fullName: 'Alex Johnson',
          email: 'alex.johnson@email.com',
          phone: '+1 (555) 123-4567',
          address: 'San Francisco, CA',
          linkedin: 'https://linkedin.com/in/alexjohnson',
          github: 'https://github.com/alexjohnson',
          website: '',
          instagram: '',
          facebook: '',
          telegram: '',
          photo: ''
        },
        summary: 'Recent Computer Science graduate with strong foundation in software development. Passionate about building scalable applications and learning new technologies. Seeking entry-level software engineering position.',
        experience: [
          {
            position: 'Software Development Intern',
            company: 'Tech Startup Inc.',
            startDate: '2023-06',
            endDate: '2023-08',
            current: false,
            description: 'Developed and maintained web applications using React and Node.js. Collaborated with team of 5 developers on agile projects.'
          }
        ],
        education: [
          {
            degree: 'Bachelor of Science',
            institution: 'University of California',
            field: 'Computer Science',
            startDate: '2019-09',
            endDate: '2023-05',
            gpa: '3.8'
          }
        ],
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Git', 'SQL'],
        projects: [
          {
            name: 'E-Commerce Platform',
            description: 'Full-stack e-commerce application with payment integration',
            technologies: 'React, Node.js, MongoDB, Stripe',
            link: 'https://github.com/alexjohnson/ecommerce'
          }
        ],
        languages: [
          { name: 'English', proficiency: 'Native' },
          { name: 'Spanish', proficiency: 'Intermediate' }
        ],
        certifications: [
          {
            name: 'AWS Certified Cloud Practitioner',
            organization: 'Amazon Web Services',
            date: '2023-07',
            credentialId: 'AWS-CCP-12345'
          }
        ],
        references: [],
        awards: [],
        volunteer: []
      }
    },
    {
      id: 2,
      name: 'UI/UX Designer - Mid Level',
      category: 'design',
      template: 2,
      description: 'Ideal for designers with 2-5 years of experience',
      data: {
        personalInfo: {
          fullName: 'Sarah Chen',
          email: 'sarah.chen@email.com',
          phone: '+1 (555) 234-5678',
          address: 'New York, NY',
          linkedin: 'https://linkedin.com/in/sarahchen',
          github: '',
          website: 'https://sarahchen.design',
          instagram: '',
          facebook: '',
          telegram: '',
          photo: ''
        },
        summary: 'Creative UI/UX designer with 4 years of experience designing user-centered digital products. Specialized in mobile app design and design systems.',
        experience: [
          {
            position: 'Senior UI/UX Designer',
            company: 'Design Studio Pro',
            startDate: '2021-03',
            endDate: '',
            current: true,
            description: 'Lead design projects for mobile and web applications. Created design systems used by 20+ developers.'
          },
          {
            position: 'UI Designer',
            company: 'Digital Agency',
            startDate: '2019-06',
            endDate: '2021-02',
            current: false,
            description: 'Designed user interfaces for client websites and applications. Collaborated with developers and product managers.'
          }
        ],
        education: [
          {
            degree: 'Bachelor of Fine Arts',
            institution: 'Art Institute',
            field: 'Graphic Design',
            startDate: '2015-09',
            endDate: '2019-05',
            gpa: '3.9'
          }
        ],
        skills: ['Figma', 'Sketch', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems'],
        projects: [
          {
            name: 'Mobile Banking App Redesign',
            description: 'Redesigned mobile banking app resulting in 40% increase in user engagement',
            technologies: 'Figma, Principle, User Testing',
            link: 'https://sarahchen.design/banking-app'
          }
        ],
        languages: [
          { name: 'English', proficiency: 'Native' },
          { name: 'Mandarin', proficiency: 'Fluent' }
        ],
        certifications: [
          {
            name: 'Google UX Design Certificate',
            organization: 'Google',
            date: '2020-12',
            credentialId: 'GOOGLE-UX-2020'
          }
        ],
        references: [],
        awards: [
          {
            title: 'Design Award 2022',
            organization: 'Design Association',
            date: '2022-11',
            description: 'Best Mobile App Design'
          }
        ],
        volunteer: []
      }
    },
    {
      id: 3,
      name: 'Marketing Manager - Senior Level',
      category: 'marketing',
      template: 3,
      description: 'For experienced marketing professionals',
      data: {
        personalInfo: {
          fullName: 'Michael Rodriguez',
          email: 'michael.r@email.com',
          phone: '+1 (555) 345-6789',
          address: 'Los Angeles, CA',
          linkedin: 'https://linkedin.com/in/michaelrodriguez',
          github: '',
          website: '',
          instagram: '',
          facebook: '',
          telegram: '',
          photo: ''
        },
        summary: 'Results-driven Marketing Manager with 8+ years of experience in digital marketing, brand management, and campaign strategy. Proven track record of increasing revenue by 150% through strategic marketing initiatives.',
        experience: [
          {
            position: 'Senior Marketing Manager',
            company: 'Global Brands Inc.',
            startDate: '2019-01',
            endDate: '',
            current: true,
            description: 'Lead marketing team of 8 professionals. Increased brand awareness by 200% and revenue by 150% through strategic campaigns.'
          },
          {
            position: 'Marketing Manager',
            company: 'Tech Solutions Ltd.',
            startDate: '2016-03',
            endDate: '2018-12',
            current: false,
            description: 'Managed digital marketing campaigns across multiple channels. Increased lead generation by 80%.'
          }
        ],
        education: [
          {
            degree: 'Master of Business Administration',
            institution: 'Business School',
            field: 'Marketing',
            startDate: '2014-09',
            endDate: '2016-05',
            gpa: '3.7'
          }
        ],
        skills: ['Digital Marketing', 'SEO/SEM', 'Content Strategy', 'Analytics', 'Brand Management', 'Team Leadership'],
        projects: [
          {
            name: 'Brand Rebranding Campaign',
            description: 'Led complete brand rebranding resulting in 50% increase in market share',
            technologies: 'Marketing Analytics, Brand Strategy',
            link: ''
          }
        ],
        languages: [
          { name: 'English', proficiency: 'Native' },
          { name: 'Spanish', proficiency: 'Fluent' }
        ],
        certifications: [
          {
            name: 'Google Analytics Certified',
            organization: 'Google',
            date: '2020-06',
            credentialId: 'GA-CERT-2020'
          }
        ],
        references: [],
        awards: [],
        volunteer: []
      }
    },
    {
      id: 4,
      name: 'Business Analyst - Mid Level',
      category: 'business',
      template: 4,
      description: 'Perfect for business analysts and consultants',
      data: {
        personalInfo: {
          fullName: 'Emily Watson',
          email: 'emily.watson@email.com',
          phone: '+1 (555) 456-7890',
          address: 'Chicago, IL',
          linkedin: 'https://linkedin.com/in/emilywatson',
          github: '',
          website: '',
          instagram: '',
          facebook: '',
          telegram: '',
          photo: ''
        },
        summary: 'Analytical Business Analyst with 5 years of experience in data analysis, process improvement, and stakeholder management. Expert in translating business requirements into technical solutions.',
        experience: [
          {
            position: 'Business Analyst',
            company: 'Consulting Firm',
            startDate: '2020-01',
            endDate: '',
            current: true,
            description: 'Analyze business processes and recommend improvements. Work with cross-functional teams to implement solutions.'
          }
        ],
        education: [
          {
            degree: 'Bachelor of Science',
            institution: 'State University',
            field: 'Business Administration',
            startDate: '2015-09',
            endDate: '2019-05',
            gpa: '3.6'
          }
        ],
        skills: ['Data Analysis', 'SQL', 'Excel', 'Process Improvement', 'Stakeholder Management', 'Agile'],
        projects: [
          {
            name: 'Process Optimization Project',
            description: 'Reduced operational costs by 30% through process improvements',
            technologies: 'Data Analysis, Process Mapping',
            link: ''
          }
        ],
        languages: [
          { name: 'English', proficiency: 'Native' }
        ],
        certifications: [
          {
            name: 'Certified Business Analysis Professional',
            organization: 'IIBA',
            date: '2021-03',
            credentialId: 'CBAP-2021'
          }
        ],
        references: [],
        awards: [],
        volunteer: []
      }
    },
    {
      id: 5,
      name: 'College Student - Internship',
      category: 'student',
      template: 5,
      description: 'For students seeking internships and entry positions',
      data: {
        personalInfo: {
          fullName: 'David Kim',
          email: 'david.kim@email.com',
          phone: '+1 (555) 567-8901',
          address: 'Boston, MA',
          linkedin: 'https://linkedin.com/in/davidkim',
          github: 'https://github.com/davidkim',
          website: '',
          instagram: '',
          facebook: '',
          telegram: '',
          photo: ''
        },
        summary: 'Motivated Computer Science student with strong academic performance and hands-on project experience. Seeking software engineering internship to apply technical skills and learn from industry professionals.',
        experience: [],
        education: [
          {
            degree: 'Bachelor of Science',
            institution: 'University',
            field: 'Computer Science',
            startDate: '2021-09',
            endDate: '2025-05',
            gpa: '3.9'
          }
        ],
        skills: ['Java', 'Python', 'C++', 'Web Development', 'Data Structures', 'Algorithms'],
        projects: [
          {
            name: 'Student Management System',
            description: 'Web application for managing student records and grades',
            technologies: 'React, Node.js, MongoDB',
            link: 'https://github.com/davidkim/student-system'
          },
          {
            name: 'Machine Learning Project',
            description: 'Image classification model using TensorFlow',
            technologies: 'Python, TensorFlow, Keras',
            link: 'https://github.com/davidkim/ml-project'
          }
        ],
        languages: [
          { name: 'English', proficiency: 'Native' },
          { name: 'Korean', proficiency: 'Fluent' }
        ],
        certifications: [],
        references: [],
        awards: [
          {
            title: 'Dean\'s List',
            organization: 'University',
            date: '2023-12',
            description: 'Academic Excellence - Fall 2023'
          }
        ],
        volunteer: [
          {
            organization: 'Code for Good',
            position: 'Volunteer Developer',
            startDate: '2023-01',
            endDate: '',
            current: true,
            description: 'Develop websites for non-profit organizations'
          }
        ]
      }
    },
    {
      id: 6,
      name: 'CEO - Executive Level',
      category: 'executive',
      template: 6,
      description: 'For C-level executives and senior leaders',
      data: {
        personalInfo: {
          fullName: 'Robert Anderson',
          email: 'robert.anderson@email.com',
          phone: '+1 (555) 678-9012',
          address: 'New York, NY',
          linkedin: 'https://linkedin.com/in/robertanderson',
          github: '',
          website: '',
          instagram: '',
          facebook: '',
          telegram: '',
          photo: ''
        },
        summary: 'Visionary CEO with 20+ years of experience leading technology companies. Proven track record of scaling businesses from startup to $100M+ revenue. Expert in strategic planning, team building, and market expansion.',
        experience: [
          {
            position: 'Chief Executive Officer',
            company: 'Tech Innovations Corp.',
            startDate: '2015-01',
            endDate: '',
            current: true,
            description: 'Lead company of 500+ employees. Grew revenue from $10M to $150M in 8 years. Expanded to 5 international markets.'
          },
          {
            position: 'VP of Operations',
            company: 'Global Tech Solutions',
            startDate: '2010-03',
            endDate: '2014-12',
            current: false,
            description: 'Managed operations for 200+ person team. Improved operational efficiency by 40%.'
          }
        ],
        education: [
          {
            degree: 'Master of Business Administration',
            institution: 'Top Business School',
            field: 'Business Administration',
            startDate: '1998-09',
            endDate: '2000-05',
            gpa: '3.9'
          }
        ],
        skills: ['Strategic Planning', 'Leadership', 'Business Development', 'Financial Management', 'Team Building', 'Market Analysis'],
        projects: [],
        languages: [
          { name: 'English', proficiency: 'Native' },
          { name: 'French', proficiency: 'Fluent' }
        ],
        certifications: [],
        references: [
          {
            name: 'John Smith',
            position: 'Board Member',
            company: 'Investment Firm',
            email: 'john.smith@email.com',
            phone: '+1 (555) 111-2222',
            relationship: 'Professional Reference'
          }
        ],
        awards: [
          {
            title: 'CEO of the Year',
            organization: 'Business Magazine',
            date: '2022-12',
            description: 'Recognized for outstanding leadership and business growth'
          }
        ],
        volunteer: []
      }
    }
  ]

  const filteredExamples = selectedCategory === 'all' 
    ? examples 
    : examples.filter(ex => ex.category === selectedCategory)

  const renderTemplate = (templateId, data) => {
    switch(templateId) {
      case 1: return <Template1 data={data} />
      case 2: return <Template2 data={data} />
      case 3: return <Template3 data={data} />
      case 4: return <Template4 data={data} colorTheme="blue" />
      case 5: return <Template5 data={data} colorTheme="blue" />
      case 6: return <Template6 data={data} colorTheme="blue" />
      case 7: return <Template7 data={data} colorTheme="blue" />
      default: return <Template1 data={data} />
    }
  }

  return (
    <div className="examples-library-modal">
      <div className="examples-library-content">
        <div className="examples-header">
          <h2>📚 Resume Examples Library</h2>
          <button onClick={onClose} className="btn-close">✕</button>
        </div>

        <div className="examples-categories">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        <div className="examples-grid">
          {filteredExamples.map(example => (
            <div key={example.id} className="example-card">
              <div className="example-card-header">
                <h3>{example.name}</h3>
                <span className="example-template">Template {example.template}</span>
              </div>
              <p className="example-description">{example.description}</p>
              
              <div className="example-preview">
                <div className="example-preview-mini">
                  {renderTemplate(example.template, example.data)}
                </div>
              </div>

              <div className="example-actions">
                <button 
                  onClick={() => {
                    setSelectedExample(example)
                  }}
                  className="btn-preview"
                >
                  👁️ Preview
                </button>
                <button 
                  onClick={() => {
                    if (onUseExample) {
                      onUseExample(example.data, example.template)
                    }
                  }}
                  className="btn-use"
                >
                  ✨ Use This Example
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedExample && (
          <div className="example-full-preview">
            <div className="preview-header">
              <h3>{selectedExample.name} - Full Preview</h3>
              <button onClick={() => setSelectedExample(null)} className="btn-close">✕</button>
            </div>
            <div className="preview-content">
              {renderTemplate(selectedExample.template, selectedExample.data)}
            </div>
            <div className="preview-actions">
              <button 
                onClick={() => {
                  if (onUseExample) {
                    onUseExample(selectedExample.data, selectedExample.template)
                  }
                }}
                className="btn-use-large"
              >
                ✨ Use This Example
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResumeExamplesLibrary

