import type { Request, Response } from "express";
import type { PostInBdd } from "../../@types";

import PostModel from "../models/Post";

export const postController = {
  async getAllPosts(req: Request, res: Response){
    try {
      const posts: PostInBdd[] = await PostModel.find();
      res.status(200).json(posts);

    } catch (error) {
      res.status(500).json({ error: "Une erreur est survenue" });
    }
  }
}