import axios from 'axios';
import type { Request, Response, NextFunction }from 'express'

const permissionURL = process.env.PERMISSION_SERVICE_URL as string;

export const isAdminMW= async (req: Request, res: Response, next: NextFunction) => {
  const token = `Bearer ${res.locals.bsn_auth_token}`;

  if(token === "Bearer undefined"){
    next();
    return;
  }

  const responseAuthz = await axios.post(`${permissionURL}/isAdmin`, {}, {
    headers: {
        'Authorization': token
    }
  });
  
  const isAdmin = responseAuthz.data.isAdmin;
  res.locals.isAdmin = isAdmin;
  next()
}