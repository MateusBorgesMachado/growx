import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/', userController.create);

userRoutes.get('/', userController.list)
userRoutes.get('/:id', userController.getById)
userRoutes.get('/:email', userController.getByEmail)
userRoutes.get('/:username', userController.getByUsername)

export { userRoutes }