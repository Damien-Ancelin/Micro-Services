import { Router } from "express";
import { postController } from "../controllers/postController";

export const router = Router();

router.get("/posts", postController.getAllPosts);