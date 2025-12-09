import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import resumeRoutes from './routes/resumeRoutes.js'
import { initializePool, getPool } from './config/db.js'
import { startCronJobs, getCronJobStatus } from './jobs/cronJobs.js'

dotenv.config()

const __filename = fileURLToPath(
    import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API Routes
app.use('/api/resumes', resumeRoutes)

// Health check endpoint
app.get('/api/health', async(req, res) => {
    try {
        const pool = await getPool()
        await pool.getConnection()
        const cronStatus = getCronJobStatus()
        res.json({
            success: true,
            message: 'Server is running and database is connected',
            timestamp: new Date().toISOString(),
            cronJobs: cronStatus
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Database connection failed',
            error: error.message
        })
    }
})

// Cron jobs status endpoint
app.get('/api/cron/status', (req, res) => {
    try {
        const status = getCronJobStatus()
        res.json({
            success: true,
            cronJobs: status,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
})

// Serve static files from React app
app.use(express.static(path.join(__dirname, '../dist')))

// Catch all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
    // Don't serve index.html for API routes
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'API route not found' })
    }
    res.sendFile(path.join(__dirname, '../dist/index.html'))
})

// Initialize database tables
async function initializeDatabase() {
    try {
        const pool = await getPool()
        const connection = await pool.getConnection()

        // Create resumes table (database already exists from db.js)
        await connection.query(`
      CREATE TABLE IF NOT EXISTS resumes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_name VARCHAR(255) NOT NULL,
        resume_data JSON NOT NULL,
        template_id INT DEFAULT 1,
        cover_letter_data JSON,
        view_count INT DEFAULT 0,
        download_count INT DEFAULT 0,
        last_viewed_at TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_user_name (user_name),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)

        // Add analytics columns if they don't exist (migration)
        try {
            await connection.query(`
                ALTER TABLE resumes 
                ADD COLUMN IF NOT EXISTS view_count INT DEFAULT 0,
                ADD COLUMN IF NOT EXISTS download_count INT DEFAULT 0,
                ADD COLUMN IF NOT EXISTS last_viewed_at TIMESTAMP NULL,
                ADD COLUMN IF NOT EXISTS cover_letter_data JSON
            `)
        } catch (migrationError) {
            // Columns might already exist, that's okay
            if (!migrationError.message.includes('Duplicate column name')) {
                console.log('Migration note:', migrationError.message)
            }
        }

        // Create versions table for resume versioning
        await connection.query(`
      CREATE TABLE IF NOT EXISTS resume_versions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        resume_id INT NOT NULL,
        version_number INT NOT NULL,
        resume_data JSON NOT NULL,
        template_id INT DEFAULT 1,
        cover_letter_data JSON,
        version_notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE,
        INDEX idx_resume_id (resume_id),
        INDEX idx_version_number (resume_id, version_number),
        UNIQUE KEY unique_resume_version (resume_id, version_number)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)

        connection.release()
        console.log('✅ Database tables initialized')
    } catch (error) {
        console.error('❌ Error initializing database:', error.message)
        console.error('Full error:', error)
    }
}

// Start server
app.listen(PORT, async() => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
        // Initialize database connection and tables
    await initializePool()
    await initializeDatabase()

    // Start cron jobs
    if (process.env.ENABLE_CRON_JOBS !== 'false') {
        startCronJobs()
    } else {
        console.log('⏸️ Cron jobs disabled (ENABLE_CRON_JOBS=false)')
    }
})

export default app