import { Router } from "express";
import { userController } from "../controllers/userController";

export const router = Router();

router.get('/users', userController.getAllUsers);

router.get('/user/:email', userController.getOneUser);
router.post('/user', userController.createUser);