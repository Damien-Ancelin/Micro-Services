import express from 'express';
import type { Request, Response } from 'express';
import { router } from './src/routes/routes';

const PORT = 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route d'accueil
app.get("/", (req: Request, res: Response) => {
  res.send("Bienvenue sur api-users")
})

// * Role: interagir avec la bdd
app.use(router);

app.listen(PORT, () => {
  "🚀 server listen on http://localhost:3001"
});