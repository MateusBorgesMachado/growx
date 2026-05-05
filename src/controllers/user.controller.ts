import { UserService } from '../services/user.service'
import httpResponse from '../utils/http.response'
import { Response } from 'express'
import { AuthRequest } from '../middlewares/auth.middleware'

export class UserController {
    private userService = new UserService()

    public create = async (req: AuthRequest, res: Response): Promise<Response> => {
        try {
            const {
                name,
                email,
                username,
                password,
                imageUrl
            } = req.body

            if (!name || !password) {
                return httpResponse(res, 400, {
                    success: false,
                    message: 'O nome e a senha são necessários para concluir o cadastro'
                })
            }

            if (!username && !email) {
                return httpResponse(res, 400, {
                    success: false,
                    message: 'Um username ou um email é necessário para concluir o cadastro'
                })
            }

            const newUser = await this.userService.create({ name, email, username, password, imageUrl })

            return httpResponse(res, 201, newUser)
        } catch (error: any) {
            if (error.message === 'email already exists') {
                return httpResponse(res, 409, {
                    email: req.body.email,
                    mensagem: 'Email em uso'
                })
            }

            if (error.message === 'username already exists') {
                return httpResponse(res, 409, {
                    username: req.body.username,
                    mensagem: 'Username em uso'
                })
            }
            console.error(error)
            return httpResponse(res, 500)
        }
    }

    public list = async (req: AuthRequest, res: Response): Promise<Response> => {
        try {
            const users = await this.userService.list()

            return httpResponse(res, 200, users)
        } catch (error: any) {
            console.error(error)
            return httpResponse(res, 500)
        }
    }

    public getById = async (req: AuthRequest, res: Response): Promise<Response> => {
        try {
            const { id } = req.params

            if (!id || typeof id !== 'string') {
                return httpResponse(res, 400, { mensagem: 'O ID informado é inválido.' })
            }

            const user = await this.userService.getById(id)

            return httpResponse(res, 200, user)
        } catch (error: any) {
            if (error.message === 'User not found in the database') {
                return httpResponse(res, 404, { detalhe: error.message })
            }

            console.error(error)
            return httpResponse(res, 500)
        }
    }

    public getByEmail = async (req: AuthRequest, res: Response): Promise<Response> => {
        try {
            const { email } = req.params

            if (!email || typeof email !== 'string') {
                return httpResponse(res, 400, { mensagem: 'O e-mail informado é inválido.' })
            }

            const user = await this.userService.getByEmail(email)

            return httpResponse(res, 200, user)

        } catch (error: any) {
            if (error.message === 'User not found') {
                return httpResponse(res, 404, { mensagem: error.message })
            }

            console.error(error)
            return httpResponse(res, 500)
        }
    }

    public getByUsername = async (req: AuthRequest, res: Response): Promise<Response> => {
        try {
            const { username } = req.params

            if (!username || typeof username !== 'string') {
                return httpResponse(res, 400, { mensagem: 'O username informado é inválido.' })
            }

            const user = await this.userService.getByUsername(username)

            return httpResponse(res, 200, user)
        } catch (error: any) {
            if (error.message === 'User not found') {
                return httpResponse(res, 404, { mensagem: error.message })
            }

            console.error(error)
            return httpResponse(res, 500)
        }
    }

    public update = async (req: AuthRequest, res: Response): Promise<Response> => {
        try {
            const { id } = req.params
            const { name, email, username, password, imageUrl } = req.body

            if (!id && typeof id !== 'string') {
                return httpResponse(res, 400)
            }

            if (!name || !email || !username || !password || !imageUrl) {
                return httpResponse(res, 400)
            }

            const updatedUser = await this.userService.update(id as string, { name, email, username, password, imageUrl })

            return res.status(200).send({
                ok: true,
                message: 'Usuário atualizado com sucesso',
                data: updatedUser
            })
        } catch (error: any) {
            if (error.message === 'User not found') {
                return httpResponse(res, 404, { mensagem: error.message })
            }

            console.error(error)
            return httpResponse(res, 500)
        }
    }

    public delete = async (req: AuthRequest, res: Response): Promise<Response> => {
        try {
            const { id } = req.params

            if (!id && typeof id !== 'string') {
                return httpResponse(res, 400)
            }

            const deletedUser = await this.userService.delete(id as string)

            return httpResponse(res, 200, deletedUser)

        } catch (error: any) {
            if (error.message === 'User not found') {
                return httpResponse(res, 404, { mensagem: error.message })
            }

            console.error(error)
            return httpResponse(res, 500)
        }
    }

    public feed = async (req: AuthRequest, res: Response): Promise<Response> => {
        try {
            const userId = req.userId

            if (!userId) return httpResponse(res, 400, {
                message: 'Usuário não autenticado'
            })

            const feed = await this.userService.feed(userId)

            return httpResponse(res, 200, feed)
        } catch (error: any) {
            if (error.message === 'User not found') {
                return httpResponse(res, 404, { mensagem: error.message })
            }
            
            console.error(error)
            return httpResponse(res, 500)
        }
    }
}