import express from 'express'
import {
  getAllProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts
} from '../controllers/productController.js'
import { authenticateToken, isAdmin } from '../middleware/auth.js'

const router = express.Router()

// Public routes
router.get('/', getAllProducts)
router.get('/search', searchProducts)
router.get('/slug/:slug', getProductBySlug)
router.get('/:id', getProductById)

// Admin routes
router.post('/', authenticateToken, isAdmin, createProduct)
router.put('/:id', authenticateToken, isAdmin, updateProduct)
router.delete('/:id', authenticateToken, isAdmin, deleteProduct)

export default router
