import { IComicRepository } from '../repositories/IComicRepository';
import { Comic } from '../models/Comic';

export class GetMarvelComics {
  constructor(private comicRepository: IComicRepository) { }

  async execute(limit: number): Promise<Comic[]> {
    return this.comicRepository.getComics(limit);
  }
}
