import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'abhayd95',
  database: process.env.DB_NAME || 'resumemaker',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}

// Create connection pool
const pool = mysql.createPool(dbConfig)

// Test connection
pool.getConnection()
  .then(connection => {
    console.log('✅ Connected to MySQL database')
    connection.release()
  })
  .catch(err => {
    console.error('❌ Database connection error:', err.message)
  })

export default pool

