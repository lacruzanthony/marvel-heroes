type Comics = {
  collectionURI: string;
  items: Array<{ resourceURI: string; name: string }>
}

export class Character {
  constructor(public id: string, public name: string, public description: string, public thumbnail: string, public comics: Comics) { }
}