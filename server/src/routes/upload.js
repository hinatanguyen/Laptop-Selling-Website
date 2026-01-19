import express from 'express'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import { authenticateToken, isAdmin } from '../middleware/auth.js'
import { uploadBufferToAzure } from '../services/azureStorage.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

// Choose storage: Azure (memory) or local disk
const useAzure = String(process.env.UPLOAD_PROVIDER || '').toLowerCase() === 'azure'
const storage = useAzure
  ? multer.memoryStorage()
  : multer.diskStorage({
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
router.post('/single', authenticateToken, isAdmin, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }
    if (useAzure) {
      const { buffer, originalname, mimetype } = req.file
      const container = process.env.AZURE_STORAGE_CONTAINER || 'product-images'
      const result = await uploadBufferToAzure(container, buffer, originalname, mimetype)
      return res.json({ message: 'Image uploaded successfully', imageUrl: result.url, filename: result.filename })
    } else {
      const imageUrl = `/uploads/${req.file.filename}`
      return res.json({ message: 'Image uploaded successfully', imageUrl, filename: req.file.filename })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Upload multiple images
router.post('/multiple', authenticateToken, isAdmin, upload.array('images', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' })
    }
    if (useAzure) {
      const container = process.env.AZURE_STORAGE_CONTAINER || 'product-images'
      const uploads = await Promise.all(
        req.files.map(f => uploadBufferToAzure(container, f.buffer, f.originalname, f.mimetype))
      )
      const imageUrls = uploads.map(u => u.url)
      return res.json({ message: 'Images uploaded successfully', imageUrls, count: uploads.length })
    } else {
      const imageUrls = req.files.map(file => `/uploads/${file.filename}`)
      return res.json({ message: 'Images uploaded successfully', imageUrls, count: req.files.length })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
