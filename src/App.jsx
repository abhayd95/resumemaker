import { useState, useEffect } from 'react'
import MultiStepForm from './components/MultiStepForm'
import TemplateSelector from './components/TemplateSelector'
import TemplateSelectorWith1000 from './components/TemplateSelectorWith1000'
import ResumePreview from './components/ResumePreview'
import SaveLoadPanel from './components/SaveLoadPanel'
import DemoResumeModal from './components/DemoResumeModal'
import ResumeExamplesLibrary from './components/ResumeExamplesLibrary'
import CustomizationPanel from './components/CustomizationPanel'
import ThemeToggle from './components/ThemeToggle'
import ResumeShareModal from './components/ResumeShareModal'
import ATSChecker from './components/ATSChecker'
import CoverLetterBuilder from './components/CoverLetterBuilder'
import ResumeVersionHistory from './components/ResumeVersionHistory'
import { resumeAPI } from './utils/api'
import { initTheme } from './utils/theme'
import './styles/App.css'
import './styles/MultiStepForm.css'
import './styles/AdditionalFeatures.css'

function App() {
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      github: '',
      website: '',
      instagram: '',
      facebook: '',
      telegram: '',
      photo: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    languages: [],
    certifications: [],
    references: [],
    awards: [],
    volunteer: []
  })

  const [selectedTemplate, setSelectedTemplate] = useState(1)
  const [colorTheme, setColorTheme] = useState('blue')
  const [customColor, setCustomColor] = useState(null) // For custom color picker
  const [selectedFont, setSelectedFont] = useState('Segoe UI') // Default font
  const [fontSize, setFontSize] = useState('medium') // small, medium, large
  const [previewMode, setPreviewMode] = useState('desktop') // desktop, mobile, print, ats
  const [step, setStep] = useState(1) // 1: Form, 2: Template, 3: Preview
  const [userName, setUserName] = useState('')
  const [savedResumes, setSavedResumes] = useState([])
  const [showSaveLoad, setShowSaveLoad] = useState(false)
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [showExamplesLibrary, setShowExamplesLibrary] = useState(false)
  const [showCustomization, setShowCustomization] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showATSChecker, setShowATSChecker] = useState(false)
  const [selectedResumeForShare, setSelectedResumeForShare] = useState(null)
  const [currentResumeId, setCurrentResumeId] = useState(null)
  const [coverLetterData, setCoverLetterData] = useState(null)
  const [showCoverLetter, setShowCoverLetter] = useState(false)
  const [showVersionHistory, setShowVersionHistory] = useState(false)
  const [selectedResumeForVersion, setSelectedResumeForVersion] = useState(null)
  
  // Undo/Redo history
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const MAX_HISTORY = 50

  // Initialize theme
  useEffect(() => {
    initTheme()
  }, [])

  // Listen for customization panel open event
  useEffect(() => {
    const handleOpenCustomization = () => {
      if (step === 3) {
        setShowCustomization(true)
      }
    }
    window.addEventListener('openCustomization', handleOpenCustomization)
    return () => {
      window.removeEventListener('openCustomization', handleOpenCustomization)
    }
  }, [step])

  // Initialize history with current formData
  useEffect(() => {
    if (history.length === 0) {
      addToHistory(formData)
    }
  }, [])

  // Save history to sessionStorage
  useEffect(() => {
    if (history.length > 0) {
      sessionStorage.setItem('resumeHistory', JSON.stringify({
        history,
        historyIndex
      }))
    }
  }, [history, historyIndex])

  // Load history from sessionStorage on mount
  useEffect(() => {
    const savedHistory = sessionStorage.getItem('resumeHistory')
    if (savedHistory) {
      try {
        const { history: savedHistoryData, historyIndex: savedIndex } = JSON.parse(savedHistory)
        if (savedHistoryData && savedHistoryData.length > 0) {
          setHistory(savedHistoryData)
          setHistoryIndex(savedIndex)
        }
      } catch (e) {
        console.error('Error loading history:', e)
      }
    }
  }, [])

  // Add to history
  const addToHistory = (data) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(JSON.parse(JSON.stringify(data))) // Deep copy
    
    // Limit history size
    if (newHistory.length > MAX_HISTORY) {
      newHistory.shift()
    } else {
      setHistoryIndex(newHistory.length - 1)
    }
    
    setHistory(newHistory)
  }

  // Undo function
  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setFormData(JSON.parse(JSON.stringify(history[newIndex])))
    }
  }

  // Redo function
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setFormData(JSON.parse(JSON.stringify(history[newIndex])))
    }
  }

  // Update formData and add to history
  const updateFormData = (newData) => {
    setFormData(newData)
    addToHistory(newData)
  }

  // Get user name from email or prompt
  useEffect(() => {
    const storedUserName = localStorage.getItem('resumeUserName')
    if (storedUserName) {
      setUserName(storedUserName)
      loadSavedResumes(storedUserName)
    }
  }, [])

  // Auto-save functionality (every 30 seconds)
  useEffect(() => {
    if (step === 1 && userName && Object.keys(formData.personalInfo).some(key => formData.personalInfo[key])) {
      const autoSaveTimer = setInterval(() => {
        const draftData = {
          ...formData,
          isDraft: true
        }
        localStorage.setItem('resumeDraft', JSON.stringify(draftData))
      }, 30000) // 30 seconds

      return () => clearInterval(autoSaveTimer)
    }
  }, [formData, step, userName])

  // Load draft on mount (silently, without popup)
  useEffect(() => {
    const savedDraft = localStorage.getItem('resumeDraft')
    const draftLoaded = localStorage.getItem('draftLoaded')
    
    // Only load draft once per session, and only if user hasn't started filling
    if (savedDraft && !draftLoaded && !formData.personalInfo.fullName) {
      try {
        const draft = JSON.parse(savedDraft)
        if (draft.isDraft) {
          // Auto-load draft silently without popup
          setFormData(draft)
          localStorage.setItem('draftLoaded', 'true')
        }
      } catch (e) {
        console.error('Error loading draft:', e)
      }
    }
  }, [])

  const loadSavedResumes = async (name) => {
    if (!name || name.trim() === '') {
      setSavedResumes([])
      return
    }
    try {
      const result = await resumeAPI.getAllResumes(name.trim())
      if (result.success) {
        setSavedResumes(result.resumes || [])
        console.log(`✅ Loaded ${result.resumes?.length || 0} saved resumes`)
      } else {
        console.error('Error loading resumes:', result.error)
        setSavedResumes([])
        // Don't show alert for empty results, only for actual errors
        if (result.error && !result.error.includes('not found')) {
          console.warn('Could not load resumes:', result.error)
        }
      }
    } catch (error) {
      console.error('Error loading resumes:', error)
      setSavedResumes([])
      // Only show error if it's a network/server error, not just empty results
      if (error.message && !error.message.includes('Failed to fetch')) {
        console.warn('Network error loading resumes:', error.message)
      }
    }
  }

  const handleFormSubmit = (data) => {
    updateFormData(data)
    // Set userName from email if not set
    if (!userName && data.personalInfo.email) {
      const emailName = data.personalInfo.email.split('@')[0]
      setUserName(emailName)
      localStorage.setItem('resumeUserName', emailName)
      loadSavedResumes(emailName)
    }
    setStep(2)
  }

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId)
    setStep(3)
  }

  const handleBack = () => {
    if (step === 3) setStep(2)
    else if (step === 2) setStep(1)
  }

  const handleSaveResume = async () => {
    if (!userName) {
      const name = prompt('Please enter your name/username to save resume:')
      if (!name || name.trim() === '') {
        alert('Username is required to save resume.')
        return
      }
      setUserName(name.trim())
      localStorage.setItem('resumeUserName', name.trim())
    }

    // Validate that form has at least some data
    if (!formData.personalInfo.fullName && !formData.personalInfo.email) {
      alert('Please fill in at least your name or email before saving.')
      return
    }

    // Show loading state
    const saveButton = document.querySelector('.btn-save')
    const originalText = saveButton?.textContent
    if (saveButton) {
      saveButton.disabled = true
      saveButton.textContent = '💾 Saving...'
    }

    try {
      // Check API health first
      const healthCheck = await resumeAPI.healthCheck()
      if (!healthCheck.success) {
        throw new Error('Server is not responding. Please make sure the backend server is running.')
      }

      const result = currentResumeId
        ? await resumeAPI.updateResume(currentResumeId, userName, formData, selectedTemplate, coverLetterData)
        : await resumeAPI.saveResume(userName, formData, selectedTemplate, coverLetterData)

      if (result.success) {
        // Success notification
        const successMsg = currentResumeId ? 'Resume updated successfully!' : 'Resume saved successfully!'
        alert(successMsg)
        setCurrentResumeId(result.id || currentResumeId)
        await loadSavedResumes(userName)
        // Refresh the saved resumes panel if it's open
        if (showSaveLoad) {
          await loadSavedResumes(userName)
        }
      } else {
        throw new Error(result.error || 'Failed to save resume')
      }
    } catch (error) {
      console.error('Save error:', error)
      const errorMsg = error.message || 'Unknown error occurred'
      alert(`Error saving resume: ${errorMsg}\n\nPlease check:\n1. Backend server is running\n2. Database connection is working\n3. You have internet connection`)
    } finally {
      // Restore button state
      if (saveButton) {
        saveButton.disabled = false
        if (originalText) saveButton.textContent = originalText
      }
    }
  }

  const handleLoadResume = async (resume) => {
    try {
      const resumeData = typeof resume.resume_data === 'string' 
        ? JSON.parse(resume.resume_data) 
        : resume.resume_data
      
      setFormData(resumeData)
      setSelectedTemplate(resume.template_id || 1)
      setCurrentResumeId(resume.id)
      setStep(1)
      setShowSaveLoad(false)
      alert('Resume loaded successfully!')
    } catch (error) {
      alert('Error loading resume: ' + error.message)
    }
  }

  const handleDeleteResume = async (id) => {
    if (!confirm('Are you sure you want to delete this resume?')) return
    
    const result = await resumeAPI.deleteResume(userName, id)
    if (result.success) {
      alert('Resume deleted successfully!')
      loadSavedResumes(userName)
      if (currentResumeId === id) {
        setCurrentResumeId(null)
      }
    } else {
      alert('Error deleting resume: ' + result.error)
    }
  }

  const handleDuplicateResume = async (resume) => {
    try {
      const resumeData = typeof resume.resume_data === 'string' 
        ? JSON.parse(resume.resume_data) 
        : resume.resume_data
      
      const duplicateData = {
        ...resumeData,
        personalInfo: {
          ...resumeData.personalInfo,
          fullName: resumeData.personalInfo.fullName + ' (Copy)'
        }
      }

      const result = await resumeAPI.saveResume(userName, duplicateData, resume.template_id || 1)
      if (result.success) {
        alert('Resume duplicated successfully!')
        loadSavedResumes(userName)
      } else {
        alert('Error duplicating resume: ' + result.error)
      }
    } catch (error) {
      alert('Error duplicating resume: ' + error.message)
    }
  }

  const handleUseDemo = (demoData, demoTemplate) => {
    setFormData(demoData)
    setSelectedTemplate(demoTemplate)
    setStep(1)
    setShowDemoModal(false)
  }

  const handleUseExample = (exampleData, exampleTemplate) => {
    updateFormData(exampleData)
    setSelectedTemplate(exampleTemplate)
    setStep(1)
    setShowExamplesLibrary(false)
  }

  const handleViewResume = (resume) => {
    try {
      const resumeData = typeof resume.resume_data === 'string' 
        ? JSON.parse(resume.resume_data) 
        : resume.resume_data
      
      setFormData(resumeData)
      setSelectedTemplate(resume.template_id || 1)
      setStep(3) // Go directly to preview
      setShowSaveLoad(false)
    } catch (error) {
      alert('Error viewing resume: ' + error.message)
    }
  }

  const handleEditResume = (resume) => {
    try {
      const resumeData = typeof resume.resume_data === 'string' 
        ? JSON.parse(resume.resume_data) 
        : resume.resume_data
      
      setFormData(resumeData)
      setSelectedTemplate(resume.template_id || 1)
      setCurrentResumeId(resume.id)
      setStep(1) // Go to form to edit
      setShowSaveLoad(false)
    } catch (error) {
      alert('Error loading resume for editing: ' + error.message)
    }
  }

  const handleDownloadResume = async (resume) => {
    try {
      const resumeData = typeof resume.resume_data === 'string' 
        ? JSON.parse(resume.resume_data) 
        : resume.resume_data
      
      // Show preview first, then download
      setFormData(resumeData)
      setSelectedTemplate(resume.template_id || 1)
      setStep(3)
      setShowSaveLoad(false)
      
      // Wait for preview to render, then download
      setTimeout(() => {
        const { generatePDF } = require('./utils/pdfGenerator')
        const resumeElement = document.querySelector('.resume-wrapper')
        if (resumeElement) {
          generatePDF(resumeElement, resumeData.personalInfo?.fullName || 'resume')
        } else {
          alert('Please wait for preview to load, then click Download PDF button')
        }
      }, 1000)
    } catch (error) {
      alert('Error downloading resume: ' + error.message)
    }
  }

  const handleShareResume = (resume) => {
    setSelectedResumeForShare(resume)
    setShowShareModal(true)
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+S or Cmd+S - Save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        if (step === 2 || step === 3) {
          handleSaveResume()
        }
      }
      
      // Ctrl+D or Cmd+D - Download
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault()
        if (step === 3) {
          const resumeElement = document.querySelector('.resume-wrapper')
          if (resumeElement) {
            const { generatePDF } = require('./utils/pdfGenerator')
            generatePDF(resumeElement, formData.personalInfo?.fullName || 'resume')
          }
        }
      }
      
      // Ctrl+K or Cmd+K - ATS Checker
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setShowATSChecker(true)
      }
      
      // Ctrl+Z or Cmd+Z - Undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        if (step === 1) {
          handleUndo()
        }
      }
      
      // Ctrl+Y or Cmd+Y or Ctrl+Shift+Z - Redo
      if (((e.ctrlKey || e.metaKey) && e.key === 'y') || 
          ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z')) {
        e.preventDefault()
        if (step === 1) {
          handleRedo()
        }
      }
      
      // Escape - Close modals
      if (e.key === 'Escape') {
        if (showShareModal) setShowShareModal(false)
        if (showATSChecker) setShowATSChecker(false)
        if (showSaveLoad) setShowSaveLoad(false)
        if (showDemoModal) setShowDemoModal(false)
        if (showCoverLetter) setShowCoverLetter(false)
        if (showVersionHistory) setShowVersionHistory(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [step, formData, showShareModal, showATSChecker, showSaveLoad, showDemoModal, showCoverLetter, showVersionHistory, historyIndex, history])

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-top">
          <div className="header-title-section">
            <h1>📄 Resume Maker</h1>
            <p>Create Professional Resumes in Minutes</p>
          </div>
          <ThemeToggle />
        </div>
        <div className="header-actions">
          <button 
            onClick={() => setShowDemoModal(true)} 
            className="btn-demo"
          >
            📋 View Demo Resumes
          </button>
          <button 
            onClick={() => setShowExamplesLibrary(true)}
            className="btn-examples"
          >
            📚 Resume Examples
          </button>
          <button 
            onClick={async () => {
              if (!showSaveLoad) {
                // Opening the panel
                if (!userName) {
                  const name = prompt('Please enter your name/username to view saved resumes:')
                  if (!name || name.trim() === '') return
                  const trimmedName = name.trim()
                  setUserName(trimmedName)
                  localStorage.setItem('resumeUserName', trimmedName)
                  await loadSavedResumes(trimmedName)
                } else {
                  await loadSavedResumes(userName)
                }
              }
              setShowSaveLoad(!showSaveLoad)
            }} 
            className="btn-save-load"
            title="View and manage your saved resumes"
          >
            {showSaveLoad ? '✕ Close' : '💾 Saved Resumes'}
            {savedResumes.length > 0 && (
              <span className="resume-count-badge">{savedResumes.length}</span>
            )}
          </button>
          {step === 1 && (
            <>
              <button 
                onClick={() => setShowATSChecker(true)} 
                className="btn-ats"
                title="Check ATS Compatibility (Ctrl+K)"
              >
                ✅ ATS Check
              </button>
              <button 
                onClick={() => setShowCoverLetter(true)} 
                className="btn-cover-letter"
                title="Cover Letter Builder"
              >
                📝 Cover Letter
              </button>
              {/* Undo/Redo buttons */}
              <div className="undo-redo-group">
                <button 
                  onClick={handleUndo} 
                  className="btn-undo"
                  disabled={historyIndex <= 0}
                  title="Undo (Ctrl+Z)"
                >
                  ↶ Undo
                </button>
                <button 
                  onClick={handleRedo} 
                  className="btn-redo"
                  disabled={historyIndex >= history.length - 1}
                  title="Redo (Ctrl+Y)"
                >
                  ↷ Redo
                </button>
              </div>
            </>
          )}
          {step === 1 && formData.personalInfo.fullName && (
            <button onClick={handleSaveResume} className="btn-save" title="Save as Draft (Ctrl+S)">
              💾 Save Draft
            </button>
          )}
          {(step === 2 || step === 3) && (
            <button onClick={handleSaveResume} className="btn-save" title="Save Resume (Ctrl+S)">
              💾 Save Resume
            </button>
          )}
        </div>
      </header>

      <DemoResumeModal
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
        onUseDemo={handleUseDemo}
      />

      {showSaveLoad && (
        <SaveLoadPanel
          resumes={savedResumes}
          onLoad={handleLoadResume}
          onDelete={handleDeleteResume}
          onDuplicate={handleDuplicateResume}
          onView={handleViewResume}
          onEdit={handleEditResume}
          onDownload={handleDownloadResume}
          onShare={handleShareResume}
          onVersionHistory={(resume) => {
            setSelectedResumeForVersion(resume)
            setShowVersionHistory(true)
          }}
          onClose={() => setShowSaveLoad(false)}
          userName={userName}
        />
      )}

      {showShareModal && selectedResumeForShare && (
        <ResumeShareModal
          isOpen={showShareModal}
          onClose={() => {
            setShowShareModal(false)
            setSelectedResumeForShare(null)
          }}
          resume={selectedResumeForShare}
          userName={userName}
        />
      )}

      <ATSChecker
        isOpen={showATSChecker}
        onClose={() => setShowATSChecker(false)}
        formData={formData}
      />

      <CoverLetterBuilder
        isOpen={showCoverLetter}
        onClose={() => setShowCoverLetter(false)}
        resumeData={formData}
        onSave={async (coverLetter) => {
          setCoverLetterData(coverLetter)
          if (currentResumeId && userName) {
            await resumeAPI.updateResume(currentResumeId, userName, formData, selectedTemplate, coverLetter)
          }
        }}
        userName={userName}
        resumeId={currentResumeId}
      />

      {showVersionHistory && selectedResumeForVersion && (
        <ResumeVersionHistory
          isOpen={showVersionHistory}
          onClose={() => {
            setShowVersionHistory(false)
            setSelectedResumeForVersion(null)
          }}
          resume={selectedResumeForVersion}
          userName={userName}
          onRestore={(resumeData, templateId, coverLetterData) => {
            setFormData(resumeData)
            setSelectedTemplate(templateId)
            if (coverLetterData) {
              setCoverLetterData(coverLetterData)
            }
            setStep(1)
          }}
        />
      )}

      {showExamplesLibrary && (
        <ResumeExamplesLibrary
          onUseExample={handleUseExample}
          onClose={() => setShowExamplesLibrary(false)}
        />
      )}

      {/* Step Progress Indicator */}
      <div className="step-indicator">
        <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
          <div className="step-number">{step > 1 ? '✓' : '1'}</div>
          <div className="step-label">Fill Details</div>
        </div>
        <div className={`step-connector ${step >= 2 ? 'active' : ''}`}></div>
        <div className={`step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
          <div className="step-number">{step > 2 ? '✓' : '2'}</div>
          <div className="step-label">Choose Template</div>
        </div>
        <div className={`step-connector ${step >= 3 ? 'active' : ''}`}></div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>
          <div className="step-number">3</div>
          <div className="step-label">Preview & Download</div>
        </div>
      </div>

      <div className="app-container">
        {step === 1 && (
          <MultiStepForm 
            initialData={formData} 
            onSubmit={handleFormSubmit} 
          />
        )}

        {step === 2 && (
          <TemplateSelectorWith1000 
            selectedTemplate={selectedTemplate}
            colorTheme={colorTheme}
            onSelect={handleTemplateSelect}
            onThemeChange={setColorTheme}
            onBack={handleBack}
          />
        )}

        {step === 3 && (
          <ResumePreview
            data={formData}
            templateId={selectedTemplate}
            colorTheme={colorTheme}
            customColor={customColor}
            selectedFont={selectedFont}
            fontSize={fontSize}
            previewMode={previewMode}
            onBack={handleBack}
            onSave={handleSaveResume}
            coverLetterData={coverLetterData}
            userName={userName}
            resumeId={currentResumeId} 
            data={formData}
            templateId={selectedTemplate}
            colorTheme={colorTheme}
            onBack={handleBack}
            onSave={handleSaveResume}
          />
        )}
      </div>

      <footer className="app-footer">
        <p>Made with ❤️ by <a href="https://abhayvirus.onrender.com" target="_blank" rel="noopener noreferrer">Abhay Virus</a> - Create your perfect resume today!</p>
      </footer>
    </div>
  )
}

export default App

