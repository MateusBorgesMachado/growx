import { Router } from "express"
import { LikeController } from "../controllers/like.controller"
import { authMiddleware } from "../middlewares/auth.middleware"

const likeRouter = Router()
const likeController = new LikeController()

likeRouter.post('/tweets/:tweetId/like', authMiddleware, likeController.toggleLike);
likeRouter.delete('/tweets/:tweetId/like', authMiddleware, likeController.toggleLike);
