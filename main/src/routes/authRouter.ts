import { authController } from "../controllers/authController";
import { Router } from "express";

export const authRouter = Router();

authRouter.get("/login", authController.loginPage);
authRouter.post("/login", authController.handleLogin);
authRouter.get("/register", authController.registerPage);
authRouter.get("/register", authController.handleRegister);