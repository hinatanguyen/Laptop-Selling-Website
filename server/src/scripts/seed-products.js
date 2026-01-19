import dotenv from 'dotenv'
import { query } from '../config/database.js'
import dummyProducts from './dummy-products.js'

dotenv.config()

async function seedProductsOnly() {
  try {
    console.log('🌱 Seeding products only (no users/orders)...')

    // Ensure table exists with expected columns
    await query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        brand VARCHAR(100) NOT NULL,
        category VARCHAR(100) NOT NULL,
        processor VARCHAR(255),
        price DECIMAL(10, 2) NOT NULL,
        stock INTEGER DEFAULT 0,
        image_url TEXT,
        images JSONB,
        specs JSONB,
        description TEXT,
        featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Clear existing products
    await query('TRUNCATE TABLE products RESTART IDENTITY')

    // Insert dummy products
    for (const p of dummyProducts) {
      await query(
        `INSERT INTO products (name, brand, category, processor, price, stock, image_url, specs, description, featured)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          p.name,
          p.brand,
          p.category,
          p.processor,
          p.price,
          p.stock,
          p.image_url,
          JSON.stringify(p.specs),
          p.description,
          p.featured,
        ]
      )
    }

    console.log('✅ Products seeded successfully')
    process.exit(0)
  } catch (err) {
    console.error('❌ Failed to seed products:', err)
    process.exit(1)
  }
}

seedProductsOnly()
