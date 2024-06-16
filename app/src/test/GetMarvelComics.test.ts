import { GetComicsByCharacter } from '../domain/services/GetComicsByCharacter';
import { MarvelApiService } from '../infrastructure/repositories/MarvelApiService';

jest.mock('../infrastructure/repositories/MarvelAPIService');

describe('GetMarvelCharacters', () => {
    let getMarvelComicCharacters: GetComicsByCharacter;
    let marvelAPIService: jest.Mocked<MarvelApiService>;

    beforeEach(() => {
        marvelAPIService = new MarvelApiService() as jest.Mocked<MarvelApiService>;
        getMarvelComicCharacters = new GetComicsByCharacter(marvelAPIService);
    });

    it('should return characters from Marvel API', async () => {
        const mockCharactersComics = [
            {
                "id": "10223",
                "year": 1972,
                "title": "Marvel Premiere (1972) #35",
                "description": "",
                "thumbnail": "http://i.annihil.us/u/prod/marvel/i/mg/6/60/642ddeb849005.jpg",
            },
            {
                "id": "10224",
                "year": 1972,
                "title": "Marvel Premiere (1972) #36",
                "description": "",
                "thumbnail": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",
            }
        ];

        marvelAPIService.getComicsByCharacter.mockResolvedValue(mockCharactersComics);

        const characters = await getMarvelComicCharacters.execute('111', 20);
        expect(characters).toEqual(mockCharactersComics);
        expect(marvelAPIService.getComicsByCharacter).toHaveBeenCalledWith('111', 20);
    });

    it('should handle errors from Marvel API', async () => {
        marvelAPIService.getComicsByCharacter.mockRejectedValue(new Error('Marvel API Error'));

        await expect(getMarvelComicCharacters.execute('111', 20)).rejects.toThrow('Marvel API Error');
    });
});
