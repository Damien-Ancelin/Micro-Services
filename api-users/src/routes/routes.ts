import { Router } from "express";
import { userController } from "../controllers/userController";
import { cacheMiddleware } from "../middleware/cacheMiddleware";

export const router = Router();

router.get('/users', cacheMiddleware, userController.getAllUsers);

router.get('/user/:email', userController.getOneUser);
router.post('/user', userController.createUser);
router.delete('/user/:email', userController.deleteUser);
router.patch('/user/:updateUser', userController.updateUser);