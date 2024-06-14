import { Request, Response } from 'express';
import { GetMarvelCharacters } from '../../domain/services/GetMarvelCharacters';
import { MarvelApiService } from '../repositories/MarvelApiService';

const characterRepository = new MarvelApiService();
const getMarvelCharacters = new GetMarvelCharacters(characterRepository);

export const getMarvelCharactersController = async (req: Request, res: Response) => {
  try {
    const { q = '' } = req.query;
    const characters = await getMarvelCharacters.execute(q.toString(), 50);
    res.status(200).json(characters);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Internal Server Error', error: errorMessage });
  }
};
