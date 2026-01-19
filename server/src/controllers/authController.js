import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { query } from '../config/database.js'

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  })
}

// Register
export const register = async (req, res, next) => {
  try {
    const { email, password, full_name, phone } = req.body

    // Check if user exists
    const existingUser = await query('SELECT id FROM users WHERE email = $1', [email])
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const result = await query(
      'INSERT INTO users (email, password_hash, full_name, phone) VALUES ($1, $2, $3, $4) RETURNING id, email, full_name, phone, created_at',
      [email, hashedPassword, full_name, phone]
    )

    const user = result.rows[0]
    const token = generateToken(user.id)

    res.status(201).json({
      user,
      token
    })
  } catch (error) {
    next(error)
  }
}

// Login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Find user
    const result = await query(
      'SELECT id, email, password_hash, full_name, phone, role FROM users WHERE email = $1',
      [email]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const user = result.rows[0]

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = generateToken(user.id)

    res.json({
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        phone: user.phone,
        role: user.role
      },
      token
    })
  } catch (error) {
    next(error)
  }
}

// Admin-only Login
export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const result = await query(
      'SELECT id, email, password_hash, full_name, phone, role FROM users WHERE email = $1',
      [email]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const user = result.rows[0]

    // Only allow admin role
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access only' })
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = generateToken(user.id)

    res.json({
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        phone: user.phone,
        role: user.role
      },
      token
    })
  } catch (error) {
    next(error)
  }
}

// Get profile
export const getProfile = async (req, res, next) => {
  try {
    const result = await query(
      'SELECT id, email, full_name, phone, address, role, created_at FROM users WHERE id = $1',
      [req.user.userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    next(error)
  }
}

// Update profile
export const updateProfile = async (req, res, next) => {
  try {
    const { full_name, phone, address } = req.body

    const result = await query(
      `UPDATE users 
       SET full_name = $1, phone = $2, address = $3, updated_at = CURRENT_TIMESTAMP
       WHERE id = $4
       RETURNING id, email, full_name, phone, address`,
      [full_name, phone, address, req.user.userId]
    )

    res.json(result.rows[0])
  } catch (error) {
    next(error)
  }
}
