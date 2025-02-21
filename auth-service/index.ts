import express from 'express';
import type { Request, Response } from 'express';

const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: Request, res:Response) => {
  res.send("Hello Auth Services");
})

// * Role créer les tokens & interroger le service api-users
// TODO route login création de token
// TODO route login décryptage de token

app.listen(PORT, () => {
  "🚀 server listen on http://localhost:3002"
})