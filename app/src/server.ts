import './config';
import cors from 'cors';
import express from 'express';
import { getMarvelCharactersController } from './infrastructure/controllers/CharacterController';
import { getComicsByCharacterController } from './infrastructure/controllers/ComicController';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/characters', getMarvelCharactersController);
app.get('/api/characters/:characterId/comics', getComicsByCharacterController);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
