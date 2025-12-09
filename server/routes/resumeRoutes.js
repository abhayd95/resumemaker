import express from 'express'
import { getPool } from '../config/db.js'

const router = express.Router()

// Get all resumes for a user
router.get('/:userName', async (req, res) => {
  try {
    const pool = await getPool()
    const { userName } = req.params
    const [rows] = await pool.execute(
      'SELECT * FROM resumes WHERE user_name = ? ORDER BY created_at DESC',
      [userName]
    )
    res.json({ success: true, resumes: rows })
  } catch (error) {
    console.error('Error fetching resumes:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Get a specific resume by ID
router.get('/:userName/:id', async (req, res) => {
  try {
    const pool = await getPool()
    const { userName, id } = req.params
    const [rows] = await pool.execute(
      'SELECT * FROM resumes WHERE id = ? AND user_name = ?',
      [id, userName]
    )
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Resume not found' })
    }
    res.json({ success: true, resume: rows[0] })
  } catch (error) {
    console.error('Error fetching resume:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Save a new resume
router.post('/save', async (req, res) => {
  try {
    const pool = await getPool()
    const { userName, resumeData, templateId, coverLetterData } = req.body

    if (!userName || !resumeData) {
      return res.status(400).json({ 
        success: false, 
        error: 'userName and resumeData are required' 
      })
    }

    const [result] = await pool.execute(
      'INSERT INTO resumes (user_name, resume_data, template_id, cover_letter_data) VALUES (?, ?, ?, ?)',
      [
        userName, 
        JSON.stringify(resumeData), 
        templateId || 1,
        coverLetterData ? JSON.stringify(coverLetterData) : null
      ]
    )

    res.json({ 
      success: true, 
      message: 'Resume saved successfully',
      id: result.insertId 
    })
  } catch (error) {
    console.error('Error saving resume:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Update an existing resume
router.put('/:id', async (req, res) => {
  try {
    const pool = await getPool()
    const { id } = req.params
    const { userName, resumeData, templateId, coverLetterData, createVersion } = req.body

    if (!userName || !resumeData) {
      return res.status(400).json({ 
        success: false, 
        error: 'userName and resumeData are required' 
      })
    }

    // Get current resume data for version comparison
    let shouldCreateVersion = createVersion !== false // Default to true
    if (shouldCreateVersion) {
      const [currentResume] = await pool.execute(
        'SELECT resume_data, template_id, cover_letter_data FROM resumes WHERE id = ? AND user_name = ?',
        [id, userName]
      )
      
      if (currentResume.length > 0) {
        const current = currentResume[0]
        const currentData = typeof current.resume_data === 'string' ? JSON.parse(current.resume_data) : current.resume_data
        const newDataStr = JSON.stringify(resumeData)
        const currentDataStr = JSON.stringify(currentData)
        
        // Only create version if data actually changed
        shouldCreateVersion = (
          currentDataStr !== newDataStr ||
          current.template_id !== (templateId || 1) ||
          JSON.stringify(coverLetterData || null) !== JSON.stringify(current.cover_letter_data ? (typeof current.cover_letter_data === 'string' ? JSON.parse(current.cover_letter_data) : current.cover_letter_data) : null)
        )
      }
    }

    // Create version before updating (if data changed)
    if (shouldCreateVersion) {
      try {
        const [versionRows] = await pool.execute(
          'SELECT MAX(version_number) as max_version FROM resume_versions WHERE resume_id = ?',
          [id]
        )
        const nextVersion = (versionRows[0]?.max_version || 0) + 1

        // Get current resume data for version
        const [currentResume] = await pool.execute(
          'SELECT resume_data, template_id, cover_letter_data FROM resumes WHERE id = ? AND user_name = ?',
          [id, userName]
        )

        if (currentResume.length > 0) {
          await pool.execute(
            'INSERT INTO resume_versions (resume_id, version_number, resume_data, template_id, cover_letter_data) VALUES (?, ?, ?, ?, ?)',
            [
              id,
              nextVersion,
              currentResume[0].resume_data,
              currentResume[0].template_id,
              currentResume[0].cover_letter_data
            ]
          )
        }
      } catch (versionError) {
        console.log('Note: Could not create version (might be first save):', versionError.message)
      }
    }

    const [result] = await pool.execute(
      'UPDATE resumes SET resume_data = ?, template_id = ?, cover_letter_data = ? WHERE id = ? AND user_name = ?',
      [
        JSON.stringify(resumeData), 
        templateId || 1, 
        coverLetterData ? JSON.stringify(coverLetterData) : null,
        id, 
        userName
      ]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Resume not found' })
    }

    res.json({ success: true, message: 'Resume updated successfully', versionCreated: shouldCreateVersion })
  } catch (error) {
    console.error('Error updating resume:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Delete a resume
router.delete('/:userName/:id', async (req, res) => {
  try {
    const pool = await getPool()
    const { userName, id } = req.params
    const [result] = await pool.execute(
      'DELETE FROM resumes WHERE id = ? AND user_name = ?',
      [id, userName]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Resume not found' })
    }

    res.json({ success: true, message: 'Resume deleted successfully' })
  } catch (error) {
    console.error('Error deleting resume:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Analytics endpoints
// Get analytics for a resume
router.get('/:userName/:id/analytics', async (req, res) => {
  try {
    const pool = await getPool()
    const { userName, id } = req.params
    const [rows] = await pool.execute(
      'SELECT view_count, download_count, last_viewed_at FROM resumes WHERE id = ? AND user_name = ?',
      [id, userName]
    )
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Resume not found' })
    }
    res.json({ success: true, analytics: rows[0] })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Track resume view
router.post('/:userName/:id/view', async (req, res) => {
  try {
    const pool = await getPool()
    const { userName, id } = req.params
    const [result] = await pool.execute(
      'UPDATE resumes SET view_count = view_count + 1, last_viewed_at = NOW() WHERE id = ? AND user_name = ?',
      [id, userName]
    )
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Resume not found' })
    }
    res.json({ success: true, message: 'View tracked' })
  } catch (error) {
    console.error('Error tracking view:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Track resume download
router.post('/:userName/:id/download', async (req, res) => {
  try {
    const pool = await getPool()
    const { userName, id } = req.params
    const [result] = await pool.execute(
      'UPDATE resumes SET download_count = download_count + 1 WHERE id = ? AND user_name = ?',
      [id, userName]
    )
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Resume not found' })
    }
    res.json({ success: true, message: 'Download tracked' })
  } catch (error) {
    console.error('Error tracking download:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Version management endpoints
// Get all versions for a resume
router.get('/:userName/:id/versions', async (req, res) => {
  try {
    const pool = await getPool()
    const { userName, id } = req.params
    
    // Verify resume belongs to user
    const [resumeCheck] = await pool.execute(
      'SELECT id FROM resumes WHERE id = ? AND user_name = ?',
      [id, userName]
    )
    if (resumeCheck.length === 0) {
      return res.status(404).json({ success: false, error: 'Resume not found' })
    }

    const [rows] = await pool.execute(
      'SELECT * FROM resume_versions WHERE resume_id = ? ORDER BY version_number DESC',
      [id]
    )
    res.json({ success: true, versions: rows })
  } catch (error) {
    console.error('Error fetching versions:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Create a new version
router.post('/:userName/:id/versions', async (req, res) => {
  try {
    const pool = await getPool()
    const { userName, id } = req.params
    const { resumeData, templateId, coverLetterData, versionNotes } = req.body

    // Verify resume belongs to user
    const [resumeCheck] = await pool.execute(
      'SELECT id FROM resumes WHERE id = ? AND user_name = ?',
      [id, userName]
    )
    if (resumeCheck.length === 0) {
      return res.status(404).json({ success: false, error: 'Resume not found' })
    }

    // Get next version number
    const [versionRows] = await pool.execute(
      'SELECT MAX(version_number) as max_version FROM resume_versions WHERE resume_id = ?',
      [id]
    )
    const nextVersion = (versionRows[0]?.max_version || 0) + 1

    const [result] = await pool.execute(
      'INSERT INTO resume_versions (resume_id, version_number, resume_data, template_id, cover_letter_data, version_notes) VALUES (?, ?, ?, ?, ?, ?)',
      [
        id,
        nextVersion,
        JSON.stringify(resumeData),
        templateId || 1,
        coverLetterData ? JSON.stringify(coverLetterData) : null,
        versionNotes || null
      ]
    )

    res.json({
      success: true,
      message: 'Version created successfully',
      versionId: result.insertId,
      versionNumber: nextVersion
    })
  } catch (error) {
    console.error('Error creating version:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Restore a version
router.post('/:userName/:id/restore/:versionId', async (req, res) => {
  try {
    const pool = await getPool()
    const { userName, id, versionId } = req.params

    // Verify resume belongs to user
    const [resumeCheck] = await pool.execute(
      'SELECT id FROM resumes WHERE id = ? AND user_name = ?',
      [id, userName]
    )
    if (resumeCheck.length === 0) {
      return res.status(404).json({ success: false, error: 'Resume not found' })
    }

    // Get version data
    const [versionRows] = await pool.execute(
      'SELECT * FROM resume_versions WHERE id = ? AND resume_id = ?',
      [versionId, id]
    )
    if (versionRows.length === 0) {
      return res.status(404).json({ success: false, error: 'Version not found' })
    }

    const version = versionRows[0]

    // Update resume with version data
    await pool.execute(
      'UPDATE resumes SET resume_data = ?, template_id = ?, cover_letter_data = ? WHERE id = ? AND user_name = ?',
      [
        version.resume_data,
        version.template_id,
        version.cover_letter_data,
        id,
        userName
      ]
    )

    res.json({
      success: true,
      message: 'Version restored successfully',
      resumeData: typeof version.resume_data === 'string' ? JSON.parse(version.resume_data) : version.resume_data,
      templateId: version.template_id,
      coverLetterData: version.cover_letter_data ? (typeof version.cover_letter_data === 'string' ? JSON.parse(version.cover_letter_data) : version.cover_letter_data) : null
    })
  } catch (error) {
    console.error('Error restoring version:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

export default router

