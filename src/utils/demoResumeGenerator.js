// Generate 1000+ Demo Resumes

const jobTitles = [
  'Software Engineer', 'Full Stack Developer', 'Frontend Developer', 'Backend Developer',
  'DevOps Engineer', 'Data Scientist', 'UI/UX Designer', 'Graphic Designer',
  'Product Manager', 'Project Manager', 'Marketing Manager', 'Sales Manager',
  'Business Analyst', 'QA Engineer', 'System Administrator', 'Network Engineer',
  'Security Analyst', 'Content Writer', 'Digital Marketer', 'HR Manager',
  'Financial Analyst', 'Accountant', 'Consultant', 'Architect',
  'Mechanical Engineer', 'Electrical Engineer', 'Civil Engineer', 'Data Analyst',
  'Machine Learning Engineer', 'AI Specialist', 'Cloud Architect', 'Mobile Developer',
  'Game Developer', 'Blockchain Developer', 'Cybersecurity Specialist', 'Database Administrator'
]

const companies = [
  'Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Uber',
  'Airbnb', 'Tesla', 'IBM', 'Oracle', 'Adobe', 'Salesforce', 'PayPal',
  'LinkedIn', 'Twitter', 'Spotify', 'Shopify', 'Stripe', 'GitHub',
  'Intel', 'NVIDIA', 'AMD', 'Cisco', 'Dell', 'HP', 'Samsung'
]

const skills = [
  ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express.js'],
  ['Python', 'Django', 'PostgreSQL', 'Docker', 'AWS'],
  ['Java', 'Spring Boot', 'MySQL', 'Kubernetes', 'Jenkins'],
  ['C++', 'C#', '.NET', 'SQL Server', 'Azure'],
  ['PHP', 'Laravel', 'MySQL', 'Redis', 'Linux'],
  ['Swift', 'iOS', 'Xcode', 'Core Data', 'Firebase'],
  ['Kotlin', 'Android', 'Room', 'Retrofit', 'Jetpack'],
  ['HTML5', 'CSS3', 'SASS', 'Bootstrap', 'TailwindCSS'],
  ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle'],
  ['Photoshop', 'Illustrator', 'Premiere Pro', 'After Effects', 'Figma']
]

const generateDemoResume = (id) => {
  const jobTitle = jobTitles[id % jobTitles.length]
  const company = companies[Math.floor(id / 50) % companies.length]
  const skillSet = skills[id % skills.length]
  const templateId = (id % 7) + 1
  
  const firstNames = ['John', 'Sarah', 'Alex', 'Emily', 'Michael', 'Jessica', 'David', 'Lisa', 'Chris', 'Amanda']
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Wilson', 'Moore']
  
  const firstName = firstNames[id % firstNames.length]
  const lastName = lastNames[Math.floor(id / 10) % lastNames.length]
  const fullName = `${firstName} ${lastName}`
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`
  const phone = `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`
  
  const cities = ['New York', 'San Francisco', 'Seattle', 'Austin', 'Boston', 'Chicago', 'Los Angeles', 'Denver']
  const address = `${cities[id % cities.length]}, USA`
  
  const linkedin = `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}`
  const github = `https://github.com/${firstName.toLowerCase()}${lastName.toLowerCase()}`
  const website = `https://${firstName.toLowerCase()}${lastName.toLowerCase()}.com`
  
  const summaries = [
    `Experienced ${jobTitle} with ${5 + (id % 10)} years of expertise in building scalable applications and leading development teams.`,
    `Passionate ${jobTitle} specializing in modern web technologies and cloud infrastructure.`,
    `Creative ${jobTitle} with a strong background in full-stack development and system architecture.`,
    `Results-driven ${jobTitle} with proven track record in delivering high-quality software solutions.`
  ]
  
  const summary = summaries[id % summaries.length]
  
  const experiences = [
    {
      company: company,
      position: jobTitle,
      startDate: `${2020 + (id % 4)}-01`,
      endDate: `${2024 + (id % 2)}-12`,
      current: id % 2 === 0,
      description: `Led development of multiple projects using ${skillSet.slice(0, 3).join(', ')}. Collaborated with cross-functional teams to deliver high-quality solutions.`
    }
  ]
  
  if (id % 3 === 0) {
    experiences.push({
      company: companies[(id + 1) % companies.length],
      position: 'Junior ' + jobTitle,
      startDate: `${2018 + (id % 3)}-06`,
      endDate: `${2020 + (id % 4)}-01`,
      current: false,
      description: `Developed and maintained web applications. Worked on bug fixes and feature implementations.`
    })
  }
  
  const educations = [
    {
      institution: ['MIT', 'Stanford', 'Harvard', 'UC Berkeley', 'Carnegie Mellon'][id % 5],
      degree: ['Bachelor of Science', 'Master of Science', 'Bachelor of Engineering'][id % 3],
      field: ['Computer Science', 'Software Engineering', 'Information Technology'][id % 3],
      startDate: `${2014 + (id % 4)}-09`,
      endDate: `${2018 + (id % 4)}-05`,
      gpa: `${3.5 + (id % 5) * 0.1}`.substring(0, 3) + '/4.0'
    }
  ]
  
  const projects = [
    {
      name: `${jobTitle} Portfolio Project`,
      description: `Built a comprehensive portfolio showcasing ${skillSet[0]} and ${skillSet[1]} skills.`,
      technologies: skillSet.slice(0, 3).join(', '),
      link: website
    }
  ]
  
  const languages = [
    { name: 'English', proficiency: 'Native' },
    { name: ['Spanish', 'French', 'German', 'Chinese', 'Japanese'][id % 5], proficiency: ['Advanced', 'Intermediate'][id % 2] }
  ]
  
  const certifications = id % 2 === 0 ? [
    {
      name: `${skillSet[0]} Certification`,
      organization: 'Professional Certification Board',
      date: `${2022 + (id % 2)}-06`,
      credentialId: `CERT-${id}`
    }
  ] : []
  
  return {
    id: id + 1,
    name: `${jobTitle} - ${fullName}`,
    template: templateId,
    data: {
      personalInfo: {
        fullName: fullName,
        email: email,
        phone: phone,
        address: address,
        linkedin: linkedin,
        github: github,
        website: website,
        instagram: '',
        facebook: '',
        telegram: '',
        photo: ''
      },
      summary: summary,
      experience: experiences,
      education: educations,
      skills: skillSet,
      projects: projects,
      languages: languages,
      certifications: certifications
    }
  }
}

// Generate 1000+ demo resumes
export const generateDemoResumes = () => {
  const demos = []
  
  // First 4 are special (original demos + Abhay's)
  // Then generate 996 more
  for (let i = 0; i < 1000; i++) {
    if (i < 4) {
      // Keep original demos, will be added separately
      continue
    }
    demos.push(generateDemoResume(i))
  }
  
  return demos
}

// Get demo by ID
export const getDemoById = (id) => {
  return generateDemoResume(id - 1)
}

// Search demos
export const searchDemos = (query, allDemos) => {
  const lowerQuery = query.toLowerCase()
  return allDemos.filter(demo => 
    demo.name.toLowerCase().includes(lowerQuery) ||
    demo.data.personalInfo.fullName.toLowerCase().includes(lowerQuery) ||
    demo.data.personalInfo.email.toLowerCase().includes(lowerQuery)
  )
}

// Filter by template
export const filterDemosByTemplate = (templateId, allDemos) => {
  return allDemos.filter(demo => demo.template === templateId)
}

export default {
  generateDemoResumes,
  getDemoById,
  searchDemos,
  filterDemosByTemplate
}

