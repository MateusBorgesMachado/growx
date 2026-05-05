import { Router } from 'express'
import { FollowController } from '../controllers/follow.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const followRoutes = Router()
const followController = new FollowController()

followRoutes.post('/:followingId/follow', authMiddleware, followController.follow)

followRoutes.delete('/:followingId/unfollow', authMiddleware, followController.unfollow)

export { followRoutes }