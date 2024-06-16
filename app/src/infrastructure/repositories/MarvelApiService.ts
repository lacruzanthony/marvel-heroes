import axios from 'axios';
import { ICharacterRepository } from '../../domain/repositories/ICharacterRepository';
import { IComicRepository } from '../../domain/repositories/IComicRepository';
import { Character } from '../../domain/models/Character';
import { Comic } from '../../domain/models/Comic';
import crypto from 'crypto';
import { MarvelCharacter, MarvelComic } from './type';

const PUBLIC_KEY = process.env.MARVEL_PUBLIC_KEY!;
const PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY!;
const BASE_URL = 'https://gateway.marvel.com:443/v1/public';

/**
 * Generates a hash using the current timestamp, private key, and public key.
 *
 * @return {Object} An object containing the timestamp and the generated hash.
 */
const generateHash = (): { ts: string; hash: string } => {
  const ts = new Date().getTime().toString();
  const hash = crypto.createHash('md5').update(ts + PRIVATE_KEY + PUBLIC_KEY).digest('hex');
  return { ts, hash };
};

export class MarvelApiService implements ICharacterRepository, IComicRepository {
  /**
   * Retrieves a list of characters from the Marvel API based on the provided query and limit.
   *
   * @param {string} q - The query string to search for characters by name. Defaults to an empty string.
   * @param {number} limit - The maximum number of characters to retrieve. Defaults to 50.
   * @return {Promise<Character[]>} A promise that resolves to an array of Character objects representing the retrieved characters.
   */
  async getCharacters(q: string = '', limit: number = 50): Promise<Character[]> {
    const { ts, hash } = generateHash();
    const params = q ? {
      limit,
      ts,
      apikey: PUBLIC_KEY,
      hash,
      nameStartsWith: q
    } : {
      limit,
      ts,
      apikey: PUBLIC_KEY,
      hash,
    };
    const response = await axios.get(`${BASE_URL}/characters`, { params });
    return response.data.data.results.map((char: MarvelCharacter) =>
      new Character(char.id, char.name, char.description, `${char.thumbnail.path}.${char.thumbnail.extension}`, char.comics));
  }

  /**
   * Retrieves a list of comics from the Marvel API based on the provided limit.
   *
   * @param {number} limit - The maximum number of comics to retrieve.
   * @return {Promise<Comic[]>} A promise that resolves to an array of Comic objects representing the retrieved comics.
   */
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
    return response.data.data.results.map((comic: MarvelComic) => (new Comic(
      comic.id.toString(),
      comic.title,
      comic.description,
      `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
      new Date(comic.dates.find((date: {
        type: string;
        date: string;
      }) => date.type === 'onsaleDate')?.date || '').getFullYear())));
  }

  /**
   * Retrieves a list of comics associated with a specific Marvel character.
   *
   * @param {string} characterId - The ID of the Marvel character.
   * @param {number} limit - The maximum number of comics to retrieve.
   * @return {Promise<Comic[]>} A promise that resolves to an array of Comic objects representing the retrieved comics.
   */
  async getComicsByCharacter(characterId: string, limit: number): Promise<Comic[]> {
    const { ts, hash } = generateHash();
    const response = await axios.get(`${BASE_URL}/characters/${characterId}/comics?orderBy=onsaleDate`, {
      params: {
        limit,
        ts,
        apikey: PUBLIC_KEY,
        hash,
      }
    });
    return response.data.data.results.map((comic: MarvelComic) => (new Comic(
      comic.id.toString(),
      comic.title,
      comic.description,
      `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
      new Date(comic.dates.find((date: {
        type: string;
        date: string;
      }) => date.type === 'onsaleDate')?.date || '').getFullYear())));
  }
}
