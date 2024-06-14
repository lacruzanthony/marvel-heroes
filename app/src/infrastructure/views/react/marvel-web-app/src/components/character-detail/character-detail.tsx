import './styles.css';
import React from 'react';
import { useCharacterContext } from '../contexts/characters-context';
import { PolygonCorner } from '../polygon-corner/polygon-corner';
import emptyHeart from '../../assets/heart-default.svg';
import selectedHeart from '../../assets/heart-selected.svg';
import { MarvelCharacter } from '../../services/types';
import { useFavoriteCharacterContext } from '../contexts/favorite-character';

const CharacterDetail: React.FC = () => {
  const { characterDetail } = useCharacterContext();
  const { toggleFavorite, isCharacterFavorite } =
    useFavoriteCharacterContext();

  const isFavorite = isCharacterFavorite(characterDetail?.id ?? 0);

  const handleFavoriteCharacter = () => {
    if (characterDetail?.id) {
      toggleFavorite(characterDetail);
    }
  };

  const { name, description, thumbnail } =
    characterDetail as MarvelCharacter;

  return (
    <PolygonCorner polygon="polygon(100% 0px, 100% 90%, 89% 145%, 0% 100%, 0px 51%, 0% 0%)">
      <div className="container-fluid bg-black">
        <div className="responsive-margin d-flex flex-column flex-lg-row align-items-center justify-content-center mb-4">
          <img
            src={thumbnail}
            alt={name}
            className="img-fluid mb-3 mb-lg-0"
            style={{ maxWidth: '300px' }}
          />
          <div className="ml-lg-4 ms-5 w-100 w-lg-50">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="text-light">{name}</h1>
              <button
                className="btn btn-outline"
                onClick={() => handleFavoriteCharacter()}
              >
                <img
                  src={isFavorite ? selectedHeart : emptyHeart}
                  alt="favorites"
                  className={`h-8 sm:h-12 heart-icon `}
                />
              </button>
            </div>
            <p className="text-light">{description}</p>
          </div>
        </div>
      </div>
    </PolygonCorner>
  );
};

export default CharacterDetail;
