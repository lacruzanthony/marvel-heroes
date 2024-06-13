import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import { MarvelCharacter } from '../../services/types';
interface FavoriteCharacterContextProps {
  showFavoritesGrid: boolean;
  toggleShowFavoritesGrid: () => void;
  favoriteCharacters: MarvelCharacter[];
  toggleFavorite: (character: MarvelCharacter) => void;
  isCharacterFavorite: (characterId: number) => boolean;
}

export const FavoriteCharacterContext = createContext<
  FavoriteCharacterContextProps | undefined
>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useFavoriteCharacterContext = () => {
  const context = useContext(FavoriteCharacterContext);
  if (!context) {
    throw new Error(
      'useFavoriteCharacterContext must be used within a FavoriteCharacterProvider',
    );
  }
  return context;
};

export const FavoriteCharacterProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [favoriteCharacters, setFavoriteCharacters] = useState<
    MarvelCharacter[]
  >([]);
  const [showFavoritesGrid, setShowFavoritesGrid] = useState(false);
  const toggleShowFavoritesGrid = () => {
    setShowFavoritesGrid(!showFavoritesGrid);
  };

  const toggleFavorite = useCallback((character: MarvelCharacter) => {
    setFavoriteCharacters((prevFavoriteCharacters) =>
      prevFavoriteCharacters.includes(character)
        ? prevFavoriteCharacters.filter(
            (favChar) => favChar.id !== character.id,
          )
        : [...prevFavoriteCharacters, character],
    );
  }, []);

  const isCharacterFavorite = useCallback(
    (characterId: number) => {
      return favoriteCharacters.some(
        (character) => character.id === characterId,
      );
    },
    [favoriteCharacters],
  );

  return (
    <FavoriteCharacterContext.Provider
      value={{
        favoriteCharacters: favoriteCharacters,
        showFavoritesGrid,
        toggleFavorite,
        isCharacterFavorite,
        toggleShowFavoritesGrid,
      }}
    >
      {children}
    </FavoriteCharacterContext.Provider>
  );
};
