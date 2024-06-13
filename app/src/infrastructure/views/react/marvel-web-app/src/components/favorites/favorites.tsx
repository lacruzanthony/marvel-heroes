import { useFavoriteCharacterContext } from '../contexts/favorite-character';

export const Favorites = () => {
  const {
    showFavoritesGrid,
    toggleShowFavoritesGrid,
    favoriteCharacters,
  } = useFavoriteCharacterContext();

  console.log({ showFavoritesGrid });
  return <div></div>;
};
