import pkg from 'pg'
const { Pool } = pkg
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') })

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
})

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seed...')

    // Drop existing tables
    await pool.query('DROP TABLE IF EXISTS order_items CASCADE')
    await pool.query('DROP TABLE IF EXISTS orders CASCADE')
    await pool.query('DROP TABLE IF EXISTS products CASCADE')
    await pool.query('DROP TABLE IF EXISTS users CASCADE')
    console.log('✅ Dropped existing tables')

    // Create users table
    await pool.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        address TEXT,
        role VARCHAR(20) DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ Created users table')

    // Create products table
    await pool.query(`
      CREATE TABLE products (
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
    console.log('✅ Created products table')

    // Create orders table (supports guest checkout)
    await pool.query(`
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        total_amount DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        payment_method VARCHAR(50),
        shipping_address TEXT,
        customer_email VARCHAR(255),
        customer_name VARCHAR(255),
        customer_phone VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ Created orders table')

    // Create order_items table
    await pool.query(`
      CREATE TABLE order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
        quantity INTEGER NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        subtotal DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ Created order_items table')

    // Hash passwords
    const adminPassword = await bcrypt.hash('admin123', 10)
    const customerPassword = await bcrypt.hash('admin123', 10)

    // Insert sample users
    await pool.query(`
      INSERT INTO users (email, password_hash, full_name, phone, role) VALUES
      ($1, $2, 'Admin User', '123-456-7890', 'admin'),
      ($3, $4, 'John Doe', '098-765-4321', 'customer')
    `, ['admin@laptopstore.com', adminPassword, 'customer@example.com', customerPassword])
    console.log('✅ Inserted sample users')

    // Insert sample products
    const products = [
      {
        name: 'Dell XPS 13',
        brand: 'Dell',
        category: 'Ultrabook',
        processor: 'Intel Core i7-1185G7',
        price: 1299.99,
        stock: 15,
        image_url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500',
        specs: JSON.stringify({
          screen: '13.4" FHD+',
          ram: '16GB LPDDR4x',
          storage: '512GB SSD',
          graphics: 'Intel Iris Xe',
          battery: '52WHr',
          weight: '2.64 lbs'
        }),
        description: 'Compact and powerful ultrabook for professionals',
        featured: true
      },
      {
        name: 'MacBook Pro 14"',
        brand: 'Apple',
        category: 'Professional',
        processor: 'Apple M3 Pro',
        price: 1999.99,
        stock: 10,
        image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
        specs: JSON.stringify({
          screen: '14.2" Liquid Retina XDR',
          ram: '18GB Unified Memory',
          storage: '512GB SSD',
          graphics: 'Apple M3 Pro GPU',
          battery: '70WHr',
          weight: '3.5 lbs'
        }),
        description: 'Professional laptop with M3 Pro chip',
        featured: true
      },
      {
        name: 'Lenovo ThinkPad X1 Carbon',
        brand: 'Lenovo',
        category: 'Business',
        processor: 'Intel Core i7-1165G7',
        price: 1499.99,
        stock: 20,
        image_url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500',
        specs: JSON.stringify({
          screen: '14" WUXGA',
          ram: '16GB LPDDR4x',
          storage: '512GB SSD',
          graphics: 'Intel Iris Xe',
          battery: '57WHr',
          weight: '2.49 lbs'
        }),
        description: 'Business laptop with military-grade durability',
        featured: false
      },
      {
        name: 'HP Spectre x360',
        brand: 'HP',
        category: '2-in-1',
        processor: 'Intel Core i7-1255U',
        price: 1399.99,
        stock: 12,
        image_url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
        specs: JSON.stringify({
          screen: '13.5" 3K2K Touch',
          ram: '16GB DDR4',
          storage: '512GB SSD',
          graphics: 'Intel Iris Xe',
          battery: '66WHr',
          weight: '3.01 lbs'
        }),
        description: 'Versatile 2-in-1 convertible laptop',
        featured: false
      },
      {
        name: 'ASUS ROG Zephyrus G14',
        brand: 'ASUS',
        category: 'Gaming',
        processor: 'AMD Ryzen 9 6900HS',
        price: 1849.99,
        stock: 8,
        image_url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500',
        specs: JSON.stringify({
          screen: '14" QHD 120Hz',
          ram: '16GB DDR5',
          storage: '1TB SSD',
          graphics: 'NVIDIA RTX 3060',
          battery: '76WHr',
          weight: '3.64 lbs'
        }),
        description: 'Compact gaming laptop with powerful performance',
        featured: true
      },
      {
        name: 'Microsoft Surface Laptop 5',
        brand: 'Microsoft',
        category: 'Ultrabook',
        processor: 'Intel Core i7-1255U',
        price: 1299.99,
        stock: 18,
        image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500',
        specs: JSON.stringify({
          screen: '13.5" PixelSense',
          ram: '16GB LPDDR5x',
          storage: '512GB SSD',
          graphics: 'Intel Iris Xe',
          battery: '47.4WHr',
          weight: '2.8 lbs'
        }),
        description: 'Sleek and elegant laptop with touchscreen',
        featured: false
      },
      {
        name: 'Acer Predator Helios 300',
        brand: 'Acer',
        category: 'Gaming',
        processor: 'Intel Core i7-12700H',
        price: 1599.99,
        stock: 10,
        image_url: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500',
        specs: JSON.stringify({
          screen: '15.6" FHD 144Hz',
          ram: '16GB DDR5',
          storage: '512GB SSD',
          graphics: 'NVIDIA RTX 3060',
          battery: '90WHr',
          weight: '5.51 lbs'
        }),
        description: 'High-performance gaming laptop',
        featured: false
      },
      {
        name: 'Razer Blade 15',
        brand: 'Razer',
        category: 'Gaming',
        processor: 'Intel Core i7-12800H',
        price: 2499.99,
        stock: 6,
        image_url: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500',
        specs: JSON.stringify({
          screen: '15.6" QHD 240Hz',
          ram: '16GB DDR5',
          storage: '1TB SSD',
          graphics: 'NVIDIA RTX 3070 Ti',
          battery: '80WHr',
          weight: '4.4 lbs'
        }),
        description: 'Premium gaming laptop with sleek design',
        featured: true
      },
      // Additional products
      {
        name: 'Dell XPS 15',
        brand: 'Dell',
        category: 'Professional',
        processor: 'Intel Core i7-12700H',
        price: 1799.99,
        stock: 14,
        image_url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
        specs: JSON.stringify({
          screen: '15.6" 4K OLED',
          ram: '32GB DDR5',
          storage: '1TB SSD',
          graphics: 'NVIDIA RTX 3050 Ti',
          battery: '86WHr',
          weight: '4.22 lbs'
        }),
        description: 'High-end content creation laptop',
        featured: false
      },
      {
        name: 'MacBook Air M2',
        brand: 'Apple',
        category: 'Ultrabook',
        processor: 'Apple M2',
        price: 1199.99,
        stock: 25,
        image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
        specs: JSON.stringify({
          screen: '13.6" Liquid Retina',
          ram: '8GB Unified Memory',
          storage: '256GB SSD',
          graphics: 'Apple M2 GPU',
          battery: '52.6WHr',
          weight: '2.7 lbs'
        }),
        description: 'Ultra-thin laptop with M2 chip',
        featured: true
      },
      {
        name: 'ASUS ZenBook 14',
        brand: 'ASUS',
        category: 'Ultrabook',
        processor: 'AMD Ryzen 7 5800H',
        price: 899.99,
        stock: 22,
        image_url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500',
        specs: JSON.stringify({
          screen: '14" FHD',
          ram: '16GB DDR4',
          storage: '512GB SSD',
          graphics: 'AMD Radeon Graphics',
          battery: '63WHr',
          weight: '2.87 lbs'
        }),
        description: 'Affordable ultrabook with AMD power',
        featured: false
      },
      {
        name: 'HP Pavilion Gaming 15',
        brand: 'HP',
        category: 'Gaming',
        processor: 'Intel Core i5-12500H',
        price: 999.99,
        stock: 16,
        image_url: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500',
        specs: JSON.stringify({
          screen: '15.6" FHD 144Hz',
          ram: '8GB DDR4',
          storage: '512GB SSD',
          graphics: 'NVIDIA GTX 1650',
          battery: '52.5WHr',
          weight: '5.08 lbs'
        }),
        description: 'Budget-friendly gaming laptop',
        featured: false
      },
      {
        name: 'Lenovo Legion 5 Pro',
        brand: 'Lenovo',
        category: 'Gaming',
        processor: 'AMD Ryzen 7 5800H',
        price: 1399.99,
        stock: 11,
        image_url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500',
        specs: JSON.stringify({
          screen: '16" QHD 165Hz',
          ram: '16GB DDR4',
          storage: '512GB SSD',
          graphics: 'NVIDIA RTX 3060',
          battery: '80WHr',
          weight: '5.4 lbs'
        }),
        description: 'Powerful gaming laptop with large screen',
        featured: false
      },
      {
        name: 'Surface Pro 9',
        brand: 'Microsoft',
        category: '2-in-1',
        processor: 'Intel Core i7-1255U',
        price: 1599.99,
        stock: 13,
        image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500',
        specs: JSON.stringify({
          screen: '13" PixelSense Flow',
          ram: '16GB LPDDR5',
          storage: '256GB SSD',
          graphics: 'Intel Iris Xe',
          battery: '47.36WHr',
          weight: '1.94 lbs'
        }),
        description: '2-in-1 tablet laptop hybrid',
        featured: true
      },
      {
        name: 'Alienware x14',
        brand: 'Dell',
        category: 'Gaming',
        processor: 'Intel Core i7-12700H',
        price: 2199.99,
        stock: 7,
        image_url: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500',
        specs: JSON.stringify({
          screen: '14" FHD 144Hz',
          ram: '16GB DDR5',
          storage: '512GB SSD',
          graphics: 'NVIDIA RTX 3060',
          battery: '87WHr',
          weight: '4.06 lbs'
        }),
        description: 'Compact gaming powerhouse',
        featured: false
      }
    ]

    for (const product of products) {
      await pool.query(
        `INSERT INTO products (name, brand, category, processor, price, stock, image_url, specs, description, featured)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
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
    console.log('✅ Inserted sample products')

    console.log('🎉 Database seeded successfully!')
    console.log('\n📝 Sample credentials:')
    console.log('  Admin: admin@laptopstore.com / admin123')
    console.log('  Customer: customer@example.com / admin123')

  } catch (error) {
    console.error('❌ Error seeding database:', error)
  } finally {
    await pool.end()
  }
}

seedDatabase()
