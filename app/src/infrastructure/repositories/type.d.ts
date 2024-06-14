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
        years: number;
    }
}

export interface MarvelComic {
    id: number;
    title: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    }
    dates: {
        type: string;
        date: string;
    }[]
}