import { query } from '../config/database.js'
import pool from '../config/database.js'
import notificationService from '../services/notificationService.js'

// Create order (Guest checkout allowed)
export const createOrder = async (req, res, next) => {
  const client = await pool.connect()
  
  try {
    await client.query('BEGIN')
    
    const { items, shipping_address, payment_method, customer_info } = req.body
    
    // Force guest checkout if customer_info is provided, even if user is logged in
    const isGuestCheckout = customer_info && customer_info.email && customer_info.full_name
    const userId = !isGuestCheckout && req.user ? req.user.userId : null

    console.log('🛍️ Order creation:', { 
      isGuestCheckout, 
      hasUser: !!req.user, 
      customerInfo: customer_info ? customer_info.full_name : 'none' 
    })

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' })
    }

    // For guest checkout, require customer_info
    if (!userId && !isGuestCheckout) {
      return res.status(400).json({ message: 'Customer information required for guest checkout' })
    }

    // Validate products and calculate total
    let totalAmount = 0
    for (const item of items) {
      const product = await client.query('SELECT price, stock, name FROM products WHERE id = $1', [item.productId])
      
      if (product.rows.length === 0) {
        throw new Error(`Product with ID ${item.productId} not found. Please refresh your cart and try again.`)
      }
      
      if (product.rows[0].stock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.rows[0].name}. Available: ${product.rows[0].stock}, Requested: ${item.quantity}`)
      }
      
      totalAmount += product.rows[0].price * item.quantity
    }

    // Create order with customer info
    let orderResult
    if (!isGuestCheckout && userId) {
      // Registered user order
      console.log('🛍️ Creating registered user order')
      orderResult = await client.query(
        `INSERT INTO orders (user_id, total_amount, status, payment_method, shipping_address)
         VALUES ($1, $2, 'pending', $3, $4)
         RETURNING *`,
        [userId, totalAmount, payment_method, JSON.stringify(shipping_address)]
      )
    } else {
      // Guest order - store customer info in the order
      console.log('🛍️ Creating guest order with customer_info:', customer_info)
      orderResult = await client.query(
        `INSERT INTO orders (user_id, total_amount, status, payment_method, shipping_address, customer_email, customer_name, customer_phone)
         VALUES (NULL, $1, 'pending', $2, $3, $4, $5, $6)
         RETURNING *`,
        [totalAmount, payment_method, JSON.stringify(shipping_address), customer_info.email, customer_info.full_name, customer_info.phone]
      )
      console.log('🛍️ Guest order created:', orderResult.rows[0])
    }

    const order = orderResult.rows[0]

    // Create order items and update stock
    for (const item of items) {
      const product = await client.query('SELECT price FROM products WHERE id = $1', [item.productId])
      const price = product.rows[0].price
      const subtotal = price * item.quantity

      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price, subtotal)
         VALUES ($1, $2, $3, $4, $5)`,
        [order.id, item.productId, item.quantity, price, subtotal]
      )

      await client.query(
        'UPDATE products SET stock = stock - $1 WHERE id = $2',
        [item.quantity, item.productId]
      )
    }

    await client.query('COMMIT')

    // Get customer details for notification
    let customerName, customerEmail
    if (!isGuestCheckout && userId) {
      const userResult = await client.query('SELECT full_name, email FROM users WHERE id = $1', [userId])
      const user = userResult.rows[0]
      customerName = user.full_name
      customerEmail = user.email
    } else {
      customerName = customer_info.full_name
      customerEmail = customer_info.email
    }

    // Send real-time notification to admins
    notificationService.notifyNewOrder({
      id: order.id,
      customer_name: customerName,
      customer_email: customerEmail,
      total_amount: order.total_amount,
      items_count: items.length,
      created_at: order.created_at
    })

    res.status(201).json(order)
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('Order creation error:', error)
    next(error)
  } finally {
    client.release()
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
