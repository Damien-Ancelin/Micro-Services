import type { Request, Response } from "express";
import axios from 'axios';

const apiUsersURL = process.env.API_USERS_URL as string;

export const userController = {
  async displayEditUser(req: Request, res: Response){
    try {
      const email = req.params.email;
      const response = await axios.get(`${apiUsersURL}/user/${email}`);
      const user = await response.data;
      // console.log("user/:email/edit => ", user);
      return res.status(200).render("main", { data: { view: "edit-user", user } });

    } catch (error) {
      if (error instanceof Error) {
        if (axios.isAxiosError(error)) {
          if(error.response){
            const errorStatus: number = error.response.status as number;
            const errorMessage = error.response?.data.error;
            res.status(errorStatus).json({error: `Error ${errorStatus}: =>, ${errorMessage}`})
          }
        } else {
          res.status(500).json({ error: `Une erreur est survenur merci de recommencer: ${error.message}`});

        }
      }
    }
  },
  updateUser: async (req: Request, res: Response) => {
    try {
        const { email } = req.params;
        await axios.patch(`${apiUsersURL}/user/${email}`, req.body)

        return res.redirect('/users');
      } catch (error) {
        if (error instanceof Error) {
          if (axios.isAxiosError(error)) {
            if(error.response){
              const errorStatus: number = error.response.status as number;
              const errorMessage = error.response?.data.error;
              res.status(errorStatus).json({error: `Error ${errorStatus}: =>, ${errorMessage}`})
            }
          } else {
            res.status(500).json({ error: `Une erreur est survenur merci de recommencer: ${error.message}`});
  
          }
        }
      }
  },
  deleteUser: async (req: Request, res: Response) => {
    try {
        const { email } = req.params;

        await axios.delete(`${apiUsersURL}/user/${email}`);

        return res.redirect('/users');
    } catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "Une erreur est survenue lors de la suppression de l'utilisateur";

        return res.status(500).render("main", { data: { error: errorMessage } });
    }
  },
}