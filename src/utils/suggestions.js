// Autocomplete suggestions for form fields

export const skillSuggestions = [
  'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'HTML5', 'CSS3',
  'TypeScript', 'Vue.js', 'Angular', 'Express.js', 'MongoDB', 'MySQL',
  'PostgreSQL', 'Git', 'Docker', 'AWS', 'Azure', 'Linux', 'REST API',
  'GraphQL', 'Redux', 'TailwindCSS', 'Bootstrap', 'SASS', 'Next.js',
  'PHP', 'Ruby', 'Go', 'C++', 'C#', '.NET', 'Spring Boot', 'Django',
  'Flask', 'Laravel', 'Firebase', 'Redis', 'Kubernetes', 'CI/CD',
  'Jenkins', 'Jira', 'Agile', 'Scrum', 'Figma', 'Adobe XD', 'Photoshop',
  'Illustrator', 'Premiere Pro', 'After Effects', 'DaVinci Resolve'
]

export const jobTitleSuggestions = [
  'Software Engineer', 'Full Stack Developer', 'Frontend Developer',
  'Backend Developer', 'Web Developer', 'Mobile App Developer',
  'DevOps Engineer', 'Data Scientist', 'UI/UX Designer', 'Graphic Designer',
  'Product Manager', 'Project Manager', 'Marketing Manager',
  'Business Analyst', 'Quality Assurance Engineer', 'System Administrator',
  'Database Administrator', 'Network Engineer', 'Security Analyst',
  'Content Writer', 'Digital Marketer', 'Sales Executive', 'HR Manager'
]

export const companySuggestions = [
  'Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Uber',
  'Airbnb', 'Tesla', 'IBM', 'Oracle', 'Adobe', 'Salesforce', 'PayPal',
  'LinkedIn', 'Twitter', 'Spotify', 'Shopify', 'Stripe', 'GitHub'
]

export const degreeSuggestions = [
  'Bachelor of Science', 'Bachelor of Arts', 'Bachelor of Engineering',
  'Bachelor of Technology', 'Bachelor of Computer Applications',
  'Master of Science', 'Master of Arts', 'Master of Engineering',
  'Master of Technology', 'Master of Business Administration',
  'PhD', 'Diploma', 'Certificate'
]

export const fieldOfStudySuggestions = [
  'Computer Science', 'Information Technology', 'Software Engineering',
  'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering',
  'Business Administration', 'Marketing', 'Finance', 'Accounting',
  'Data Science', 'Artificial Intelligence', 'Cybersecurity',
  'Web Development', 'Mobile Development', 'Game Development'
]

export const languageSuggestions = [
  'English', 'Hindi', 'Spanish', 'French', 'German', 'Chinese',
  'Japanese', 'Korean', 'Portuguese', 'Italian', 'Russian', 'Arabic',
  'Dutch', 'Swedish', 'Norwegian', 'Danish', 'Polish', 'Turkish'
]

export const proficiencyLevels = [
  'Beginner', 'Intermediate', 'Advanced', 'Native', 'Fluent', 'Conversational'
]

export const certificationSuggestions = [
  'AWS Certified Solutions Architect', 'Google Cloud Professional',
  'Microsoft Azure Certified', 'Oracle Certified Professional',
  'Cisco Certified Network Associate', 'CompTIA Security+',
  'Certified Scrum Master', 'PMP Certification', 'Google Analytics Certified',
  'Salesforce Certified Administrator', 'Kubernetes Administrator',
  'Docker Certified Associate', 'Red Hat Certified Engineer'
]

export const getSuggestions = (field, value) => {
  const lowerValue = value.toLowerCase()
  
  switch(field) {
    case 'skill':
      return skillSuggestions.filter(s => s.toLowerCase().includes(lowerValue))
    case 'jobTitle':
      return jobTitleSuggestions.filter(j => j.toLowerCase().includes(lowerValue))
    case 'company':
      return companySuggestions.filter(c => c.toLowerCase().includes(lowerValue))
    case 'degree':
      return degreeSuggestions.filter(d => d.toLowerCase().includes(lowerValue))
    case 'field':
      return fieldOfStudySuggestions.filter(f => f.toLowerCase().includes(lowerValue))
    case 'language':
      return languageSuggestions.filter(l => l.toLowerCase().includes(lowerValue))
    case 'certification':
      return certificationSuggestions.filter(c => c.toLowerCase().includes(lowerValue))
    default:
      return []
  }
}

