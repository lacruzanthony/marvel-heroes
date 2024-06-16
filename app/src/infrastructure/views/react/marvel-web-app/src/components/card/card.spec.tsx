import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card } from './card';
import { BrowserRouter as Router } from 'react-router-dom';
import { useCharacterContext } from '../contexts/characters-context';
import { useFavoriteCharacterContext } from '../contexts/favorite-character';
import { vi } from 'vitest';

vi.mock('../contexts/characters-context');
vi.mock('../contexts/favorite-character');

const mockUseCharacterContext = useCharacterContext as jest.Mock;
const mockUseFavoriteCharacterContext =
  useFavoriteCharacterContext as jest.Mock;

describe('Card', () => {
  const setCharacterDetail = vi.fn();
  const toggleFavorite = vi.fn();
  const isCharacterFavorite = vi.fn();

  const character = {
    id: 1,
    name: 'Iron',
    description: 'Tony Stark',
    thumbnail:
      'https://i.annihil.us/u/prod/marvel/i/mg/f/60/000086d515b37/standard_fantastic.jpg',
    comics: {
      id: 1,
      title: 'Iron Man (1968 - 1996) #1',
      description: '',
      thumbnail:
        'https://i.annihil.us/u/prod/marvel/i/mg/6/60/642ddeb849005.jpg',
      year: 1968,
    },
    isFavorite: true,
  };

  beforeEach(() => {
    mockUseCharacterContext.mockReturnValue({
      setCharacterDetail,
    });
    mockUseFavoriteCharacterContext.mockReturnValue({
      toggleFavorite,
      isCharacterFavorite,
    });
    isCharacterFavorite.mockReturnValue(false);
  });

  it('should render the character card', () => {
    render(
      <Router>
        <Card character={character} />
      </Router>,
    );

    expect(screen.getByAltText('Iron')).toBeInTheDocument();
    expect(screen.getByText('Iron')).toBeInTheDocument();
  });

  it('should navigate to the character detail page on link click', () => {
    render(
      <Router>
        <Card character={character} />
      </Router>,
    );

    const link = screen.getByRole('link', {
      name: /Iron/i,
    });
    fireEvent.click(link);

    expect(setCharacterDetail).toHaveBeenCalledWith(character);
  });

  it('should toggle favorite state on button click', () => {
    render(
      <Router>
        <Card character={character} />
      </Router>,
    );

    const button = screen.getByRole('button', {
      name: /favorite-button/i,
    });
    fireEvent.click(button);

    expect(toggleFavorite).toHaveBeenCalledWith(character);
  });

  it('should display the correct favorite icon based on favorite state', () => {
    isCharacterFavorite.mockReturnValue(true);

    render(
      <Router>
        <Card character={character} />
      </Router>,
    );

    const favoritesSelected =
      '/src/assets/character-grid-selected-heart.svg';
    screen.logTestingPlaygroundURL();

    expect(screen.getByAltText('favorite-button')).toHaveAttribute(
      'src',
      favoritesSelected,
    );
  });
});
