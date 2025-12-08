import { useState, useEffect } from 'react'
import MultiStepForm from './components/MultiStepForm'
import TemplateSelector from './components/TemplateSelector'
import ResumePreview from './components/ResumePreview'
import SaveLoadPanel from './components/SaveLoadPanel'
import DemoResumeModal from './components/DemoResumeModal'
import { resumeAPI } from './utils/api'
import './styles/App.css'
import './styles/MultiStepForm.css'

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
    certifications: []
  })

  const [selectedTemplate, setSelectedTemplate] = useState(1)
  const [colorTheme, setColorTheme] = useState('blue')
  const [step, setStep] = useState(1) // 1: Form, 2: Template, 3: Preview
  const [userName, setUserName] = useState('')
  const [savedResumes, setSavedResumes] = useState([])
  const [showSaveLoad, setShowSaveLoad] = useState(false)
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [currentResumeId, setCurrentResumeId] = useState(null)

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

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('resumeDraft')
    if (savedDraft && !formData.personalInfo.fullName) {
      try {
        const draft = JSON.parse(savedDraft)
        if (draft.isDraft) {
          if (confirm('Found a saved draft. Would you like to load it?')) {
            setFormData(draft)
          }
        }
      } catch (e) {
        console.error('Error loading draft:', e)
      }
    }
  }, [])

  const loadSavedResumes = async (name) => {
    const result = await resumeAPI.getAllResumes(name)
    if (result.success) {
      setSavedResumes(result.resumes)
    }
  }

  const handleFormSubmit = (data) => {
    setFormData(data)
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
      if (!name) return
      setUserName(name)
      localStorage.setItem('resumeUserName', name)
    }

    const result = currentResumeId
      ? await resumeAPI.updateResume(currentResumeId, userName, formData, selectedTemplate)
      : await resumeAPI.saveResume(userName, formData, selectedTemplate)

    if (result.success) {
      alert('Resume saved successfully!')
      setCurrentResumeId(result.id || currentResumeId)
      loadSavedResumes(userName)
    } else {
      alert('Error saving resume: ' + result.error)
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

  return (
    <div className="app">
      <header className="app-header">
        <h1>📄 Resume Maker</h1>
        <p>Create Professional Resumes in Minutes</p>
        <div className="header-actions">
          <button 
            onClick={() => setShowDemoModal(true)} 
            className="btn-demo"
          >
            📋 View Demo Resumes
          </button>
          <button 
            onClick={() => setShowSaveLoad(!showSaveLoad)} 
            className="btn-save-load"
          >
            {showSaveLoad ? '✕ Close' : '💾 Saved Resumes'}
          </button>
          {(step === 2 || step === 3) && (
            <button onClick={handleSaveResume} className="btn-save">
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

      {showSaveLoad && userName && (
        <SaveLoadPanel
          resumes={savedResumes}
          onLoad={handleLoadResume}
          onDelete={handleDeleteResume}
          onDuplicate={handleDuplicateResume}
          onClose={() => setShowSaveLoad(false)}
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
          <TemplateSelector 
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

