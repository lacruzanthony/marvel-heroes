import { Card } from '../card';
import { getCharacters } from '../../services';
import { useLoaderData } from 'react-router-dom';
import { MarvelCharacter } from '../../services/types';

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  return await getCharacters();
}

export default function CharactersGrid() {
  const characters = useLoaderData() as Array<MarvelCharacter>;
  return (
    <div className="container">
      <div className="row mt-5">
        {characters.map((character) => (
          <Card key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
}
