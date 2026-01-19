import express from 'express'
import { register, login, getProfile, updateProfile, adminLogin } from '../controllers/authController.js'
import { authenticateToken } from '../middleware/auth.js'
import { validateRegister, validateLogin } from '../middleware/validation.js'

const router = express.Router()

// Disable public registration and login
// router.post('/register', validateRegister, register)
// router.post('/login', validateLogin, login)
// Admin-only login
router.post('/admin/login', validateLogin, adminLogin)
router.get('/profile', authenticateToken, getProfile)
router.put('/profile', authenticateToken, updateProfile)

export default router
