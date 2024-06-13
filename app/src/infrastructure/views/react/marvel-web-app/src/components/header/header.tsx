import './styles.css';
import marvelLogo from '../../assets/marvel-logo.svg';
import emptyHeart from '../../assets/heart-default.svg';
import selectedHeart from '../../assets/heart-selected.svg';
import { Link, Outlet } from 'react-router-dom';
import { useFavoriteCharacterContext } from '../contexts/favorite-character';

export const Header = () => {
  const {
    showFavoritesGrid,
    toggleShowFavoritesGrid,
    favoriteCharacters,
  } = useFavoriteCharacterContext();
  const handleClick = () => {
    toggleShowFavoritesGrid();
  };

  return (
    <>
      <header className="bg-black">
        <div className="d-flex justify-content-between px-4 py-2 border border-start-0 border-end-0 border-top-0  border-white">
          <Link to="/" onClick={handleClick}>
            <img
              src={marvelLogo}
              alt="marvel-logo"
              className="h-8 sm:h-12"
            />
          </Link>
          <Link
            to="/favorites"
            className="m-auto me-0"
            onClick={handleClick}
          >
            <img
              src={showFavoritesGrid ? selectedHeart : emptyHeart}
              alt="favorites"
              className={`ms-auto h-8 sm:h-12 heart-icon ${
                showFavoritesGrid ? 'filled' : ''
              }`}
            />
          </Link>
          <span className="text-white my-auto ms-3">
            {favoriteCharacters.length}
          </span>
        </div>
      </header>
      <Outlet />
    </>
  );
};
