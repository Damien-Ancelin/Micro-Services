import jwt from 'jsonwebtoken';

import type { Request, Response } from "express"
import type { JWTUserData } from "../../@types";

const jwtSecret = process.env.JWT_SECRET as string;

export const authzController = {
  async checkPermission(req: Request, res: Response){
    try {
      // ? On vérifie la présence du token dans => acl-service
      const bearerToken  = req.headers.authorization as string;
      const token = bearerToken?.split(" ")[1] as string;
      const tokenData = jwt.verify(token, jwtSecret) as JWTUserData;

      const allowedRoles = req.body.allowedRoles ?? [];
      
      if(allowedRoles.length === 0 || !allowedRoles.includes(tokenData.role)){
        res.status(401).json({error: `Vous n'êtes pas authorisé à accéder à cette page`});
      }
      
      res.sendStatus(204);
      
    } catch (error) {
      if(error instanceof Error){
        res.status(401).json({error: `Erreur dans le Authz => ${error.message}`})
      }
    }
  },

  whoIs(req: Request, res: Response){
    try {
      const bearerToken  = req.headers.authorization as string;
      const token = bearerToken?.split(" ")[1] as string;
      const tokenData = jwt.verify(token, jwtSecret) as JWTUserData;

      const whoIs = tokenData.role === 1 ? 'admin' : 'user';
      const identity = tokenData.id;
  
      res.status(200).json({ role: whoIs, userId: identity });
    } catch (error) {
      res.status(401).json({ error: "Qui êtes vous ? Oo " })
    }
  }
}