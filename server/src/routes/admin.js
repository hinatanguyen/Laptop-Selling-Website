import express from 'express'
import { authenticateToken, isAdmin } from '../middleware/auth.js'
import { query } from '../config/database.js'

const router = express.Router()

// All admin routes require authentication and admin role
router.use(authenticateToken, isAdmin)

// Get dashboard stats
router.get('/dashboard', async (req, res, next) => {
  try {
    const stats = await query(`
      SELECT 
        (SELECT COUNT(*) FROM orders) as total_orders,
        (SELECT COUNT(*) FROM users) as total_users,
        (SELECT COUNT(*) FROM products) as total_products,
        (SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE status != 'cancelled') as total_revenue
    `)

    const recentOrders = await query(`
      SELECT o.*, u.email, u.full_name
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
      LIMIT 10
    `)

    res.json({
      stats: stats.rows[0],
      recentOrders: recentOrders.rows
    })
  } catch (error) {
    next(error)
  }
})

// Get all orders
router.get('/orders', async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query
    const offset = (page - 1) * limit

    let queryText = `
      SELECT o.*, u.email, u.full_name,
        json_agg(
          json_build_object(
            'product_name', p.name,
            'quantity', oi.quantity,
            'price', oi.price
          )
        ) as items
      FROM orders o
      JOIN users u ON o.user_id = u.id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
    `

    if (status) {
      queryText += ` WHERE o.status = '${status}'`
    }

    queryText += ` GROUP BY o.id, u.email, u.full_name ORDER BY o.created_at DESC LIMIT ${limit} OFFSET ${offset}`

    const result = await query(queryText)

    res.json(result.rows)
  } catch (error) {
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

export default router
