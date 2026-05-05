import { Router } from 'express'
import { TweetController } from '../controllers/tweet.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const tweetRoutes = Router()
const tweetController = new TweetController()

tweetRoutes.post('/', authMiddleware, tweetController.create)
tweetRoutes.post('/reply/:tweetId', authMiddleware, tweetController.createReply)

export { tweetRoutes }