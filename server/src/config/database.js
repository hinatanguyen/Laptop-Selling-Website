import pkg from 'pg'
import dotenv from 'dotenv'
dotenv.config()
const { Pool } = pkg

// Prefer DATABASE_URL when available; fallback to individual DB_* vars
const useConnectionString = Boolean(process.env.DATABASE_URL)

const pool = new Pool(
  useConnectionString
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
      }
    : {
        user: process.env.DB_USER,
        password: String(process.env.DB_PASSWORD),
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432', 10),
        database: process.env.DB_NAME,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
      }
)

pool.on('error', (err) => {
  console.error('Unexpected database error:', err)
  console.error('DB config:', {
    usingDatabaseUrl: useConnectionString,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
  })
})

export const query = (text, params) => pool.query(text, params)

export default pool
