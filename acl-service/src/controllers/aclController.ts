import type { Request, Response } from "express";
import { routeConfig } from "../../utils/acl";
import axios from "axios";

const authzURL = process.env.PERMISSION_SERVICE_URL as string;

export const aclController = {
  async aclList(req: Request, res: Response) {
    try {
      const { method, path } = req.body;
      console.log(method, path)
      
      const allowedRoles = routeConfig[path]?.[method];

      if (!allowedRoles) {
        // * Accès au page public
        res.sendStatus(204);
        return;
      }

      const token = req.headers.authorization;

      if (!token) {
        res.status(401).json({ error: "Veuillez vous authentifier" });
        return;
      }

      const response = await axios.post(
        `${authzURL}/checkAuthz`,
        { allowedRoles },
        {
          headers: {
            Authorization: token
          },
          // ? Axios laisse passer les erreurs < 500 et ont les gèrent
          // validateStatus: (status: number) => {
          //   return status < 500;
          // }
        }
      );

      // ? Gestion de l'erreur
      // if(response.data.error){
      //   const { status, statusText, data } = response;
      //   res.status(response.status).json({error: `Error ${status}: ${statusText} =>, ${data.error}`})
      // }

      res.sendStatus(204);

    } catch (error) {
      // ? Si error de Error => Go else
      if (error instanceof Error) {
        // ? Si error de Axios
        if (axios.isAxiosError(error)) {
          // ? Si error de "response" !== de "request"
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
};
