import express from 'express';
import type { Request, Response } from 'express';
import { router } from './routes/routes';

const PORT = 3000;

const app = express();

// * Role: interagir avec la bdd

app.use(router);

app.listen(PORT, () => {
  "🚀 server listen on http://localhost:3001"
});