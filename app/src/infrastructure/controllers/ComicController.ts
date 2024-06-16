import { Request, Response } from 'express';
import { GetComicsByCharacter } from '../../domain/services/GetComicsByCharacter';
import { MarvelApiService } from '../repositories/MarvelApiService';

const comicRepository = new MarvelApiService();
const getComicsByCharacter = new GetComicsByCharacter(comicRepository);

/**
 * Retrieves comics for a given character ID from the Marvel API and sends them as a JSON response.
 *
 * @param {Request} req - The request object containing the character ID.
 * @param {Response} res - The response object used to send the comics.
 * @return {Promise<void>} A promise that resolves when the comics are retrieved and sent.
 */
export const getComicsByCharacterController = async (req: Request, res: Response): Promise<void> => {
  const { characterId } = req.params;
  try {
    const comics = await getComicsByCharacter.execute(characterId, 20);
    res.status(200).json(comics);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
  }
};
