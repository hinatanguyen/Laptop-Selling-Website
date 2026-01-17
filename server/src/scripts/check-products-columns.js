import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.join(__dirname, '../../.env') })

const { query } = await import('../config/database.js')

const res = await query(`
  SELECT column_name, data_type
  FROM information_schema.columns
  WHERE table_name = 'products'
  ORDER BY ordinal_position
`)

console.log(res.rows)
process.exit(0)
