import { LikeService } from '../services/like.service';
import { AuthRequest } from '../middlewares/auth.middleware'
import { Response } from 'express';
import httpResponse from '../utils/http.response';

export class LikeController {
    private likeService = new LikeService();

    public toggleLike = async (req: AuthRequest, res: Response): Promise<Response> => {
        try {
            const { tweetId } = req.params
            const userId = req.userId

            if(!userId) return httpResponse(res, 400, {
                message: 'Usuário não autenticado'
            })

            if(!tweetId || typeof tweetId !== 'string') return httpResponse(res, 400)

            const result = await this.likeService.toggleLike(userId, tweetId)

            const status = result ? 201 : 200

            return httpResponse(res, status)
        } catch (error: any) {
            if(error.message = 'Tweet not found'){
                return httpResponse(res, 400)
            }
            return httpResponse(res, 500)
        }
    }
}