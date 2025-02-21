import type { Request, Response } from "express";

export const authController = {
  loginPage(req: Request, res: Response){
    res.status(200).render("main", { data: {login: "login"}});
  },
  async handleLogin(req: Request, res: Response){
    res.send("AuthHandleLogin");
  },
  registerPage(req: Request, res: Response){
    res.status(200).render("main", { data: {register: "register"}})
  },
  async handleRegister(req: Request, res: Response){
    res.send("AuthHandleRegister");
  },
}