import { Router } from "express"
import { TweetController } from "../controllers/tweet.controller"
import { authMiddleware } from "../middlewares/auth.middleware"

const tweetRouter = Router()
const tweetController = new TweetController()

tweetRouter.post('/', authMiddleware, tweetController.create)
tweetRouter.post('/reply/:tweetId', authMiddleware, tweetController.createReply)