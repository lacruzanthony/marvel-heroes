import { Card } from '../card';
import { getCharacters } from '../../services';
import { useLoaderData } from 'react-router-dom';
import { MarvelCharacter } from '../../services/types';
import { useCharacterContext } from '../contexts/characters-context';
import { useEffect } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  return await getCharacters();
}

export default function CharactersGrid() {
  let characters = useLoaderData() as Array<MarvelCharacter>;
  const {
    characters: contextCharacters,
    setCharacters,
    showFilteredCharacters,
  } = useCharacterContext();

  characters = showFilteredCharacters
    ? contextCharacters
    : characters;

  useEffect(() => {
    setCharacters(characters);
  }, [characters, setCharacters]);

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
