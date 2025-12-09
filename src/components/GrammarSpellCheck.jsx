import { useState, useEffect } from 'react'

const GrammarSpellCheck = ({ resumeData, onClose }) => {
  const [checkedText, setCheckedText] = useState('')
  const [errors, setErrors] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [isChecking, setIsChecking] = useState(false)
  const [activeTab, setActiveTab] = useState('spell') // 'spell' or 'grammar'
  const [stats, setStats] = useState({
    totalWords: 0,
    totalErrors: 0,
    spellErrors: 0,
    grammarErrors: 0
  })

  useEffect(() => {
    extractAllText()
  }, [resumeData])

  const extractAllText = () => {
    let text = ''
    
    // Personal Info
    if (resumeData.personalInfo) {
      text += (resumeData.personalInfo.fullName || '') + ' '
      text += (resumeData.personalInfo.email || '') + ' '
    }
    
    // Summary
    text += (resumeData.summary || '') + ' '
    
    // Experience
    if (resumeData.experience) {
      resumeData.experience.forEach(exp => {
        text += (exp.position || '') + ' '
        text += (exp.company || '') + ' '
        text += (exp.description || '') + ' '
      })
    }
    
    // Education
    if (resumeData.education) {
      resumeData.education.forEach(edu => {
        text += (edu.degree || '') + ' '
        text += (edu.institution || '') + ' '
        text += (edu.field || '') + ' '
      })
    }
    
    // Projects
    if (resumeData.projects) {
      resumeData.projects.forEach(proj => {
        text += (proj.name || '') + ' '
        text += (proj.description || '') + ' '
        text += (proj.technologies || '') + ' '
      })
    }
    
    // Skills
    if (resumeData.skills) {
      text += resumeData.skills.join(' ') + ' '
    }
    
    setCheckedText(text.trim())
  }

  const checkSpelling = () => {
    setIsChecking(true)
    setActiveTab('spell')
    
    // Simulate spell checking
    setTimeout(() => {
      const commonMisspellings = {
        'recieve': 'receive',
        'seperate': 'separate',
        'occured': 'occurred',
        'definately': 'definitely',
        'accomodate': 'accommodate',
        'acheive': 'achieve',
        'begining': 'beginning',
        'buisness': 'business',
        'calender': 'calendar',
        'cemetary': 'cemetery',
        'concieve': 'conceive',
        'existance': 'existence',
        'foriegn': 'foreign',
        'goverment': 'government',
        'harrass': 'harass',
        'independant': 'independent',
        'maintainance': 'maintenance',
        'neccessary': 'necessary',
        'occassion': 'occasion',
        'persistant': 'persistent',
        'priviledge': 'privilege',
        'sucessful': 'successful',
        'thier': 'their',
        'tommorrow': 'tomorrow',
        'truely': 'truly',
        'untill': 'until',
        'wich': 'which',
        'writting': 'writing',
        'recieved': 'received',
        'seperated': 'separated',
        'occuring': 'occurring'
      }

      const foundErrors = []
      const words = checkedText.toLowerCase().match(/\b\w+\b/g) || []
      
      words.forEach((word, index) => {
        if (commonMisspellings[word]) {
          foundErrors.push({
            type: 'spell',
            word: word,
            suggestion: commonMisspellings[word],
            position: index,
            context: getContext(word, checkedText)
          })
        }
      })

      setErrors(foundErrors)
      setStats(prev => ({
        ...prev,
        totalWords: words.length,
        totalErrors: foundErrors.length,
        spellErrors: foundErrors.length
      }))
      setIsChecking(false)
    }, 1500)
  }

  const checkGrammar = () => {
    setIsChecking(true)
    setActiveTab('grammar')
    
    // Simulate grammar checking
    setTimeout(() => {
      const grammarIssues = []
      const sentences = checkedText.split(/[.!?]+/).filter(s => s.trim())
      
      sentences.forEach((sentence, index) => {
        const trimmed = sentence.trim()
        
        // Check for common grammar issues
        if (trimmed.length > 0) {
          // Check for passive voice
          if (/\b(was|were|is|are|been)\s+\w+ed\b/i.test(trimmed)) {
            grammarIssues.push({
              type: 'grammar',
              issue: 'Passive voice detected',
              suggestion: 'Consider using active voice for stronger impact',
              sentence: trimmed,
              position: index
            })
          }
          
          // Check for weak verbs
          if (/\b(do|does|did|make|made|get|got)\s+/i.test(trimmed)) {
            grammarIssues.push({
              type: 'grammar',
              issue: 'Weak verb usage',
              suggestion: 'Use stronger action verbs',
              sentence: trimmed,
              position: index
            })
          }
          
          // Check for sentence length
          if (trimmed.split(' ').length > 25) {
            grammarIssues.push({
              type: 'grammar',
              issue: 'Long sentence',
              suggestion: 'Consider breaking into shorter sentences',
              sentence: trimmed,
              position: index
            })
          }
          
          // Check for repeated words
          const words = trimmed.toLowerCase().split(/\s+/)
          const wordCount = {}
          words.forEach(w => {
            wordCount[w] = (wordCount[w] || 0) + 1
          })
          
          Object.keys(wordCount).forEach(word => {
            if (wordCount[word] > 2 && word.length > 4) {
              grammarIssues.push({
                type: 'grammar',
                issue: `Repeated word: "${word}"`,
                suggestion: 'Use synonyms to avoid repetition',
                sentence: trimmed,
                position: index
              })
            }
          })
        }
      })

      setSuggestions(grammarIssues)
      setStats(prev => ({
        ...prev,
        grammarErrors: grammarIssues.length,
        totalErrors: prev.spellErrors + grammarIssues.length
      }))
      setIsChecking(false)
    }, 1500)
  }

  const getContext = (word, text) => {
    const index = text.toLowerCase().indexOf(word)
    if (index === -1) return ''
    const start = Math.max(0, index - 30)
    const end = Math.min(text.length, index + word.length + 30)
    return text.substring(start, end)
  }

  const applySuggestion = (error, suggestion) => {
    // This would update the resume data
    alert(`Would replace "${error.word}" with "${suggestion}"`)
  }

  const getScore = () => {
    if (stats.totalWords === 0) return 100
    const errorRate = (stats.totalErrors / stats.totalWords) * 100
    return Math.max(0, Math.round(100 - (errorRate * 10)))
  }

  return (
    <div className="grammar-spell-modal">
      <div className="grammar-spell-content">
        <div className="grammar-spell-header">
          <h2>✅ Grammar & Spell Check</h2>
          <button onClick={onClose} className="btn-close">✕</button>
        </div>

        <div className="grammar-spell-stats">
          <div className="stat-card">
            <div className="stat-value">{getScore()}</div>
            <div className="stat-label">Quality Score</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.totalWords}</div>
            <div className="stat-label">Total Words</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.totalErrors}</div>
            <div className="stat-label">Total Issues</div>
          </div>
        </div>

        <div className="grammar-spell-tabs">
          <button
            onClick={() => {
              setActiveTab('spell')
              checkSpelling()
            }}
            className={`tab-btn ${activeTab === 'spell' ? 'active' : ''}`}
            disabled={isChecking}
          >
            🔤 Spell Check
          </button>
          <button
            onClick={() => {
              setActiveTab('grammar')
              checkGrammar()
            }}
            className={`tab-btn ${activeTab === 'grammar' ? 'active' : ''}`}
            disabled={isChecking}
          >
            📝 Grammar Check
          </button>
        </div>

        {isChecking && (
          <div className="checking-status">
            <div className="spinner"></div>
            <p>Checking {activeTab === 'spell' ? 'spelling' : 'grammar'}...</p>
          </div>
        )}

        {!isChecking && activeTab === 'spell' && errors.length > 0 && (
          <div className="errors-list">
            <h3>Spelling Errors ({errors.length})</h3>
            {errors.map((error, index) => (
              <div key={index} className="error-item">
                <div className="error-word">
                  <span className="error-text">{error.word}</span>
                  <span className="error-arrow">→</span>
                  <span className="suggestion-text">{error.suggestion}</span>
                </div>
                <div className="error-context">
                  ...{error.context}...
                </div>
                <button
                  onClick={() => applySuggestion(error, error.suggestion)}
                  className="btn-apply-suggestion"
                >
                  Apply Suggestion
                </button>
              </div>
            ))}
          </div>
        )}

        {!isChecking && activeTab === 'spell' && errors.length === 0 && (
          <div className="no-errors">
            ✅ No spelling errors found!
          </div>
        )}

        {!isChecking && activeTab === 'grammar' && suggestions.length > 0 && (
          <div className="suggestions-list">
            <h3>Grammar Suggestions ({suggestions.length})</h3>
            {suggestions.map((suggestion, index) => (
              <div key={index} className="suggestion-item">
                <div className="suggestion-issue">
                  <strong>{suggestion.issue}</strong>
                </div>
                <div className="suggestion-text">
                  {suggestion.suggestion}
                </div>
                <div className="suggestion-sentence">
                  "{suggestion.sentence}"
                </div>
              </div>
            ))}
          </div>
        )}

        {!isChecking && activeTab === 'grammar' && suggestions.length === 0 && (
          <div className="no-errors">
            ✅ No grammar issues found!
          </div>
        )}

        <div className="grammar-spell-actions">
          <button onClick={onClose} className="btn-cancel">
            Close
          </button>
          <button
            onClick={() => {
              checkSpelling()
              setTimeout(() => checkGrammar(), 2000)
            }}
            className="btn-check-all"
            disabled={isChecking}
          >
            🔍 Check All
          </button>
        </div>
      </div>
    </div>
  )
}

export default GrammarSpellCheck

