import axios from "axios";
import type { NextFunction, Request, Response } from "express";

const authzURL = process.env.PERMISSION_SERVICE_URL;

export const whoIs = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const token = `Bearer ${res.locals.bsn_auth_token}`;
    const response = await axios.post(`${authzURL}/whoIs`, { },
      {
        headers: {
          Authorization: token
        },
      }
    );
    const whoIsIt = await response.data;
    res.locals.whoIs = whoIsIt;
    console.log( whoIsIt );
    next();
  } catch (error) {
    next();
  }

}
