import axios from "axios";
import type { Request, Response } from "express";

const authURL=process.env.AUTH_SERVICE_URL as string;
const errorConnexion = "Connexion échouée, veuillez réessayer.";

export const authController = {
  loginPage(req: Request, res: Response){
    res.status(200).render("main", { data: {view: "auth/login"}});
  },

  async handleLogin(req: Request, res: Response){
    try {
      const response = await axios.post(`${authURL}/login`, req.body);
      const { token } = response.data;
      res.cookie('bsn_auth_token', token);
      res.redirect("/");

    } catch (error) {
      res.status(401).render('main', { data: { view: 'auth/login', error: errorConnexion } });
    }
  },

  registerPage(req: Request, res: Response){
    res.status(200).render("main", { data: {view: "auth/register"}})
  },
  
  async handleRegister(req: Request, res: Response){
    try {
      // TODO requete axios vers /register auth-services
      const response = await axios.post(`${authURL}/register`, req.body)
      // TODO Récupérer le token et le mettre dans les cookies
      const { token } = response.data;
      res.cookie('bsn_auth_token', token);
      // TODO Redirect page d'acceuil !
      res.redirect("/");
    } catch (error) {
      res.status(500).json({ error: "Une erreur est survenue" });
    }
  },

  logout(req: Request, res: Response){
    res.clearCookie("bsn_auth_token");
    res.redirect("/");
  }
}