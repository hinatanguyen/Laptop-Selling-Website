import dotenv from 'dotenv'
import { query } from '../config/database.js'

dotenv.config()

async function run() {
  console.log('🔧 Creating contact_messages table...')
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);
      CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
    `)

    console.log('✅ contact_messages created')
  } catch (err) {
    console.error('❌ Failed to create contact_messages:', err)
    process.exitCode = 1
  }
}

run()
