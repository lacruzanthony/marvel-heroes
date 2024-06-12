import { ICharacterRepository } from '../repositories/ICharacterRepository';
import { Character } from '../models/Character';

export class GetMarvelCharacters {
  constructor(private characterRepository: ICharacterRepository) { }

  async execute(limit: number): Promise<Character[]> {
    return this.characterRepository.getCharacters(limit);
  }
}
