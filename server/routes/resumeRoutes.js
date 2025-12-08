import express from 'express'
import pool from '../config/db.js'

const router = express.Router()

// Get all resumes for a user
router.get('/:userName', async (req, res) => {
  try {
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
    const { userName, resumeData, templateId } = req.body

    if (!userName || !resumeData) {
      return res.status(400).json({ 
        success: false, 
        error: 'userName and resumeData are required' 
      })
    }

    const [result] = await pool.execute(
      'INSERT INTO resumes (user_name, resume_data, template_id) VALUES (?, ?, ?)',
      [userName, JSON.stringify(resumeData), templateId || 1]
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
    const { id } = req.params
    const { userName, resumeData, templateId } = req.body

    if (!userName || !resumeData) {
      return res.status(400).json({ 
        success: false, 
        error: 'userName and resumeData are required' 
      })
    }

    const [result] = await pool.execute(
      'UPDATE resumes SET resume_data = ?, template_id = ? WHERE id = ? AND user_name = ?',
      [JSON.stringify(resumeData), templateId || 1, id, userName]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Resume not found' })
    }

    res.json({ success: true, message: 'Resume updated successfully' })
  } catch (error) {
    console.error('Error updating resume:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Delete a resume
router.delete('/:userName/:id', async (req, res) => {
  try {
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

export default router

