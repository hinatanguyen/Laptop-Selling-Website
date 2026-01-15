import express from 'express'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Simple cart stored in request - in production use database
router.get('/', authenticateToken, (req, res) => {
  // Cart is managed on frontend with localStorage/Zustand
  res.json({ message: 'Cart managed on client side' })
})

export default router
