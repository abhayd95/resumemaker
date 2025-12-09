import { useState } from 'react'

const JobMatchScore = ({ resumeData, onClose }) => {
  const [jobDescription, setJobDescription] = useState('')
  const [analysisResult, setAnalysisResult] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeJobMatch = () => {
    if (!jobDescription.trim()) {
      alert('Please enter a job description')
      return
    }

    setIsAnalyzing(true)

    // Simulate analysis
    setTimeout(() => {
      const resumeText = extractResumeText(resumeData)
      const jobText = jobDescription.toLowerCase()
      const resumeTextLower = resumeText.toLowerCase()

      // Keyword matching
      const jobKeywords = extractKeywords(jobText)
      const resumeKeywords = extractKeywords(resumeTextLower)
      const matchedKeywords = jobKeywords.filter(kw => resumeKeywords.includes(kw))
      const keywordMatchScore = (matchedKeywords.length / jobKeywords.length) * 100

      // Skills matching
      const jobSkills = extractSkills(jobText)
      const resumeSkills = resumeData.skills || []
      const matchedSkills = jobSkills.filter(skill => 
        resumeSkills.some(rs => rs.toLowerCase().includes(skill.toLowerCase()))
      )
      const skillsMatchScore = (matchedSkills.length / Math.max(jobSkills.length, 1)) * 100

      // Experience level matching
      const experienceMatch = analyzeExperience(resumeData, jobText)

      // Education matching
      const educationMatch = analyzeEducation(resumeData, jobText)

      // Overall score
      const overallScore = Math.round(
        (keywordMatchScore * 0.3) +
        (skillsMatchScore * 0.3) +
        (experienceMatch * 0.2) +
        (educationMatch * 0.2)
      )

      // Missing keywords
      const missingKeywords = jobKeywords.filter(kw => !resumeKeywords.includes(kw))

      // Skills gap
      const skillsGap = jobSkills.filter(skill => 
        !resumeSkills.some(rs => rs.toLowerCase().includes(skill.toLowerCase()))
      )

      // Suggestions
      const suggestions = generateSuggestions(missingKeywords, skillsGap, overallScore)

      setAnalysisResult({
        overallScore,
        keywordMatchScore: Math.round(keywordMatchScore),
        skillsMatchScore: Math.round(skillsMatchScore),
        experienceMatch: Math.round(experienceMatch),
        educationMatch: Math.round(educationMatch),
        matchedKeywords,
        missingKeywords: missingKeywords.slice(0, 10),
        matchedSkills,
        skillsGap: skillsGap.slice(0, 10),
        suggestions
      })

      setIsAnalyzing(false)
    }, 1500)
  }

  const extractResumeText = (data) => {
    let text = ''
    if (data.personalInfo?.fullName) text += data.personalInfo.fullName + ' '
    if (data.summary) text += data.summary + ' '
    if (data.experience) {
      data.experience.forEach(exp => {
        text += exp.position + ' ' + exp.company + ' ' + (exp.description || '') + ' '
      })
    }
    if (data.education) {
      data.education.forEach(edu => {
        text += edu.degree + ' ' + edu.institution + ' ' + (edu.field || '') + ' '
      })
    }
    if (data.skills) {
      text += data.skills.join(' ') + ' '
    }
    return text
  }

  const extractKeywords = (text) => {
    const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'must', 'can']
    const words = text.match(/\b\w+\b/g) || []
    return words
      .filter(word => word.length > 3 && !commonWords.includes(word.toLowerCase()))
      .map(word => word.toLowerCase())
      .filter((word, index, arr) => arr.indexOf(word) === index)
      .slice(0, 30)
  }

  const extractSkills = (text) => {
    const skillKeywords = [
      'javascript', 'python', 'java', 'react', 'node', 'sql', 'mongodb', 'aws', 'docker',
      'kubernetes', 'git', 'agile', 'scrum', 'leadership', 'management', 'communication',
      'analytics', 'machine learning', 'ai', 'data science', 'frontend', 'backend', 'full stack'
    ]
    return skillKeywords.filter(skill => text.includes(skill))
  }

  const analyzeExperience = (data, jobText) => {
    const experienceYears = data.experience?.length || 0
    const hasSenior = jobText.includes('senior') || jobText.includes('lead') || jobText.includes('manager')
    const hasJunior = jobText.includes('junior') || jobText.includes('entry') || jobText.includes('intern')
    
    if (hasSenior && experienceYears >= 3) return 100
    if (hasJunior && experienceYears <= 2) return 100
    if (experienceYears >= 5) return 90
    if (experienceYears >= 3) return 75
    if (experienceYears >= 1) return 60
    return 40
  }

  const analyzeEducation = (data, jobText) => {
    const education = data.education || []
    const hasDegree = education.length > 0
    const requiresDegree = jobText.includes('degree') || jobText.includes('bachelor') || jobText.includes('master')
    
    if (requiresDegree && hasDegree) return 100
    if (hasDegree) return 80
    return 50
  }

  const generateSuggestions = (missingKeywords, skillsGap, score) => {
    const suggestions = []
    
    if (score < 50) {
      suggestions.push('Your resume has a low match score. Consider adding more relevant keywords from the job description.')
    }
    
    if (missingKeywords.length > 0) {
      suggestions.push(`Add these keywords to improve match: ${missingKeywords.slice(0, 5).join(', ')}`)
    }
    
    if (skillsGap.length > 0) {
      suggestions.push(`Consider highlighting these skills: ${skillsGap.slice(0, 5).join(', ')}`)
    }
    
    if (score >= 70) {
      suggestions.push('Great match! Your resume aligns well with the job requirements.')
    } else if (score >= 50) {
      suggestions.push('Good match, but there\'s room for improvement. Add missing keywords and skills.')
    }
    
    return suggestions
  }

  return (
    <div className="job-match-modal">
      <div className="job-match-content">
        <div className="job-match-header">
          <h2>🎯 Job Match Score</h2>
          <button onClick={onClose} className="btn-close">✕</button>
        </div>

        <div className="job-match-form">
          <div className="form-group">
            <label>Paste Job Description:</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows="10"
              placeholder="Paste the complete job description here..."
              className="job-description-input"
            />
          </div>

          <button
            onClick={analyzeJobMatch}
            disabled={isAnalyzing || !jobDescription.trim()}
            className="btn-analyze"
          >
            {isAnalyzing ? '⏳ Analyzing...' : '🔍 Analyze Match'}
          </button>
        </div>

        {analysisResult && (
          <div className="analysis-results">
            <div className="score-display">
              <div className="overall-score">
                <div className="score-circle" style={{
                  background: `conic-gradient(#667eea 0deg ${analysisResult.overallScore * 3.6}deg, #e0e0e0 ${analysisResult.overallScore * 3.6}deg 360deg)`
                }}>
                  <div className="score-inner">
                    <span className="score-number">{analysisResult.overallScore}</span>
                    <span className="score-label">Match</span>
                  </div>
                </div>
                <h3>Overall Match Score</h3>
              </div>

              <div className="detailed-scores">
                <div className="score-item">
                  <span className="score-label">Keywords</span>
                  <div className="score-bar">
                    <div 
                      className="score-fill" 
                      style={{ width: `${analysisResult.keywordMatchScore}%` }}
                    ></div>
                    <span className="score-value">{analysisResult.keywordMatchScore}%</span>
                  </div>
                </div>
                <div className="score-item">
                  <span className="score-label">Skills</span>
                  <div className="score-bar">
                    <div 
                      className="score-fill" 
                      style={{ width: `${analysisResult.skillsMatchScore}%` }}
                    ></div>
                    <span className="score-value">{analysisResult.skillsMatchScore}%</span>
                  </div>
                </div>
                <div className="score-item">
                  <span className="score-label">Experience</span>
                  <div className="score-bar">
                    <div 
                      className="score-fill" 
                      style={{ width: `${analysisResult.experienceMatch}%` }}
                    ></div>
                    <span className="score-value">{analysisResult.experienceMatch}%</span>
                  </div>
                </div>
                <div className="score-item">
                  <span className="score-label">Education</span>
                  <div className="score-bar">
                    <div 
                      className="score-fill" 
                      style={{ width: `${analysisResult.educationMatch}%` }}
                    ></div>
                    <span className="score-value">{analysisResult.educationMatch}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="analysis-details">
              <div className="detail-section">
                <h4>✅ Matched Keywords ({analysisResult.matchedKeywords.length})</h4>
                <div className="keyword-list">
                  {analysisResult.matchedKeywords.slice(0, 10).map((keyword, index) => (
                    <span key={index} className="keyword-tag matched">{keyword}</span>
                  ))}
                </div>
              </div>

              {analysisResult.missingKeywords.length > 0 && (
                <div className="detail-section">
                  <h4>❌ Missing Keywords ({analysisResult.missingKeywords.length})</h4>
                  <div className="keyword-list">
                    {analysisResult.missingKeywords.map((keyword, index) => (
                      <span key={index} className="keyword-tag missing">{keyword}</span>
                    ))}
                  </div>
                </div>
              )}

              {analysisResult.skillsGap.length > 0 && (
                <div className="detail-section">
                  <h4>🛠️ Skills Gap ({analysisResult.skillsGap.length})</h4>
                  <div className="keyword-list">
                    {analysisResult.skillsGap.map((skill, index) => (
                      <span key={index} className="keyword-tag missing">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="detail-section">
                <h4>💡 Suggestions</h4>
                <ul className="suggestions-list">
                  {analysisResult.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default JobMatchScore

