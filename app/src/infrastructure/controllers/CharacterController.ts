import { Request, Response } from 'express';
import { GetMarvelCharacters } from '../../domain/services/GetMarvelCharacters';
import { MarvelApiService } from '../repositories/MarvelApiService';

const characterRepository = new MarvelApiService();
const getMarvelCharacters = new GetMarvelCharacters(characterRepository);

/**
 * Retrieves Marvel characters based on a query string parameter.
 *
 * @param {Request} req - The request object containing the query string parameter.
 * @param {Response} res - The response object used to send the characters.
 * @return {Promise<void>} A promise that resolves when the characters are retrieved and sent.
 */
export const getMarvelCharactersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q = '' } = req.query;
    const characters = await getMarvelCharacters.execute(q.toString(), 50);
    res.status(200).json(characters);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Internal Server Error', error: errorMessage });
  }
};
