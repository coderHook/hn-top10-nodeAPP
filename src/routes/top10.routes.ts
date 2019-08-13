import express, {Request, Response, NextFunction} from 'express'
import superagent from 'superagent'

const router = express.Router()

/**
 * Get the Top 10 words used in Titles of last 25 stories.
 */
router.get('/in-titles-last-25-Stories', (req, res, next) => {
  console.log('/in-titles-last-25-Stories')
  res.send('Hello World')
})


export default router