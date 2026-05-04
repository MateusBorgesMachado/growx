import { TweetService } from "../services/tweet.service"
import { Response } from "express"
import { AuthRequest } from "../middlewares/auth.middleware"
import httpResponse from "../utils/http.response"

export class TweetController {
    private tweetService = new TweetService()

    public create = async (req: AuthRequest, res: Response): Promise<Response> => {
        try {
            const { content } = req.body
            const userId = req.userId

            if (!content) {
                return httpResponse(res, 400, { message: 'Conteúdo é obrigatório.' })
            }

            if (!userId) {
                return httpResponse(res, 401, { message: 'Usuário não autenticado.' })
            }

            const createdTweet = await this.tweetService.create(content, userId)

            return httpResponse(res, 201, createdTweet)

        } catch (error: any) {
            console.error(error)
            return httpResponse(res, 500)
        }
    }

    public createReply = async (req: AuthRequest, res: Response): Promise<Response> => {
        try {
            const { content } = req.body
            const { tweetId } = req.params
            const userId = req.userId

            if (!content) {
                return httpResponse(res, 400, { message: 'Conteúdo é obrigatório.' })
            }

            if (!userId) {
                return httpResponse(res, 401, { message: 'Usuário não autenticado.' })
            }

            if(typeof tweetId !== 'string') return httpResponse(res, 401)

            const createdReply = await this.tweetService.createReply(content, userId, tweetId)

            return httpResponse(res, 201, createdReply)

        } catch (error: any) {
            if(error.message == 'Tweet not found') {
                return httpResponse(res, 400, {
                    message: 'Tweet não encontrado'
                })
            }
            return httpResponse(res, 500) 
        }
    }
}