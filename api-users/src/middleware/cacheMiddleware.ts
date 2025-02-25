import type { Request, Response,NextFunction } from 'express';

import redisClient from "../../redis";

export const cacheMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const key = req.url;

      const cachedData = await redisClient.get(key);

      if (cachedData) {
          redisClient.publish('logs', `Données récupérées dans le cache pour la clé ${key}`);

          // res.locals.cachedData = JSON.parse(cachedData);
          res.status(200).json(JSON.parse(cachedData));
      } else {
          next();
      }
  } catch (error) {
      next();
  }
}