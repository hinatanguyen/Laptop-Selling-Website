import express from 'express'
import { getShopReviews } from '../controllers/reviewController.js'

const router = express.Router()

router.get('/', getShopReviews)

export default router
