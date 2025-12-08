// Dynamic API URL - works for both local and production
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:3001/api' 
    : '/api')

export const resumeAPI = {
  // Get all resumes for a user
  getAllResumes: async (userName) => {
    try {
      const response = await fetch(`${API_BASE_URL}/resumes/${userName}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching resumes:', error)
      return { success: false, error: error.message }
    }
  },

  // Get a specific resume by ID
  getResume: async (userName, id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/resumes/${userName}/${id}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching resume:', error)
      return { success: false, error: error.message }
    }
  },

  // Save a new resume
  saveResume: async (userName, resumeData, templateId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/resumes/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          resumeData,
          templateId,
        }),
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error saving resume:', error)
      return { success: false, error: error.message }
    }
  },

  // Update an existing resume
  updateResume: async (id, userName, resumeData, templateId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/resumes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          resumeData,
          templateId,
        }),
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error updating resume:', error)
      return { success: false, error: error.message }
    }
  },

  // Delete a resume
  deleteResume: async (userName, id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/resumes/${userName}/${id}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error deleting resume:', error)
      return { success: false, error: error.message }
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error checking health:', error)
      return { success: false, error: error.message }
    }
  },
}

