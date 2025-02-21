import express from 'express';

import type { Request, Response } from 'express';

import { userRouter } from './src/routes/userRouter';

const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route d'accueil
app.get("/", (req: Request, res:Response) => {
  res.send("Bienvenu sur auth-service");
})

// * Role créer les tokens & interroger le service api-users
// Route User
app.use(userRouter);

app.listen(PORT, () => {
  "🚀 server listen on http://localhost:3002"
})