export interface MarvelCharacter {
    id: number;
    name: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    }
    comics: {
        id: number;
        title: string;
        collectionURI: string,
        items: Array<{ resourceURI: string; name: string }>,
        description: string;
        thumbnail: {
            path: string;
            extension: string;
        }
    }
}