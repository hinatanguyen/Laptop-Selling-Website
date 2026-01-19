import pkg from 'pg'
const { Pool } = pkg
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
  database: process.env.DB_NAME,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})

const STATUS_OPTIONS = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
const PAYMENT_METHODS = ['cash_on_delivery', 'credit_card']

function randomChoice(arr) { return arr[Math.floor(Math.random() * arr.length)] }
function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }

function randomName() {
  const first = ['Nguyen', 'Tran', 'Le', 'Pham', 'Hoang', 'Vu', 'Dang', 'Bui', 'Do', 'Vo']
  const last = ['An', 'Binh', 'Chi', 'Dung', 'Giang', 'Huy', 'Khanh', 'Linh', 'Minh', 'Phuc']
  return `${randomChoice(first)} ${randomChoice(last)}`
}
function randomEmail() {
  const providers = ['example.com', 'gmail.com', 'yahoo.com', 'outlook.com']
  const local = Math.random().toString(36).slice(2, 8)
  return `${local}@${randomChoice(providers)}`
}
function randomPhone() {
  return `0${randomInt(3,9)}${randomInt(10000000, 99999999)}`
}

function randomAddress() {
  const streets = ['Ly Thuong Kiet', 'Nguyen Hue', 'Le Loi', 'Pham Van Dong', 'Tran Hung Dao']
  const cities = ['Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Hue', 'Can Tho']
  return {
    address: `${randomInt(1, 999)} ${randomChoice(streets)}`,
    city: randomChoice(cities),
    postal_code: `${randomInt(100000, 999999)}`,
    country: 'Vietnam'
  }
}

async function seedOrders(count = 100) {
  const client = await pool.connect()
  try {
    console.log(`🧪 Seeding ${count} orders...`)

    // Load users (admin and any customers)
    const usersRes = await client.query('SELECT id, email, full_name, role FROM users ORDER BY id ASC')
    const users = usersRes.rows

    // Load products
    const productsRes = await client.query('SELECT id, price, name, image_url FROM products')
    const products = productsRes.rows
    if (products.length === 0) {
      throw new Error('No products found. Please run `npm run seed` first to insert products.')
    }

    let created = 0

    for (let i = 0; i < count; i++) {
      await client.query('BEGIN')
      try {
        const isGuest = Math.random() < 0.5 || users.length === 0
        const status = randomChoice(STATUS_OPTIONS)
        const paymentMethod = randomChoice(PAYMENT_METHODS)
        const shippingAddress = randomAddress()

        // Pick 1-3 items
        const itemsCount = randomInt(1, 3)
        const pickedProducts = []
        for (let k = 0; k < itemsCount; k++) {
          pickedProducts.push(randomChoice(products))
        }

        const items = pickedProducts.map(p => ({
          product_id: p.id,
          quantity: randomInt(1, 3),
          price: Number(p.price)
        }))
        const totalAmount = items.reduce((sum, it) => sum + it.price * it.quantity, 0)

        let orderRow
        if (isGuest) {
          const customer_name = randomName()
          const customer_email = randomEmail()
          const customer_phone = randomPhone()

          const orderRes = await client.query(
            `INSERT INTO orders (user_id, total_amount, status, payment_method, shipping_address, customer_email, customer_name, customer_phone)
             VALUES (NULL, $1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
            [totalAmount, status, paymentMethod, JSON.stringify(shippingAddress), customer_email, customer_name, customer_phone]
          )
          orderRow = orderRes.rows[0]
        } else {
          // choose a registered user (non-admin preferred)
          const registered = users.filter(u => u.role !== 'admin')
          const user = registered.length > 0 ? randomChoice(registered) : randomChoice(users)

          const orderRes = await client.query(
            `INSERT INTO orders (user_id, total_amount, status, payment_method, shipping_address)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [user.id, totalAmount, status, paymentMethod, JSON.stringify(shippingAddress)]
          )
          orderRow = orderRes.rows[0]
        }

        // Insert items
        for (const it of items) {
          const subtotal = it.price * it.quantity
          await client.query(
            `INSERT INTO order_items (order_id, product_id, quantity, price, subtotal)
             VALUES ($1, $2, $3, $4, $5)`,
            [orderRow.id, it.product_id, it.quantity, it.price, subtotal]
          )
        }

        await client.query('COMMIT')
        created++
        if (created % 10 === 0) console.log(`✅ Created ${created} orders...`)
      } catch (err) {
        await client.query('ROLLBACK')
        console.error('❌ Failed to create order:', err.message)
      }
    }

    console.log(`🎉 Completed: ${created}/${count} orders created.`)
  } catch (error) {
    console.error('❌ Seed orders error:', error)
  } finally {
    client.release()
    await pool.end()
  }
}

const countArg = process.argv[2] ? parseInt(process.argv[2], 10) : 100
seedOrders(Number.isFinite(countArg) ? countArg : 100)
