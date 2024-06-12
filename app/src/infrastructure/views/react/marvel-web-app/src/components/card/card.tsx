import { Link } from 'react-router-dom';
import { useCharacterContext } from '../contexts/characters-context';
import { MarvelCharacter } from '../../services/types';
import { PolygonCorner } from '../polygon-corner/polygon-corner';
import favorites from '../../assets/character-grid-heart.svg';

export const Card = ({ character }: { character: MarvelCharacter }) => {
  const { setCharacters } = useCharacterContext();

  const { id, name, thumbnail } = character;

  return (
    <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
      <div className="card h-100 p-0 rounded-0 border-0">
        <Link
          to={`/character/${id}`}
          onClick={() => setCharacters([character])}
        >
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
        </Link>
        <PolygonCorner>
          <div
            style={{
              height: '65px',
            }}
            className="border border-danger border-5 border-start-0 border-end-0 border-bottom-0 card-footer d-flex justify-content-between align-items-center bg-black rounded-0"
          >
            <span className="text-light">{name}</span>
            <button className="btn btn-outline-transparent p-0">
              <img src={favorites} alt="favorite-button" />
            </button>
          </div>
        </PolygonCorner>
      </div>
    </div>
  );
};
