import './config';
import cors from 'cors';
import express from 'express';
import { getMarvelCharactersController } from './infrastructure/controllers/CharacterController';
import { getComicsByCharacterController } from './infrastructure/controllers/ComicController';
import path from 'path';

const app = express();
const port = process.env.PORT || 3001;

const distPath = path.resolve(__dirname, '../src/infrastructure/views/react/marvel-web-app/dist'); // Ajusta la ruta según tu estructura de proyecto
app.use(express.static(distPath));

app.use(cors());
app.use(express.json());

app.get('/api/characters', getMarvelCharactersController);
app.get('/api/characters/:characterId/comics', getComicsByCharacterController);

app.get('*', (_req, res) => {
  res.sendFile(path.resolve(distPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
