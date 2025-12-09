import { useState } from 'react'

const AIResumeAssistant = ({ resumeData, onApplySuggestion, onClose }) => {
  const [selectedSection, setSelectedSection] = useState('summary')
  const [suggestions, setSuggestions] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [inputText, setInputText] = useState('')

  const sections = [
    { id: 'summary', name: 'Professional Summary', icon: '📝' },
    { id: 'experience', name: 'Work Experience', icon: '💼' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'skills', name: 'Skills', icon: '🛠️' },
    { id: 'projects', name: 'Projects', icon: '🚀' }
  ]

  const generateAISuggestions = () => {
    setIsGenerating(true)
    
    // Simulate AI analysis
    setTimeout(() => {
      const aiSuggestions = []
      
      if (selectedSection === 'summary') {
        if (!resumeData.summary || resumeData.summary.length < 50) {
          aiSuggestions.push({
            type: 'enhancement',
            title: 'Add Professional Summary',
            suggestion: `Experienced ${resumeData.experience?.[0]?.position || 'professional'} with ${resumeData.experience?.length || 0}+ years of expertise in ${resumeData.skills?.slice(0, 3).join(', ') || 'your field'}. Proven track record of delivering results and driving innovation.`,
            reason: 'A strong summary helps recruiters quickly understand your value proposition.'
          })
        } else if (resumeData.summary.length < 150) {
          aiSuggestions.push({
            type: 'enhancement',
            title: 'Expand Your Summary',
            suggestion: `${resumeData.summary} Skilled in ${resumeData.skills?.slice(0, 5).join(', ') || 'key technologies'}. Passionate about ${resumeData.experience?.[0]?.position || 'continuous learning'} and delivering exceptional results.`,
            reason: 'A longer summary (150-200 words) provides more context about your expertise.'
          })
        }
      }
      
      if (selectedSection === 'experience') {
        if (!resumeData.experience || resumeData.experience.length === 0) {
          aiSuggestions.push({
            type: 'missing',
            title: 'Add Work Experience',
            suggestion: 'Include at least 2-3 relevant work experiences with detailed descriptions of your achievements and responsibilities.',
            reason: 'Work experience is crucial for demonstrating your professional background.'
          })
        } else {
          resumeData.experience.forEach((exp, index) => {
            if (!exp.description || exp.description.length < 50) {
              aiSuggestions.push({
                type: 'enhancement',
                title: `Enhance Experience ${index + 1} Description`,
                suggestion: `• Led ${exp.position === 'Manager' ? 'team of 5+' : 'key projects'} resulting in measurable outcomes\n• Implemented ${exp.company || 'innovative solutions'} that improved efficiency\n• Collaborated with cross-functional teams to deliver results`,
                reason: 'Detailed descriptions with bullet points and achievements are more impactful.'
              })
            }
          })
        }
      }
      
      if (selectedSection === 'skills') {
        if (!resumeData.skills || resumeData.skills.length < 5) {
          aiSuggestions.push({
            type: 'enhancement',
            title: 'Add More Skills',
            suggestion: ['Technical Skills', 'Soft Skills', 'Certifications', 'Languages', 'Tools & Software'],
            reason: 'A diverse skill set (10-15 skills) shows versatility and expertise.'
          })
        }
      }
      
      if (selectedSection === 'projects') {
        if (!resumeData.projects || resumeData.projects.length === 0) {
          aiSuggestions.push({
            type: 'missing',
            title: 'Add Projects',
            suggestion: 'Include 2-3 key projects that showcase your skills and achievements. Include technologies used, challenges overcome, and results achieved.',
            reason: 'Projects demonstrate practical application of your skills.'
          })
        }
      }
      
      // General suggestions
      aiSuggestions.push({
        type: 'tip',
        title: 'Use Action Verbs',
        suggestion: 'Start bullet points with strong action verbs: Led, Developed, Implemented, Optimized, Managed, Created, Designed, Built, Improved, Achieved',
        reason: 'Action verbs make your resume more dynamic and impactful.'
      })
      
      aiSuggestions.push({
        type: 'tip',
        title: 'Quantify Achievements',
        suggestion: 'Add numbers and metrics: "Increased sales by 30%", "Managed team of 10", "Reduced costs by $50K", "Improved efficiency by 25%"',
        reason: 'Quantifiable achievements are more convincing than vague statements.'
      })
      
      setSuggestions(aiSuggestions)
      setIsGenerating(false)
    }, 2000)
  }

  const generateContent = () => {
    if (!inputText.trim()) {
      alert('Please enter some text or context for AI to generate content')
      return
    }
    
    setIsGenerating(true)
    
    setTimeout(() => {
      const generated = {
        type: 'generated',
        title: 'AI Generated Content',
        suggestion: `Based on "${inputText}", here's an optimized version:\n\n${generateOptimizedContent(inputText, selectedSection)}`,
        reason: 'AI-generated content optimized for ATS and human readers.'
      }
      setSuggestions([generated])
      setIsGenerating(false)
    }, 2000)
  }

  const generateOptimizedContent = (text, section) => {
    const templates = {
      summary: `Dynamic ${text} professional with proven expertise in delivering results. Skilled in strategic planning and execution. Passionate about innovation and continuous improvement.`,
      experience: `• ${text} resulting in measurable business impact\n• Collaborated with teams to achieve project goals\n• Implemented best practices and process improvements`,
      skills: `${text}, along with complementary skills in related technologies and methodologies.`
    }
    return templates[section] || text
  }

  const handleApplySuggestion = (suggestion) => {
    if (onApplySuggestion) {
      onApplySuggestion(selectedSection, suggestion.suggestion)
    }
    alert('Suggestion applied! Check your resume.')
  }

  return (
    <div className="ai-assistant-modal">
      <div className="ai-assistant-content">
        <div className="ai-assistant-header">
          <h2>🤖 AI Resume Writing Assistant</h2>
          <button onClick={onClose} className="btn-close">✕</button>
        </div>

        <div className="ai-assistant-tabs">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => {
                setSelectedSection(section.id)
                setSuggestions([])
              }}
              className={`ai-tab-btn ${selectedSection === section.id ? 'active' : ''}`}
            >
              <span>{section.icon}</span>
              <span>{section.name}</span>
            </button>
          ))}
        </div>

        <div className="ai-input-section">
          <label>Enter text or context for AI to improve:</label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Enter your ${sections.find(s => s.id === selectedSection)?.name.toLowerCase()} or let AI analyze your current content...`}
            rows="4"
            className="ai-input-textarea"
          />
          <div className="ai-actions">
            <button
              onClick={generateAISuggestions}
              disabled={isGenerating}
              className="btn-analyze-ai"
            >
              {isGenerating ? '⏳ Analyzing...' : '🔍 Analyze & Suggest'}
            </button>
            <button
              onClick={generateContent}
              disabled={isGenerating || !inputText.trim()}
              className="btn-generate-ai"
            >
              {isGenerating ? '⏳ Generating...' : '✨ Generate Content'}
            </button>
          </div>
        </div>

        {isGenerating && (
          <div className="ai-loading">
            <div className="ai-spinner"></div>
            <p>AI is analyzing your resume...</p>
          </div>
        )}

        {!isGenerating && suggestions.length > 0 && (
          <div className="ai-suggestions-list">
            <h3>AI Suggestions ({suggestions.length})</h3>
            {suggestions.map((suggestion, index) => (
              <div key={index} className={`ai-suggestion-card ${suggestion.type}`}>
                <div className="suggestion-header">
                  <span className="suggestion-type-badge">{suggestion.type}</span>
                  <h4>{suggestion.title}</h4>
                </div>
                <div className="suggestion-content">
                  {Array.isArray(suggestion.suggestion) ? (
                    <ul>
                      {suggestion.suggestion.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{suggestion.suggestion}</p>
                  )}
                </div>
                <div className="suggestion-reason">
                  <strong>Why:</strong> {suggestion.reason}
                </div>
                <button
                  onClick={() => handleApplySuggestion(suggestion)}
                  className="btn-apply-ai-suggestion"
                >
                  ✓ Apply Suggestion
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="ai-assistant-footer">
          <p>💡 AI suggestions are based on best practices and ATS optimization</p>
          <button onClick={onClose} className="btn-cancel">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIResumeAssistant

