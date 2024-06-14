import { useEffect } from 'react';
import { Card } from '../card';
import { useNavigate } from 'react-router-dom';
import { useFavoriteCharacterContext } from '../contexts/favorite-character';

export const Favorites = () => {
  const navigate = useNavigate();
  const {
    favoriteCharacters,
    showFavoritesGrid,
    toggleShowFavoritesGrid,
  } = useFavoriteCharacterContext();

  useEffect(() => {
    if (!showFavoritesGrid) {
      navigate('/');
    }
    () => {
      toggleShowFavoritesGrid();
    };
  }, [navigate, toggleShowFavoritesGrid, showFavoritesGrid]);

  return (
    <div className="container">
      <div className="row mt-5">
        {favoriteCharacters.map((character) => (
          <Card key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
};
