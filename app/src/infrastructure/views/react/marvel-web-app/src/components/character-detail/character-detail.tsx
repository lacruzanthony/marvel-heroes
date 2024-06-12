import React from 'react';
import './styles.css';
import { useCharacterContext } from '../contexts/characters-context';
import { PolygonCorner } from '../polygon-corner/polygon-corner';

const CharacterDetail: React.FC = () => {
  const { characters } = useCharacterContext();

  const [character] = characters;
  const { name, description, thumbnail } =
    character;

  console.log(character);
  return (
    <PolygonCorner polygon="polygon(100% 0px, 100% 90%, 89% 145%, 0% 100%, 0px 51%, 0% 0%)">
      <div className="container-fluid bg-black">
        <div className="container-detail d-flex flex-column flex-lg-row align-items-center justify-content-center mb-4">
          <img
            src={thumbnail}
            alt={name}
            className="img-fluid mb-3 mb-lg-0"
            style={{ maxWidth: '300px' }}
          />
          <div className="ml-lg-4 ms-5">
            <h1 className="text-light d-inline">
              {name}
            </h1>
            <button className="btn btn-outline-danger float-end">
              <i className="bi bi-heart"></i>
            </button>
            <p className="text-light w-75">
              {description}
            </p>
          </div>
        </div>
      </div>
    </PolygonCorner>
  );
};

export default CharacterDetail;