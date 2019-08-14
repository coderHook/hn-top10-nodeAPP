import express from 'express'
import { titlesLast25Controller, inPostLastWeekController, inTitlesLast600HighKarma } from './../controllers/top10.controller'

const router = express.Router()

/**
 * Get the Top 10 words used in Titles of last 25 stories.
 */
router.get('/in-titles-last-25-Stories', titlesLast25Controller)

/**
 * Get the top 10 words in a Post of exactly a week Ago, if today is Monday from last Monday.
 */
router.get('/in-post-last-week', inPostLastWeekController)

/**
 * Get the top 10 words from titles from 600 stories of users with Karma > 10000
 */
router.get('/in-titles-high-karma', inTitlesLast600HighKarma)


router.get('/', (req, res) => {
  res.status(200).send({
    'Endpoint1': 'http://localhost:5000/top10/in-titles-last-25-Stories',
    'Endpoint2': 'http://localhost:5000/top10/in-titles-last-25-Stories',
    'Endpoint3': 'http://localhost:5000/top10/in-titles-high-karma',
  })
})

export default router