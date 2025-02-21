import type { Request, Response } from "express";
import axios from 'axios';

const apiUsersURL=process.env.API_USERS_URL as string;

export const homeController = {
  homePage(req: Request, res: Response){
    res.status(200).render("main", {data: {view: "home"}})
  },
  async users(req: Request, res: Response){
    try {
      const response = await axios.get(`${apiUsersURL}/users`);
      const users = response.data;
      res.status(200).render("main", {data: {users: users}})
      
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : "Une erreur est survenue lors de la récupération des utilisateurs";
  
        res.status(500).render("main", { data: {error, errorMessage}})
    }
  }
}