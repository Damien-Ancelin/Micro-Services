import { Router } from "express";
import { authzController } from "../controllers/authzController";

export const router = Router();

router.post("/checkAuthz", authzController.checkPermission);
router.post("/isAdmin", authzController.checkAdmin);