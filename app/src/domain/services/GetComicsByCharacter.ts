// backend/src/domain/services/GetComicsByCharacter.ts
import { IComicRepository } from '../repositories/IComicRepository';
import { Comic } from '../models/Comic';

export class GetComicsByCharacter {
  constructor(private comicRepository: IComicRepository) { }

  async execute(characterId: string, limit: number): Promise<Comic[]> {
    return this.comicRepository.getComicsByCharacter(characterId, limit);
  }
}
