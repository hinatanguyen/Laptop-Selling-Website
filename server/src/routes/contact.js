import express from 'express'
import { body } from 'express-validator'
import { validate } from '../middleware/validation.js'
import { submitContactMessage } from '../controllers/contactController.js'

const router = express.Router()

router.post(
  '/',
  [
    body('name')
      .isString()
      .isLength({ min: 2 })
      .withMessage('Name must be at least 2 characters'),
    body('email')
      .isEmail()
      .withMessage('Valid email required'),
    body('subject')
      .isString()
      .isLength({ min: 2 })
      .withMessage('Subject must be at least 2 characters'),
    body('message')
      .isString()
      .isLength({ min: 10 })
      .withMessage('Message must be at least 10 characters')
  ],
  validate,
  submitContactMessage
)

export default router
