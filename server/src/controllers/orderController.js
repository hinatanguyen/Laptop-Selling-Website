import { query } from '../config/database.js'

// Create order
export const createOrder = async (req, res, next) => {
  const client = await query('BEGIN')
  
  try {
    const { items, shipping_address, payment_method } = req.body
    const userId = req.user.userId

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' })
    }

    // Calculate total
    let totalAmount = 0
    for (const item of items) {
      const product = await query('SELECT price, stock FROM products WHERE id = $1', [item.productId])
      
      if (product.rows.length === 0) {
        throw new Error(`Product ${item.productId} not found`)
      }
      
      if (product.rows[0].stock < item.quantity) {
        throw new Error(`Insufficient stock for product ${item.productId}`)
      }
      
      totalAmount += product.rows[0].price * item.quantity
    }

    // Create order
    const orderResult = await query(
      `INSERT INTO orders (user_id, total_amount, status, payment_method, shipping_address)
       VALUES ($1, $2, 'pending', $3, $4)
       RETURNING *`,
      [userId, totalAmount, payment_method, shipping_address]
    )

    const order = orderResult.rows[0]

    // Create order items and update stock
    for (const item of items) {
      const product = await query('SELECT price FROM products WHERE id = $1', [item.productId])
      const price = product.rows[0].price
      const subtotal = price * item.quantity

      await query(
        `INSERT INTO order_items (order_id, product_id, quantity, price, subtotal)
         VALUES ($1, $2, $3, $4, $5)`,
        [order.id, item.productId, item.quantity, price, subtotal]
      )

      await query(
        'UPDATE products SET stock = stock - $1 WHERE id = $2',
        [item.quantity, item.productId]
      )
    }

    await query('COMMIT')

    res.status(201).json(order)
  } catch (error) {
    await query('ROLLBACK')
    next(error)
  }
}

// Get user orders
export const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.user.userId

    const result = await query(
      `SELECT o.*, 
        json_agg(
          json_build_object(
            'id', oi.id,
            'product_id', oi.product_id,
            'quantity', oi.quantity,
            'price', oi.price,
            'subtotal', oi.subtotal,
            'product_name', p.name,
            'product_image', p.image_url
          )
        ) as items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       LEFT JOIN products p ON oi.product_id = p.id
       WHERE o.user_id = $1
       GROUP BY o.id
       ORDER BY o.created_at DESC`,
      [userId]
    )

    res.json(result.rows)
  } catch (error) {
    next(error)
  }
}

// Get order by ID
export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user.userId

    const result = await query(
      `SELECT o.*, 
        json_agg(
          json_build_object(
            'id', oi.id,
            'product_id', oi.product_id,
            'quantity', oi.quantity,
            'price', oi.price,
            'subtotal', oi.subtotal,
            'product_name', p.name,
            'product_image', p.image_url
          )
        ) as items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       LEFT JOIN products p ON oi.product_id = p.id
       WHERE o.id = $1 AND o.user_id = $2
       GROUP BY o.id`,
      [id, userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    next(error)
  }
}

// Cancel order
export const cancelOrder = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user.userId

    const result = await query(
      `UPDATE orders 
       SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP
       WHERE id = $1 AND user_id = $2 AND status = 'pending'
       RETURNING *`,
      [id, userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found or cannot be cancelled' })
    }

    // Restore stock
    const items = await query('SELECT product_id, quantity FROM order_items WHERE order_id = $1', [id])
    for (const item of items.rows) {
      await query(
        'UPDATE products SET stock = stock + $1 WHERE id = $2',
        [item.quantity, item.product_id]
      )
    }

    res.json(result.rows[0])
  } catch (error) {
    next(error)
  }
}
