import type { Request, Response } from "express";
import UserModel from "../models/User";
import type { UserInBdd, UserOutOfBdd } from "../../@types";

const errorConnexion = "Connexion échouée, veuillez réessayer.";

export const userController = {
  async getAllUsers(req: Request, res: Response){
    try {
      const users: UserOutOfBdd[] = await UserModel.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Une erreur est survenue" });
    }
  },

  async getOneUser(req: Request, res: Response){
    try {
      const email = req.params.email;
      if(!email){
        res.status(400).json({ error: "Paramètres attendu introuvable" });
        return;
      }
      const user: UserOutOfBdd | null = await UserModel.findOne({ email });

      if (!user) {
        res.status(404).json({ error: "Utilisateur non trouvé" });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Une erreur est survenue" });
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
      res.status(201).json(createdUser)

    } catch (error) {
      res.status(500).json({ error: "Une erreur est survenue" });
  }
  }
}