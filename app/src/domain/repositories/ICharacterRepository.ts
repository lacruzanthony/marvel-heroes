import { Character } from "../models/Character";

export interface ICharacterRepository {
  getCharacters(q: string, limit: number): Promise<Character[]>;
}