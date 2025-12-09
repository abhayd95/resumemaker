import { resumeAPI } from './api'

/**
 * Track resume view
 */
export const trackResumeView = async (userName, resumeId) => {
  if (!userName || !resumeId) return
  
  try {
    await resumeAPI.trackView(userName, resumeId)
  } catch (error) {
    console.error('Failed to track view:', error)
  }
}

/**
 * Track resume download
 */
export const trackResumeDownload = async (userName, resumeId) => {
  if (!userName || !resumeId) return
  
  try {
    await resumeAPI.trackDownload(userName, resumeId)
  } catch (error) {
    console.error('Failed to track download:', error)
  }
}

/**
 * Get analytics for a resume
 */
export const getResumeAnalytics = async (userName, resumeId) => {
  if (!userName || !resumeId) return null
  
  try {
    const result = await resumeAPI.getAnalytics(userName, resumeId)
    if (result.success) {
      return result.analytics
    }
    return null
  } catch (error) {
    console.error('Failed to get analytics:', error)
    return null
  }
}

