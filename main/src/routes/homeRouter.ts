import { Router } from "express";
import { homeController } from "../controllers/homeController";

export const homeRouter = Router();

homeRouter.get("/", homeController.homePage);
homeRouter.get('/users', homeController.users);
homeRouter.get("/posts", homeController.feed)