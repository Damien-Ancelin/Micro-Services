import { Router } from "express";
import { userController } from "../controllers/userController";

export const userRouter = Router();

userRouter.get("/user/:email/edit", userController.displayEditUser);
userRouter.post("/user/:email/edit", userController.updateUser);
userRouter.post("/user/:email/delete", userController.deleteUser);