import type { Request, Response, NextFunction } from "express";
import axios from "axios";

const aclURL = process.env.ACL_SERVICE_URL as string;

export const checkAuthToken = async(req: Request, res: Response, next: NextFunction) => {
  try {
    // On appelle le microservice acl-service avec axios pour vérifier les autorisations
    const token = `Bearer ${res.locals.bsn_auth_token}`;
    console.log(token);

    await axios.post(`${aclURL}/acl`, { method: req.method, path: req.path }, {
    headers: {
        'Authorization': token
    }
    });

    next();

    // ? exemple
    // J'envoi le token de jean role_id 1 Admin + la route /users & méthode GET
    // Le service ACL récupère le token et place dans allowedRoles : [Role.ADMIN, Role.USER] => [1, 2]
    // Le service ACL envoi le role et le token au service de permission
    // Le servcice de permission compare le token.role & les roles dans allowedRole
    // 1. Si c'est bon return rien & donc ACL return rien & main active la route
    // 2. Si le role ne correspond pas 401 => ACL => main errorMessage

  } catch (error) {
    // ? Si error de Error => Go else
    if (error instanceof Error) {
      // ? Si error de Axios
      if (axios.isAxiosError(error)) {
        // ? Si error de "response" !== de "request"
        if(error.response){
          const errorStatus: number = error.response.status as number;
          const errorMessage = error.response?.data.error;
          res.status(errorStatus).render('main', { data: { error: errorMessage } });
        }

      } else {
        res.status(500).render('main', { data: { error: `Une erreur est survenur merci de recommencer: ${error.message}`} });
      }
    }
  }
};