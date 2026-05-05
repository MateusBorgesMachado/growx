import { FollowService } from '../services/follow.service'
import type { AuthRequest } from '../middlewares/auth.middleware'
import type { Response } from 'express'
import httpResponse from '../utils/http.response'

export class FollowController {
    private followService = new FollowService()

    public follow = async(req: AuthRequest, res: Response): Promise<Response> => {
        try {
            const followerId = req.userId
            const { followingId } = req.params

            if (!followerId) return httpResponse(res, 400)

            if (typeof followingId !== 'string') return httpResponse(res, 400)

            const follow = await this.followService.followUser(followerId, followingId);
            return httpResponse(res, 201, follow)
        } catch (error: any) {
            if (error.message === 'User not found') {
                return httpResponse(res, 400, {
                    message: 'Usuário não encontrado'
                })
            }

            if (error.message === 'You cannot follow yourself') {
                return httpResponse(res, 400, {
                    message: 'Você não pode seguir a si mesmo'
                })
            }

            if (error.message === 'You are already following this user') {
                return httpResponse(res, 400, {
                    message: 'Você já está seguindo este usuário'
                })
            }

            return httpResponse(res, 500, error.message)
        }
    }

    public unfollow = async(req: AuthRequest, res: Response): Promise<Response> => {
        try {
            const followerId = req.userId;
            const { followingId } = req.params;

            if (!followerId) return httpResponse(res, 400)

            if (typeof followingId !== 'string') return httpResponse(res, 400)

            const unfollow = await this.followService.unfollowUser(followerId, followingId);
            return httpResponse(res, 200, unfollow)
        } catch (error: any) {
            if (error.message === 'User not found') {
                return httpResponse(res, 400, {
                    message: 'Usuário não encontrado'
                })
            }
            
            if (error.message = 'You are not following this user yet') {
                return httpResponse(res, 400, {
                    message: 'Você ainda não está seguindo este usuário'
                })
            }
            return httpResponse(res, 500)
        }
    }

}