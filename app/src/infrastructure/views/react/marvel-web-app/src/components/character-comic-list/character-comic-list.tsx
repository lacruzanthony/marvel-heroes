import React, { useRef } from 'react';
import { getCharacterComics } from '../../services/characters';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { Comic } from '../../services/types';
import './styles.css';

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({
  params,
}: LoaderFunctionArgs): Promise<Error | Comic[] | undefined> {
  if (!params.id) {
    return new Error('Character ID is required');
  }
  const characterComics = await getCharacterComics(params.id);
  return characterComics;
}

const CharacterComicList: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    scrollContainer.style.cursor = 'grabbing';
    scrollContainer.style.userSelect = 'none';

    const startX = e.pageX - scrollContainer.offsetLeft;
    const scrollLeft = scrollContainer.scrollLeft;

    const onMouseMove = (e: MouseEvent) => {
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 1;
      scrollContainer.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
      scrollContainer.style.cursor = 'grab';
      scrollContainer.style.removeProperty('user-select');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const characterComics = useLoaderData() as Comic[];
  return (
    <div className="container mb-5">
      <h2 className="ms-4">Comics</h2>
      <div
        className="comic-list-container d-flex "
        ref={scrollRef}
        onMouseDown={onMouseDown}
        style={{ cursor: 'grab' }}
      >
        {characterComics.map((comic) => (
          <div
            className="container d-flex flex-column align-items-center card h-100 rounded-0 border-0"
            key={comic.id}
            style={{ minWidth: '250px' }}
          >
            <img
              style={{
                width: '70%',
                height: '30%',
                objectFit: 'cover',
              }}
              draggable="false"
              src={comic.thumbnail}
              className="card-img-top rounded-0"
              alt={comic.title}
            />
            <div className="card-body">
              <h5 className="card-title">{comic.title}</h5>
              <p className="card-text">{comic.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterComicList;
