import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/', userController.create);

userRoutes.get('/', userController.list)
userRoutes.get('/id/:id', userController.getById)
userRoutes.get('/email/:email', userController.getByEmail)
userRoutes.get('/username/:username', userController.getByUsername)

userRoutes.put('/:id', userController.update)

export { userRoutes }