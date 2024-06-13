import './styles.css';
import { Link } from 'react-router-dom';
import { useCharacterContext } from '../contexts/characters-context';
import { MarvelCharacter } from '../../services/types';
import { PolygonCorner } from '../polygon-corner/polygon-corner';
import nofavorites from '../../assets/character-grid-heart.svg';
import favoritesSelected from '../../assets/character-grid-selected-heart.svg';
import { useFavoriteCharacterContext } from '../contexts/favorite-character';

export const Card = ({
  character,
}: {
  character: MarvelCharacter;
}) => {
  const { toggleFavorite, isCharacterFavorite } =
    useFavoriteCharacterContext();

  const isFavorite = isCharacterFavorite(character.id);

  const { setCharacterDetail } = useCharacterContext();

  const { id, name, thumbnail } = character;

  const handleFavoriteCharacter = () => {
    if (id) {
      toggleFavorite(character);
    }
  };

  return (
    <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
      <div className="card h-100 p-0 rounded-0 border-0">
        <Link
          to={`/character/${id}`}
          onClick={() => setCharacterDetail(character)}
        >
          <div className="border border-1 border-bottom-0">
            <img
              style={{
                width: '100%',
                height: '240px',
                objectFit: 'cover',
                objectPosition: 'left',
              }}
              src={thumbnail}
              className="card-img-top rounded-0"
              alt={`${name}-image`}
            />
          </div>
        </Link>
        <PolygonCorner>
          <div
            style={{
              height: '65px',
            }}
            className="text-container border border-danger border-5 border-start-0 border-end-0 border-bottom-0 card-footer d-flex justify-content-between align-items-center bg-black rounded-0"
          >
            <span className="text-light animated-text">{name}</span>
            <button
              onClick={() => handleFavoriteCharacter()}
              className="btn btn-outline-transparent p-0 z-1 border-0"
            >
              <img
                src={isFavorite ? favoritesSelected : nofavorites}
                alt="favorite-button"
              />
            </button>
          </div>
        </PolygonCorner>
      </div>
    </div>
  );
};
