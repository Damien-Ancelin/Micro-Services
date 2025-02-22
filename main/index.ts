import express from 'express';
import path from 'node:path';
import cookieParser from 'cookie-parser';

import { homeRouter } from './src/routes/homeRouter';
import { authRouter } from './src/routes/authRouter';
import { getAuthToken } from './src/middlewares/getAuthToken';
import { checkAuthToken } from './src/middlewares/checkAuthToken';

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

// * Role: Afficher des datas, interagir avec les cookies

// Middleware pour extraire le token et le passer aux vues
app.use(getAuthToken);

// Middleware de vérification des droits du token
app.use(checkAuthToken);

// homeRouter
app.use(homeRouter);

// authRouter
app.use(authRouter);

// TODO Créer les routes auth 
// ! ?

app.listen(PORT, () => {
  `server listen on http://localhost:${PORT}`
});