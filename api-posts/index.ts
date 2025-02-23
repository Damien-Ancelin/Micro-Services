import express from 'express';
import type { Request, Response } from 'express';

const PORT = 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route d'accueil
app.get("/", (req: Request, res: Response) => {
  res.send("Bienvenue sur api-posts")
})

// * Role: interagir avec la bdd posts

app.listen(PORT, () => {
  "🚀 server listen on http://localhost:3005"
});