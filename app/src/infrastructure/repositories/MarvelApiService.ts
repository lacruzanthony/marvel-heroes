import axios from 'axios';
import { ICharacterRepository } from '../../domain/repositories/ICharacterRepository';
import { IComicRepository } from '../../domain/repositories/IComicRepository';
import { Character } from '../../domain/models/Character';
import { Comic } from '../../domain/models/Comic';
import crypto from 'crypto';
import { MarvelCharacter } from './type';

const PUBLIC_KEY = process.env.MARVEL_PUBLIC_KEY!;
const PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY!;
const BASE_URL = 'https://gateway.marvel.com:443/v1/public';

const generateHash = (): { ts: string; hash: string } => {
  const ts = new Date().getTime().toString();
  const hash = crypto.createHash('md5').update(ts + PRIVATE_KEY + PUBLIC_KEY).digest('hex');
  return { ts, hash };
};

export class MarvelApiService implements ICharacterRepository, IComicRepository {
  async getCharacters(limit: number): Promise<Character[]> {
    const { ts, hash } = generateHash();
    const response = await axios.get(`${BASE_URL}/characters`, {
      params: {
        limit,
        ts,
        apikey: PUBLIC_KEY,
        hash,
      }
    });
    return response.data.data.results.map((char: MarvelCharacter) =>
      new Character(char.id, char.name, char.description, `${char.thumbnail.path}.${char.thumbnail.extension}`, char.comics));
  }

  async getComics(limit: number): Promise<Comic[]> {
    const { ts, hash } = generateHash();
    const response = await axios.get(`${BASE_URL}/comics`, {
      params: {
        limit,
        ts,
        apikey: PUBLIC_KEY,
        hash,
      }
    });
    return response.data.data.results.map((comic: any) => new Comic(comic.id, comic.title, comic.description, `${comic.thumbnail.path}.${comic.thumbnail.extension}`));
  }

  async getComicsByCharacter(characterId: string, limit: number): Promise<Comic[]> {
    const { ts, hash } = generateHash();
    const response = await axios.get(`${BASE_URL}/characters/${characterId}/comics`, {
      params: {
        limit,
        ts,
        apikey: PUBLIC_KEY,
        hash,
      }
    });
    return response.data.data.results.map((comic: any) => new Comic(comic.id, comic.title, comic.description, `${comic.thumbnail.path}.${comic.thumbnail.extension}`));
  }
}
