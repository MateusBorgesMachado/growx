import { UserService } from "../services/user.service";
import httpResponse from '../utils/http.response'
import { Request, Response } from "express";

export class UserController {
    private userService = new UserService();

    public create = async (req: Request, res: Response): Promise<Response> => {
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
                    sucess: false,
                    message: "A name and password are required to create the user"
                })
            }

            if (!username && !email) {
                return httpResponse(res, 400, {
                    sucess: false,
                    message: 'A username or email address is required to create the user'
                })
            }

            const newUser = this.userService.create({ name, email, username, password, imageUrl })

            return httpResponse(res, 201, newUser)
        } catch (error: any) {
            if (error.mensagem === 'email already exists') {
                return httpResponse(res, 409, {
                    email: req.body,
                    mensagem: error.mensagem
                });
            }

            if (error.mensagem === 'username already exists') {
                return httpResponse(res, 409, {
                    username: req.body,
                    mensagem: error.mensagem
                });
            }
            console.error(error);
            return httpResponse(res, 500);
        }
    }
}