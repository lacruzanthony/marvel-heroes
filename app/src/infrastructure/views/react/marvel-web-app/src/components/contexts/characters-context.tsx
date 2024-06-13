import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';
import { MarvelCharacter } from '../../services/types';

interface CharacterContextProps {
  characters: MarvelCharacter[];
  characterDetail: MarvelCharacter | undefined;
  setCharacterDetail: React.Dispatch<
    React.SetStateAction<MarvelCharacter | undefined>
  >;
  setCharacters: React.Dispatch<
    React.SetStateAction<MarvelCharacter[]>
  >;
}

const CharacterContext = createContext<
  CharacterContextProps | undefined
>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useCharacterContext = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error(
      'useCharacterContext must be used within a CharacterProvider',
    );
  }
  return context;
};

export const CharacterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [characters, setCharacters] = useState<MarvelCharacter[]>([]);
  const [characterDetail, setCharacterDetail] =
    useState<MarvelCharacter>();

  return (
    <CharacterContext.Provider
      value={{
        characters,
        setCharacters,
        characterDetail,
        setCharacterDetail,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
