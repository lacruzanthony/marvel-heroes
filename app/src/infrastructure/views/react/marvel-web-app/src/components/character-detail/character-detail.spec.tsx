import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CharacterDetail } from './character-detail';
import { useCharacterContext } from '../contexts/characters-context';
import { useFavoriteCharacterContext } from '../contexts/favorite-character';
import { vi } from 'vitest';
import emptyHeart from '../../assets/heart-default.svg';
import selectedHeart from '../../assets/heart-selected.svg';

vi.mock('../contexts/characters-context');
vi.mock('../contexts/favorite-character');

const mockUseCharacterContext = useCharacterContext as jest.Mock;
const mockUseFavoriteCharacterContext =
  useFavoriteCharacterContext as jest.Mock;

describe('CharacterDetail', () => {
  const toggleFavorite = vi.fn();
  const isCharacterFavorite = vi.fn();

  const characterDetail = {
    id: 1,
    name: 'Spider-Man',
    description: 'Friendly neighborhood Spider-Man.',
    thumbnail: 'https://example.com/spider-man.jpg',
  };

  beforeEach(() => {
    mockUseCharacterContext.mockReturnValue({
      characterDetail,
    });
    mockUseFavoriteCharacterContext.mockReturnValue({
      toggleFavorite,
      isCharacterFavorite,
    });
    isCharacterFavorite.mockReturnValue(false);
  });

  it('should render character details', () => {
    render(<CharacterDetail />);

    expect(screen.getByText('Spider-Man')).toBeInTheDocument();
    expect(
      screen.getByText('Friendly neighborhood Spider-Man.'),
    ).toBeInTheDocument();
    expect(screen.getByAltText('Spider-Man')).toBeInTheDocument();
  });

  it('should display the correct favorite icon based on favorite state', () => {
    render(<CharacterDetail />);

    const favoriteIcon = screen.getAllByRole('img', {
      name: /favorites/i,
    })[0];
    expect(favoriteIcon).toHaveAttribute('src', emptyHeart);

    // Update mock to return true and re-render to check favorite state
    isCharacterFavorite.mockReturnValue(true);

    render(<CharacterDetail />);

    screen.logTestingPlaygroundURL();

    expect(
      screen.getAllByRole('img', { name: /favorites/i })[1],
    ).toHaveAttribute('src', selectedHeart);
  });

  it('should toggle favorite state on button click', () => {
    render(<CharacterDetail />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(toggleFavorite).toHaveBeenCalledWith(characterDetail);
  });
});
