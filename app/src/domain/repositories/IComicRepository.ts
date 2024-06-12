// backend/src/domain/repositories/IComicRepository.ts
import { Comic } from '../models/Comic';

export interface IComicRepository {
  getComics(limit: number): Promise<Comic[]>;
  getComicsByCharacter(characterId: string, limit: number): Promise<Comic[]>;
}
