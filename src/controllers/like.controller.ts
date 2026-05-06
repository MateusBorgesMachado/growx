import { LikeService } from '../services/like.service'
import type { AuthRequest } from '../middlewares/auth.middleware'
import type { Response } from 'express'
import httpResponse from '../utils/http.response'

export class LikeController {
    private likeService = new LikeService()

    public like = async (req: AuthRequest, res: Response): Promise<Response> => {
        try {
            const { tweetId } = req.params
            const userId = req.userId

            if(!userId) return httpResponse(res, 400, {
                message: 'Usuário não autenticado'
            })

            if(!tweetId || typeof tweetId !== 'string') return httpResponse(res, 400)

            await this.likeService.like(userId, tweetId)

            return httpResponse(res, 201)
        } catch (error: any) {
            if(error.message = 'Tweet not found'){
                return httpResponse(res, 404)
            }
            if(error.message = 'Like already exists'){
                return httpResponse(res, 400)
            }
            return httpResponse(res, 500)
        }
    }

    public unlike = async (req: AuthRequest, res: Response): Promise<Response> => {
        try {
            const { tweetId } = req.params
            const userId = req.userId

            if(!userId) return httpResponse(res, 400, {
                message: 'Usuário não autenticado'
            })

            if(!tweetId || typeof tweetId !== 'string') return httpResponse(res, 400)

            await this.likeService.unlike(userId, tweetId)

            return httpResponse(res, 201)
        } catch (error: any) {
            if(error.message = 'Tweet not found'){
                return httpResponse(res, 404)
            }
            if(error.message = 'Like does not exist'){
                return httpResponse(res, 400)
            }
            return httpResponse(res, 500)
        }
    }
}