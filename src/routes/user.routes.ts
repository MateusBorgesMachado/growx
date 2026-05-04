import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/', userController.create);

userRoutes.get('/', authMiddleware, userController.list)
userRoutes.get('/id/:id', authMiddleware, userController.getById)
userRoutes.get('/email/:email', authMiddleware, userController.getByEmail)
userRoutes.get('/username/:username', authMiddleware, userController.getByUsername)

userRoutes.put('/:id', authMiddleware, userController.update)

export { userRoutes }