import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import { Favorites } from './favorites';
import { useFavoriteCharacterContext } from '../contexts/favorite-character';
import { useNavigate } from 'react-router-dom';
import { MarvelCharacter } from '../../services/types';

// Mock del contexto de personajes favoritos
vi.mock('../contexts/favorite-character', () => ({
  useFavoriteCharacterContext: vi.fn(),
}));

// Mock de react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

// Mock del componente Card si es necesario
vi.mock('../card', () => ({
  Card: ({ character }: { character: MarvelCharacter }) => (
    <div>{character.name}</div>
  ),
}));

describe('Favorites', () => {
  const navigate = vi.fn();
  const toggleShowFavoritesGrid = vi.fn();
  const isCharacterFavorite = vi.fn().mockReturnValue(true);
  const favoriteCharacters = [
    {
      id: 1,
      name: 'Spider-Man',
      thumbnail: 'https://example.com/spider-man.jpg',
    },
    {
      id: 2,
      name: 'Iron Man',
      thumbnail: 'https://example.com/iron-man.jpg',
    },
  ];

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    (useFavoriteCharacterContext as jest.Mock).mockReturnValue({
      favoriteCharacters,
      showFavoritesGrid: true,
      toggleShowFavoritesGrid,
      isCharacterFavorite,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render favorite characters', () => {
    render(
      <Router>
        <Favorites />
      </Router>,
    );

    expect(screen.getByText('Spider-Man')).toBeInTheDocument();
    expect(screen.getByText('Iron Man')).toBeInTheDocument();
  });

  it('should navigate to home if showFavoritesGrid is false', () => {
    (useFavoriteCharacterContext as jest.Mock).mockReturnValueOnce({
      favoriteCharacters,
      showFavoritesGrid: false,
      toggleShowFavoritesGrid,
      isCharacterFavorite,
    });

    render(
      <Router>
        <Favorites />
      </Router>,
    );

    expect(navigate).toHaveBeenCalledWith('/');
  });
});
