import express from 'express'
import {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder
} from '../controllers/orderController.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// All routes require authentication
router.use(authenticateToken)

router.post('/', createOrder)
router.get('/', getUserOrders)
router.get('/:id', getOrderById)
router.patch('/:id/cancel', cancelOrder)

export default router
