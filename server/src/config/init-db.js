import pkg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pkg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 
    `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})

const initDatabase = async () => {
  const client = await pool.connect()
  
  try {
    console.log('🔄 Starting database initialization...')

    // Create tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        address TEXT,
        role VARCHAR(20) DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        brand VARCHAR(100) NOT NULL,
        category VARCHAR(100) NOT NULL,
        processor VARCHAR(100),
        price DECIMAL(10, 2) NOT NULL,
        stock INTEGER NOT NULL DEFAULT 0,
        image_url TEXT,
        specs JSONB,
        description TEXT,
        featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        total_amount DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        payment_method VARCHAR(50),
        shipping_address TEXT,
        tracking_number VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id),
        quantity INTEGER NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        subtotal DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
      CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
      CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
      CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
      CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
    `)

    console.log('✅ Database tables created successfully')

    // Insert sample products
    const sampleProducts = [
      {
        name: 'Dell XPS 15',
        brand: 'Dell',
        category: 'Laptop',
        processor: 'Intel Core i7-12700H',
        price: 1599.99,
        stock: 15,
        image_url: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89',
        specs: JSON.stringify({
          ram: '16GB DDR5',
          storage: '512GB SSD',
          display: '15.6" FHD',
          graphics: 'NVIDIA RTX 3050'
        }),
        description: 'Powerful laptop for professionals',
        featured: true
      },
      {
        name: 'MacBook Pro 14',
        brand: 'Apple',
        category: 'Laptop',
        processor: 'Apple M2 Pro',
        price: 1999.99,
        stock: 10,
        image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
        specs: JSON.stringify({
          ram: '16GB',
          storage: '512GB SSD',
          display: '14" Retina',
          graphics: 'Integrated'
        }),
        description: 'Premium MacBook for creative professionals',
        featured: true
      },
      {
        name: 'ASUS ROG Strix G15',
        brand: 'ASUS',
        category: 'Laptop',
        processor: 'AMD Ryzen 9 5900HX',
        price: 1299.99,
        stock: 8,
        image_url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302',
        specs: JSON.stringify({
          ram: '16GB DDR4',
          storage: '1TB SSD',
          display: '15.6" FHD 144Hz',
          graphics: 'NVIDIA RTX 3060'
        }),
        description: 'Gaming laptop with high refresh rate display',
        featured: false
      },
      {
        name: 'HP Pavilion 15',
        brand: 'HP',
        category: 'Laptop',
        processor: 'Intel Core i5-11300H',
        price: 799.99,
        stock: 20,
        image_url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
        specs: JSON.stringify({
          ram: '8GB DDR4',
          storage: '256GB SSD',
          display: '15.6" FHD',
          graphics: 'Intel Iris Xe'
        }),
        description: 'Affordable laptop for everyday use',
        featured: false
      }
    ]

    for (const product of sampleProducts) {
      await client.query(
        `INSERT INTO products (name, brand, category, processor, price, stock, image_url, specs, description, featured)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT DO NOTHING`,
        [
          product.name,
          product.brand,
          product.category,
          product.processor,
          product.price,
          product.stock,
          product.image_url,
          product.specs,
          product.description,
          product.featured
        ]
      )
    }

    console.log('✅ Sample products inserted')

    // Create admin user (password: admin123)
    await client.query(`
      INSERT INTO users (email, password_hash, full_name, role)
      VALUES ('admin@laptop-store.com', '$2b$10$YourHashedPasswordHere', 'Admin User', 'admin')
      ON CONFLICT (email) DO NOTHING
    `)

    console.log('✅ Admin user created')
    console.log('🎉 Database initialization complete!')
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    throw error
  } finally {
    client.release()
    await pool.end()
  }
}

initDatabase().catch(console.error)
