import express from 'express'
import { titlesLast25Controller } from './../controllers/top10.controller'

const router = express.Router()

/**
 * Get the Top 10 words used in Titles of last 25 stories.
 */
router.get('/in-titles-last-25-Stories', titlesLast25Controller)

export default router