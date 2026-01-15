import express from 'express'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import { authenticateToken, isAdmin } from '../middleware/auth.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/uploads'))
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'))
    }
  }
})

// Upload single image
router.post('/single', authenticateToken, isAdmin, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    const imageUrl = `/uploads/${req.file.filename}`
    res.json({
      message: 'Image uploaded successfully',
      imageUrl,
      filename: req.file.filename
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Upload multiple images
router.post('/multiple', authenticateToken, isAdmin, upload.array('images', 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' })
    }

    const imageUrls = req.files.map(file => `/uploads/${file.filename}`)
    res.json({
      message: 'Images uploaded successfully',
      imageUrls,
      count: req.files.length
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
