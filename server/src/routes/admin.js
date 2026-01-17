import express from 'express'
import { authenticateToken, isAdmin } from '../middleware/auth.js'
import { query } from '../config/database.js'

const router = express.Router()

// All admin routes require authentication and admin role
router.use(authenticateToken, isAdmin)

// Get dashboard stats
router.get('/dashboard', async (req, res, next) => {
  try {
    console.log('📊 Admin dashboard requested by user:', req.user.userId)
    
    const stats = await query(`
      SELECT 
        (SELECT COUNT(*) FROM orders) as total_orders,
        (SELECT COUNT(*) FROM users) as total_users,
        (SELECT COUNT(*) FROM products) as total_products,
        (SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE status != 'cancelled') as total_revenue
    `)

    console.log('📊 Stats query result:', stats.rows[0])

    const recentOrders = await query(`
      SELECT 
        o.*,
        CASE 
          WHEN o.customer_email IS NOT NULL THEN o.customer_email 
          ELSE COALESCE(u.email, 'Unknown')
        END as email,
        CASE 
          WHEN o.customer_name IS NOT NULL THEN o.customer_name 
          ELSE COALESCE(u.full_name, 'Unknown User')
        END as full_name,
        CASE 
          WHEN o.customer_email IS NOT NULL THEN 'Guest' 
          ELSE 'Registered' 
        END as customer_type
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
      LIMIT 10
    `)

    console.log('📊 Recent orders count:', recentOrders.rows.length)

    res.json({
      stats: stats.rows[0],
      recentOrders: recentOrders.rows
    })
  } catch (error) {
    console.error('❌ Admin dashboard error:', error)
    next(error)
  }
})

// Get all orders
router.get('/orders', async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query
    const offset = (page - 1) * limit

    console.log('📋 Admin orders requested with filters:', { status, page, limit })

    let queryText = `
      SELECT 
        o.*,
        CASE 
          WHEN o.customer_email IS NOT NULL THEN o.customer_email 
          ELSE COALESCE(u.email, 'Unknown')
        END as email,
        CASE 
          WHEN o.customer_name IS NOT NULL THEN o.customer_name 
          ELSE COALESCE(u.full_name, 'Unknown User')
        END as full_name,
        CASE 
          WHEN o.customer_email IS NOT NULL THEN 'Guest' 
          ELSE 'Registered' 
        END as customer_type,
        COALESCE(
          json_agg(
            CASE WHEN oi.id IS NOT NULL THEN
              json_build_object(
                'product_name', p.name,
                'quantity', oi.quantity,
                'price', oi.price
              )
            END
          ) FILTER (WHERE oi.id IS NOT NULL),
          '[]'::json
        ) as items
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
    `

    const params = []
    if (status) {
      queryText += ` WHERE o.status = $1`
      params.push(status)
    }

    queryText += ` GROUP BY o.id, u.id, u.email, u.full_name ORDER BY o.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`
    params.push(limit, offset)

    console.log('📋 Executing query:', queryText)
    console.log('📋 With parameters:', params)

    const result = await query(queryText, params)
    
    console.log('📋 Orders found:', result.rows.length)

    res.json(result.rows)
  } catch (error) {
    console.error('❌ Admin orders error:', error)
    next(error)
  }
})

// Update order status
router.patch('/orders/:id/status', async (req, res, next) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const result = await query(
      'UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    next(error)
  }
})

// Get all users
router.get('/users', async (req, res, next) => {
  try {
    const result = await query(`
      SELECT id, email, full_name, phone, role, created_at
      FROM users
      ORDER BY created_at DESC
    `)

    res.json(result.rows)
  } catch (error) {
    next(error)
  }
})

// Get single order details (Admin can view any order)
router.get('/orders/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    // Get order with customer info
    const orderResult = await query(`
      SELECT 
        o.*,
        CASE 
          WHEN o.customer_email IS NOT NULL THEN o.customer_email 
          ELSE COALESCE(u.email, 'Unknown')
        END as email,
        CASE 
          WHEN o.customer_name IS NOT NULL THEN o.customer_name 
          ELSE COALESCE(u.full_name, 'Unknown User')
        END as full_name,
        CASE 
          WHEN o.customer_email IS NOT NULL THEN 'Guest' 
          ELSE 'Registered' 
        END as customer_type,
        COALESCE(o.customer_phone, u.phone) as phone
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      WHERE o.id = $1
    `, [id])

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' })
    }

    // Get order items
    const itemsResult = await query(`
      SELECT 
        oi.*,
        p.name as product_name,
        p.image_url as product_image,
        p.price as current_price
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = $1
    `, [id])

    const order = orderResult.rows[0]
    order.items = itemsResult.rows

    res.json(order)
  } catch (error) {
    next(error)
  }
})

export default router
