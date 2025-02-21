import type { Request, Response } from "express";
import UserModel from "../models/User";

export const userController = {
  async getAllUsers(req: Request, res: Response){
    try {
      const users = await UserModel.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Une erreur est survenue" });
    }
  }
}