import express from 'express';
import path from 'node:path';
import cookieParser from 'cookie-parser';

import { homeRouter } from './src/routes/homeRouter';

const PORT = 3000;
const app = express();

// * Mise en place EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// * Les différents Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// homeRouter
app.use(homeRouter)

// TODO Créer route données JSON => data bdd GET
// ? Idem

// TODO Créer les routes auth 
// ! ?

app.listen(PORT, () => {
  `server listen on http://localhost:${PORT}`
});