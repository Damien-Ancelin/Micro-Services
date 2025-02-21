import express from 'express';
import type { Request, Response } from 'express';
import { router } from './routes/routes';

const PORT = 3000;

const app = express();

app.use(router);

// TODO Créer connexion bdd + gestion on once
// Todo schema + Model

app.listen(PORT, () => {
  "🚀 server listen on http://localhost:3001"
});