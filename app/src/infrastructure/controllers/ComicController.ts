import { Request, Response } from 'express';
import { GetMarvelComics } from '../../domain/services/GetMarvelComics';
import { GetComicsByCharacter } from '../../domain/services/GetComicsByCharacter';
import { MarvelApiService } from '../repositories/MarvelApiService';

const comicRepository = new MarvelApiService();
const getMarvelComics = new GetMarvelComics(comicRepository);
const getComicsByCharacter = new GetComicsByCharacter(comicRepository);

export const getMarvelComicsController = async (_req: Request, res: Response) => {
  try {
    const comics = await getMarvelComics.execute(50);
    res.status(200).json(comics);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
  }
};

export const getComicsByCharacterController = async (req: Request, res: Response) => {
  const { characterId } = req.params;
  try {
    const comics = await getComicsByCharacter.execute(characterId, 20);
    res.status(200).json(comics);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
  }
};
