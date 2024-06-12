import { Character } from "../models/Character";

export interface ICharacterRepository {
  getCharacters(limit: number): Promise<Character[]>;
}