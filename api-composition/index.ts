import express from 'express';
import type { Request, Response } from 'express';
import { usersRouter } from './src/routes/usersRoutes';

const PORT = 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route d'accueil
app.get("/", (req: Request, res: Response) => {
  res.send("Bienvenue sur api-composition")
})

// * Logique centralisé des µServices pour envoyé datas au main
app.use(usersRouter);

app.listen(PORT, () => {
  "🚀 server listen on http://localhost:3006"
});