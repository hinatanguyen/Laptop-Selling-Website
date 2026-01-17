import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.join(__dirname, '../../.env') })

async function migrate() {
  try {
    console.log('🔧 Adding images column to products (if missing)...')
    // Import db after env is loaded
    const { query } = await import('../config/database.js')
    await query('ALTER TABLE products ADD COLUMN IF NOT EXISTS images JSONB')
    console.log('✅ Migration complete: images column ensured')
    process.exit(0)
  } catch (err) {
    console.error('❌ Migration failed:', err.message)
    process.exit(1)
  }
}

migrate()
