import type { NextFunction, Request, Response } from "express";

export const getAuthToken = (req: Request, res: Response, next: NextFunction) => {
  res.locals.bsn_auth_token = req.cookies?.bsn_auth_token;
  // console.log(res.locals);
  next();
};