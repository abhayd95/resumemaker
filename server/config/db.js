import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

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
  database: process.env.DB_NAME || 'resumemaker'
}

// Create initial connection pool (without database)
const initialPool = mysql.createPool(initialConfig)

// Function to ensure database exists
async function ensureDatabase() {
  try {
    const connection = await initialPool.getConnection()
    const dbName = process.env.DB_NAME || 'resumemaker'
    
    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``)
    console.log(`✅ Database '${dbName}' ensured`)
    
    connection.release()
    
    // Now create pool with database
    const pool = mysql.createPool(dbConfig)
    
    // Test connection with database
    const testConnection = await pool.getConnection()
    console.log('✅ Connected to MySQL database')
    testConnection.release()
    
    return pool
  } catch (error) {
    console.error('❌ Error ensuring database:', error.message)
    // Return pool anyway (might work if database already exists)
    return mysql.createPool(dbConfig)
  }
}

// Create and export pool
const pool = await ensureDatabase()

export default pool

