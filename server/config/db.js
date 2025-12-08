import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const dbName = process.env.DB_NAME || 'resumemaker'

// Initial connection without database (to create database if needed)
const initialConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'abhayd95',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}

// Config with database (after database is created)
const dbConfig = {
  ...initialConfig,
  database: dbName
}

// Create initial connection pool (without database) for creating database
const initialPool = mysql.createPool(initialConfig)

// Function to ensure database exists
async function ensureDatabase() {
  try {
    const connection = await initialPool.getConnection()
    
    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``)
    console.log(`✅ Database '${dbName}' ensured`)
    
    connection.release()
    
    // Now create pool with database
    const pool = mysql.createPool(dbConfig)
    
    // Test connection with database
    const testConnection = await pool.getConnection()
    console.log(`✅ Connected to MySQL database '${dbName}'`)
    testConnection.release()
    
    return pool
  } catch (error) {
    console.error('❌ Error ensuring database:', error.message)
    // Try to create pool anyway (database might already exist)
    try {
      const pool = mysql.createPool(dbConfig)
      const testConnection = await pool.getConnection()
      console.log(`✅ Connected to MySQL database '${dbName}'`)
      testConnection.release()
      return pool
    } catch (err) {
      console.error('❌ Failed to connect to database:', err.message)
      throw err
    }
  }
}

// Create pool (will be initialized in server/index.js)
let pool = null

// Initialize pool function
export async function initializePool() {
  if (!pool) {
    pool = await ensureDatabase()
  }
  return pool
}

// Get pool (will be initialized on first use)
export async function getPool() {
  if (!pool) {
    pool = await ensureDatabase()
  }
  return pool
}

// Export default pool (will be set after initialization)
export default new Proxy({}, {
  get: async (target, prop) => {
    const actualPool = await getPool()
    return actualPool[prop]
  }
})

