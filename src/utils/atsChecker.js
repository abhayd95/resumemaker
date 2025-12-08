// ATS (Applicant Tracking System) Checker Utility

const commonATSKeywords = {
  technical: [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'Git', 'AWS',
    'Docker', 'Kubernetes', 'Agile', 'Scrum', 'CI/CD', 'REST API', 'MongoDB',
    'MySQL', 'PostgreSQL', 'Linux', 'DevOps', 'Microservices', 'TypeScript'
  ],
  soft: [
    'Leadership', 'Communication', 'Teamwork', 'Problem Solving', 'Analytical',
    'Creative', 'Detail-Oriented', 'Time Management', 'Project Management',
    'Collaboration', 'Adaptability', 'Critical Thinking'
  ],
  action: [
    'Developed', 'Implemented', 'Managed', 'Led', 'Created', 'Designed',
    'Improved', 'Optimized', 'Collaborated', 'Achieved', 'Delivered'
  ]
}

export const checkATSCompliance = (formData) => {
  const issues = []
  const suggestions = []
  let score = 100

  // Check for required sections
  if (!formData.personalInfo?.fullName) {
    issues.push('Missing: Full Name')
    score -= 10
  }

  if (!formData.personalInfo?.email) {
    issues.push('Missing: Email Address')
    score -= 10
  }

  if (!formData.summary || formData.summary.length < 50) {
    issues.push('Professional Summary is too short (minimum 50 characters recommended)')
    score -= 5
  }

  if (!formData.experience || formData.experience.length === 0) {
    issues.push('Missing: Work Experience')
    score -= 15
  }

  if (!formData.education || formData.education.length === 0) {
    issues.push('Missing: Education')
    score -= 10
  }

  if (!formData.skills || formData.skills.length < 5) {
    issues.push('Add more skills (minimum 5 recommended)')
    score -= 5
  }

  // Check for keywords
  const allText = [
    formData.summary || '',
    ...(formData.experience || []).map(e => e.description || '').join(' '),
    ...(formData.skills || []).join(' ')
  ].join(' ').toLowerCase()

  const foundKeywords = []
  const missingKeywords = []

  // Check technical keywords
  commonATSKeywords.technical.forEach(keyword => {
    if (allText.includes(keyword.toLowerCase())) {
      foundKeywords.push(keyword)
    } else {
      missingKeywords.push(keyword)
    }
  })

  // Check action verbs
  let actionVerbCount = 0
  commonATSKeywords.action.forEach(verb => {
    if (allText.includes(verb.toLowerCase())) {
      actionVerbCount++
    }
  })

  if (actionVerbCount < 3) {
    suggestions.push('Use more action verbs (e.g., Developed, Implemented, Managed)')
    score -= 5
  }

  // Check for quantifiable achievements
  const hasNumbers = /\d+/.test(allText)
  if (!hasNumbers) {
    suggestions.push('Add quantifiable achievements (e.g., "Increased sales by 20%")')
    score -= 5
  }

  // Check resume length
  const totalLength = allText.length
  if (totalLength < 500) {
    issues.push('Resume is too short. Add more details.')
    score -= 10
  } else if (totalLength > 2000) {
    suggestions.push('Resume might be too long. Consider condensing.')
    score -= 3
  }

  // Ensure score doesn't go below 0
  score = Math.max(0, score)

  return {
    score,
    issues,
    suggestions,
    foundKeywords: foundKeywords.slice(0, 10),
    missingKeywords: missingKeywords.slice(0, 10),
    actionVerbCount,
    hasNumbers,
    totalLength
  }
}

export const getATSScoreColor = (score) => {
  if (score >= 80) return '#28a745' // Green
  if (score >= 60) return '#ffc107' // Yellow
  return '#dc3545' // Red
}

export const getATSScoreLabel = (score) => {
  if (score >= 80) return 'Excellent'
  if (score >= 60) return 'Good'
  if (score >= 40) return 'Fair'
  return 'Needs Improvement'
}

