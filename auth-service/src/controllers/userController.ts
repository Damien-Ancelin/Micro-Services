import bcrypt from 'bcrypt';
import Joi from 'joi';
import axios from 'axios';

import type { Request, Response } from "express";

import { createToken } from "../../utils/createToken";

const apiUsersURL=process.env.API_USERS_URL as string;
const errorConnexion = "Connexion échouée, veuillez réessayer.";

export const userController = {
  async login(req: Request, res: Response){

    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    
    try {
      const validation = await loginSchema.validateAsync(req.body);

      const response = await axios.get(`${apiUsersURL}/user/${validation.email}`);
      const user = response.data;
      if(!user){
        res.status(401).json({error: errorConnexion });
      }
      
      const match = await bcrypt.compare(validation.password, user.password);
      if(!match){
        res.status(401).json({error: errorConnexion });
      }

      const token = createToken({ id: user._id, role: user.role_id, email: user.email });

      res.status(201).json({token, user});
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
  async register(req: Request, res: Response){
    
    const registerSchema = Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      image : Joi.string().empty(''),
      description: Joi.string().empty(''),
      role_id: Joi.number().max(1).required(),
    });

    try {
      const validation = await registerSchema.validateAsync(req.body);
      validation.password = await bcrypt.hash(validation.password, 10);

      const response = await axios.post(`${apiUsersURL}/user`, {...validation})
      const newUser = response.data;
      const token = createToken({ id: newUser._id, role: newUser.role_id, email: newUser.email })
      res.status(201).json({token, user: newUser});

    } catch (error) {
      if (error instanceof Error) {
          res.status(400).json({ error: error.message });
      } else {
          res.status(500).json({ error: "Une erreur est survenue" });
      }
  }
  }
}