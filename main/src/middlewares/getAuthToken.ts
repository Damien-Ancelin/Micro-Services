import type { NextFunction, Request, Response } from "express";

const authzURL = process.env.PERMISSION_SERVICE_URL;

export const getAuthToken = (req: Request, res: Response, next: NextFunction) => {
  res.locals.bsn_auth_token = req.cookies?.bsn_auth_token;
  // console.log(res.locals); }

  next();
};