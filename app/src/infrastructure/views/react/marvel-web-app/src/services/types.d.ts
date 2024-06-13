export interface MarvelCharacter {
    id: number;
    name: string;
    description: string;
    thumbnail: string;
    comics: Comic
    isFavorite?: boolean;
}

export interface Comic {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
}