import express from 'express';
import type { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { router } from './src/routes/routes';

const PORT = 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Route d'accueil
app.get("/", (req: Request, res: Response) => {
  res.send("Bienvenue sur acl-services")
})

// * Role: Transmettre un liste des authorisations par page & méthode
app.use(router);

app.listen(PORT, () => {
  "🚀 server listen on http://localhost:3004"
});