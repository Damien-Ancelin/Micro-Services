import { userController } from "../controllers/userController";
import { Router } from "express";

export const userRouter = Router();

userRouter.post("/login", userController.login);
userRouter.post("/register", userController.register);