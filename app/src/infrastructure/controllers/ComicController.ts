import { Request, Response } from 'express';
import { GetComicsByCharacter } from '../../domain/services/GetComicsByCharacter';
import { MarvelApiService } from '../repositories/MarvelApiService';

const comicRepository = new MarvelApiService();
const getComicsByCharacter = new GetComicsByCharacter(comicRepository);

export const getComicsByCharacterController = async (req: Request, res: Response) => {
  const { characterId } = req.params;
  try {
    const comics = await getComicsByCharacter.execute(characterId, 20);
    res.status(200).json(comics);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
  }
};
