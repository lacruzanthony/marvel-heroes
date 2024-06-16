import { GetMarvelCharacters } from '../domain/services/GetMarvelCharacters';
import { MarvelApiService } from '../infrastructure/repositories/MarvelApiService';

jest.mock('../infrastructure/repositories/MarvelAPIService');

describe('GetMarvelCharacters', () => {
    let getMarvelCharacters: GetMarvelCharacters;
    let marvelAPIService: jest.Mocked<MarvelApiService>;

    beforeEach(() => {
        marvelAPIService = new MarvelApiService() as jest.Mocked<MarvelApiService>;
        getMarvelCharacters = new GetMarvelCharacters(marvelAPIService);
    });

    it('should return characters from Marvel API', async () => {
        const mockCharacters = [
            {
                "id": 1011334,
                "name": "3-D Man",
                "description": "",
                "thumbnail": "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784.jpg",
                "comics": {
                    "available": 12,
                    "collectionURI": "http://gateway.marvel.com/v1/public/characters/1011334/comics",
                    "items": [
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/comics/21366",
                            "name": "Avengers: The Initiative (2007) #14"
                        },
                        {
                            "resourceURI": "http://gateway.marvel.com/v1/public/comics/24571",
                            "name": "Avengers: The Initiative (2007) #14 (SPOTLIGHT VARIANT)"
                        },
                    ]
                }
            }];

        marvelAPIService.getCharacters.mockResolvedValue(mockCharacters);

        const characters = await getMarvelCharacters.execute('', 50);
        expect(characters).toEqual(mockCharacters);
        expect(marvelAPIService.getCharacters).toHaveBeenCalledWith('', 50);
    });

    it('should handle errors from Marvel API', async () => {
        marvelAPIService.getCharacters.mockRejectedValue(new Error('Marvel API Error'));

        await expect(getMarvelCharacters.execute('', 50)).rejects.toThrow('Marvel API Error');
    });
});
