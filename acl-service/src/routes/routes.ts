import { Router } from "express";
import { aclController } from "../controllers/aclController";

export const router = Router();

router.post("/acl", aclController.aclList);