import cron from 'node-cron'
import { getPool } from '../config/db.js'

// Cron Jobs Configuration
const cronJobs = {
  // Cleanup old resumes (runs daily at 2 AM)
  cleanupOldResumes: cron.schedule('0 2 * * *', async () => {
    try {
      const pool = await getPool()
      const connection = await pool.getConnection()
      
      // Delete resumes older than 90 days that haven't been updated
      const [result] = await connection.query(`
        DELETE FROM resumes 
        WHERE DATEDIFF(NOW(), updated_at) > 90
        AND DATEDIFF(NOW(), created_at) > 90
      `)
      
      connection.release()
      console.log(`🧹 Cleanup: Deleted ${result.affectedRows} old resumes`)
    } catch (error) {
      console.error('❌ Error in cleanupOldResumes cron job:', error.message)
    }
  }, {
    scheduled: false,
    timezone: "Asia/Kolkata"
  }),

  // Database optimization (runs weekly on Sunday at 3 AM)
  optimizeDatabase: cron.schedule('0 3 * * 0', async () => {
    try {
      const pool = await getPool()
      const connection = await pool.getConnection()
      
      // Optimize tables
      await connection.query('OPTIMIZE TABLE resumes')
      
      connection.release()
      console.log('✅ Database optimization completed')
    } catch (error) {
      console.error('❌ Error in optimizeDatabase cron job:', error.message)
    }
  }, {
    scheduled: false,
    timezone: "Asia/Kolkata"
  }),

  // Daily statistics (runs daily at 1 AM)
  dailyStats: cron.schedule('0 1 * * *', async () => {
    try {
      const pool = await getPool()
      const connection = await pool.getConnection()
      
      // Get statistics
      const [totalResumes] = await connection.query(`
        SELECT COUNT(*) as total FROM resumes
      `)
      
      const [todayResumes] = await connection.query(`
        SELECT COUNT(*) as today FROM resumes 
        WHERE DATE(created_at) = CURDATE()
      `)
      
      const [activeUsers] = await connection.query(`
        SELECT COUNT(DISTINCT user_name) as users FROM resumes
      `)
      
      connection.release()
      
      console.log('📊 Daily Statistics:', {
        totalResumes: totalResumes[0].total,
        todayResumes: todayResumes[0].today,
        activeUsers: activeUsers[0].users,
        date: new Date().toISOString()
      })
    } catch (error) {
      console.error('❌ Error in dailyStats cron job:', error.message)
    }
  }, {
    scheduled: false,
    timezone: "Asia/Kolkata"
  }),

  // Cleanup duplicate resumes (runs weekly on Monday at 4 AM)
  cleanupDuplicates: cron.schedule('0 4 * * 1', async () => {
    try {
      const pool = await getPool()
      const connection = await pool.getConnection()
      
      // Find and delete duplicate resumes (same user_name and resume_data, keep the latest)
      const [result] = await connection.query(`
        DELETE r1 FROM resumes r1
        INNER JOIN resumes r2 
        WHERE r1.id < r2.id 
        AND r1.user_name = r2.user_name 
        AND r1.resume_data = r2.resume_data
      `)
      
      connection.release()
      console.log(`🔄 Cleanup: Removed ${result.affectedRows} duplicate resumes`)
    } catch (error) {
      console.error('❌ Error in cleanupDuplicates cron job:', error.message)
    }
  }, {
    scheduled: false,
    timezone: "Asia/Kolkata"
  }),

  // Health check (runs every hour)
  healthCheck: cron.schedule('0 * * * *', async () => {
    try {
      const pool = await getPool()
      const connection = await pool.getConnection()
      
      // Simple health check query
      await connection.query('SELECT 1')
      
      connection.release()
      console.log('💚 Health check: Database connection healthy')
    } catch (error) {
      console.error('❌ Health check failed:', error.message)
    }
  }, {
    scheduled: false,
    timezone: "Asia/Kolkata"
  })
}

// Function to start all cron jobs
export function startCronJobs() {
  console.log('⏰ Starting cron jobs...')
  
  Object.keys(cronJobs).forEach(jobName => {
    cronJobs[jobName].start()
    console.log(`✅ Started cron job: ${jobName}`)
  })
  
  console.log('🎯 All cron jobs are active')
}

// Function to stop all cron jobs
export function stopCronJobs() {
  console.log('⏸️ Stopping cron jobs...')
  
  Object.keys(cronJobs).forEach(jobName => {
    cronJobs[jobName].stop()
    console.log(`⏹️ Stopped cron job: ${jobName}`)
  })
  
  console.log('🛑 All cron jobs stopped')
}

// Function to get cron job status
export function getCronJobStatus() {
  const status = {}
  
  Object.keys(cronJobs).forEach(jobName => {
    status[jobName] = {
      running: cronJobs[jobName].getStatus() === 'scheduled',
      lastRun: cronJobs[jobName].lastExecution || 'Never'
    }
  })
  
  return status
}

export default cronJobs

