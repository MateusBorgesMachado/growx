import type { Response } from 'express'
import type { AuthRequest } from '../middlewares/auth.middleware'
import httpResponse from '../utils/http.response'
import { AuthService } from '../services/auth.service'

export class AuthController {
    private authService = new AuthService()

    public login = async (req: AuthRequest, res: Response): Promise<Response> => {
        try {
            const { email, password } = req.body

            if (!email || !password) {
                return httpResponse(res, 400, { message: 'Email and password are required' })
            }

            const token = await this.authService.login(email, password)


            return httpResponse(res, 200, { token })

        } catch (error: any) {

            if (error.message === 'Invalid credentials') {

                return httpResponse(res, 401, {
                    email: req.body,
                    password: req.body,
                    mensagem: error.message
                })
            }
            console.error(error)
            return httpResponse(res, 500)
        }
    }
}