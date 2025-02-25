import type { Request, Response } from "express";

export const usersController = {
  users(req: Request, res: Response){
    res.send("users ok");
  }
}