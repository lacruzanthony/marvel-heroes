import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';
import { Header } from './header';
import { useFavoriteCharacterContext } from '../contexts/favorite-character';
import { useLocation } from 'react-router-dom';

vi.mock('../contexts/favorite-character', () => ({
  useFavoriteCharacterContext: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

describe('Header', () => {
  const toggleShowFavoritesGrid = vi.fn();
  const favoriteCharacters = [{ id: 1 }, { id: 2 }];
  const mockUseLocation = vi.mocked(useLocation);

  beforeEach(() => {
    mockUseLocation.mockReturnValue({
      pathname: '/',
      state: undefined,
      key: '',
      search: '',
      hash: '',
    });
    (useFavoriteCharacterContext as jest.Mock).mockReturnValue({
      showFavoritesGrid: false,
      toggleShowFavoritesGrid,
      favoriteCharacters,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the Marvel logo and favorite icon', () => {
    render(
      <Router>
        <Header />
      </Router>,
    );

    expect(screen.getByAltText('marvel-logo')).toBeInTheDocument();
    expect(screen.getByAltText('favorites')).toBeInTheDocument();
  });

  it('should display the number of favorite characters', () => {
    render(
      <Router>
        <Header />
      </Router>,
    );

    expect(
      screen.getByText(favoriteCharacters.length.toString()),
    ).toBeInTheDocument();
  });

  it('should call toggleShowFavoritesGrid when clicking the favorites link', () => {
    render(
      <Router>
        <Header />
      </Router>,
    );

    const favoritesLink = screen.getByRole('link', {
      name: /favorites/i,
    });
    fireEvent.click(favoritesLink);

    expect(toggleShowFavoritesGrid).toHaveBeenCalled();
  });

  it('should call onClickHomeHandler when clicking the home link if on favorites page', () => {
    mockUseLocation.mockReturnValueOnce({
      pathname: '/favorites',
      state: undefined,
      key: '',
      search: '',
      hash: '',
    });
    render(
      <Router>
        <Header />
      </Router>,
    );

    const homeLink = screen.getByRole('link', {
      name: /marvel-logo/i,
    });
    fireEvent.click(homeLink);

    expect(toggleShowFavoritesGrid).toHaveBeenCalled();
  });

  it('should not call toggleShowFavoritesGrid when clicking the home link if not on favorites page', () => {
    render(
      <Router>
        <Header />
      </Router>,
    );

    const homeLink = screen.getByRole('link', {
      name: /marvel-logo/i,
    });
    fireEvent.click(homeLink);

    expect(toggleShowFavoritesGrid).not.toHaveBeenCalled();
  });
});
