import express from 'express'
import { titlesLast25Controller, inPostLastWeekController } from './../controllers/top10.controller'

const router = express.Router()

/**
 * Get the Top 10 words used in Titles of last 25 stories.
 */
router.get('/in-titles-last-25-Stories', titlesLast25Controller)

/**
 * Get the top 10 words in a Post of exactly a week Ago, if today is Monday from last Monday.
 */
router.get('/in-post-last-week', inPostLastWeekController)

export default router