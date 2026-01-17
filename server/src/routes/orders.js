import express from 'express'
import {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder
} from '../controllers/orderController.js'
import { authenticateToken, optionalAuth } from '../middleware/auth.js'

const router = express.Router()

// Create order allows guest checkout (optional auth)
router.post('/', optionalAuth, createOrder)

// Other routes require authentication
router.use(authenticateToken)
router.get('/', getUserOrders)
router.get('/:id', getOrderById)
router.patch('/:id/cancel', cancelOrder)

export default router
