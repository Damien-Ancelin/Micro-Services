import type { Request, Response } from "express";
import type { UserInBdd } from "../../@types";

import UserModel from "../models/User";
import redisClient from "../../redis";
import { cacheOptions } from "../../redis";

export const userController = {
  async getAllUsers(req: Request, res: Response){
    try {
      
      const users: UserInBdd[] = await UserModel.find();
      await redisClient.publish('logs', `Données récupérées dans la BDD ${req.url}`);
      await redisClient.set(req.url, JSON.stringify(users), cacheOptions);

      res.status(200).json(users);

    } catch (error) {
      if(error instanceof Error){
        await redisClient.publish('logs', `Error pour: ${req.route.path} / ${error.message}`);
        res.status(404).json({ error: "Une erreur est survenue" });
      } else {
        res.status(500).json({ error: "Une erreur est survenue" });
      }
    }
  },

  async getOneUser(req: Request, res: Response){
    try {
      const email = req.params.email;
      if(!email){
        res.status(400).json({ error: "Paramètres attendu introuvable" });
        return;
      }
      const user: UserInBdd | null = await UserModel.findOne({ email });

      if (!user) {
        res.status(404).json({ error: "Utilisateur non trouvé" });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      if(error instanceof Error){
        await redisClient.publish('logs', `Error pour: ${req.route.path} / ${error.message}`);
        res.status(404).json({ error: "Une erreur est survenue" });
      } else {
        res.status(500).json({ error: "Une erreur est survenue" });
      }
    }
  },

  async createUser(req: Request, res: Response){
    try {

      const {firstname, lastname, email, password, image, description, role_id } = req.body;
      const userExist = await UserModel.exists({ email });

      if(userExist){
        res.status(400).json({error: 'Cet adresse mail est déjà utilisé'});
        return;
      }

      const newUser = new UserModel({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        image: image ?? 'https://img.lovepik.com/png/20231027/Dark-gray-simple-avatar-grey-silhouette-placeholder_369196_wh860.png',
        description: description ?? "C'est moi, je suis nouveau sur BSN",
        role_id: role_id
      });
      const createdUser = await newUser.save();

      const cachedData = await redisClient.get("/users");
        if (cachedData) {
            const users = JSON.parse(cachedData);
            users.push(createdUser);
            await redisClient.set("/users", JSON.stringify(users), cacheOptions);
        }

        res.status(201).json(createdUser);

    } catch (error) {
      if(error instanceof Error){
        await redisClient.publish('logs', `Error pour: ${req.route.path} / ${error.message}`);
        res.status(404).json({ error: "Une erreur est survenue" });
      } else {
        res.status(500).json({ error: "Une erreur est survenue" });
      }
    }
  },
   async deleteUser(req: Request, res: Response){
    try {
      const email = req.params.email;
      const deletedUser = await UserModel.findOneAndDelete({ email });
      const cachedData = await redisClient.get('/users');

      if (cachedData) {
          const users = JSON.parse(cachedData).filter((user: UserInBdd) => user.email !== deletedUser?.email) as UserInBdd[];
          await redisClient.publish('logs', `${deletedUser?.email}`);
          await redisClient.set('/users', JSON.stringify(users), cacheOptions);
        }

      res.sendStatus(204);

    } catch (error) {
      if(error instanceof Error){
        await redisClient.publish('logs', `Error pour: ${req.route.path} / ${error.message}`);
        res.status(404).json({ error: "Une erreur est survenue" });
      } else {
        res.status(500).json({ error: "Une erreur est survenue" });
      }
    }
   },

   async updateUser (req: Request, res: Response){
    try {
        const email = req.params.email;

        try {
            const updateUser = await UserModel.findOneAndUpdate({ email }, req.body);
            const cachedData = await redisClient.get('/users');

            if (cachedData) {
              const users = JSON.parse(cachedData).filter((user: UserInBdd) => user.email !== updateUser?.email);
              users.push(updateUser);
              await redisClient.set('/users', JSON.stringify(users), cacheOptions);
            }


            res.status(200).json(updateUser);
        } catch (error) {
            res.status(404).json({ error: "Utilisateur non trouvé" });
        }
      } catch (error) {
        if(error instanceof Error){
          await redisClient.publish('logs', `Error pour: ${req.route.path} / ${error.message}`);
          res.status(404).json({ error: "Une erreur est survenue" });
        } else {
          res.status(500).json({ error: "Une erreur est survenue" });
        }
      }
   },
}