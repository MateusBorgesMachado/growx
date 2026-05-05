import { Router } from 'express'
import { LikeController } from '../controllers/like.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const likeRoutes = Router()
const likeController = new LikeController()

likeRoutes.post('/:tweetId/like', authMiddleware, likeController.toggleLike);
likeRoutes.delete('/:tweetId/unlike', authMiddleware, likeController.toggleLike);

export { likeRoutes}