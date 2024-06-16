import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchBar } from './search-bar';
import { useCharacterContext } from '../contexts/characters-context';
import { getCharacters } from '../../services/characters';
import { describe, expect, it, vi } from 'vitest';
import { MarvelCharacter } from '../../services/types';

vi.mock('../contexts/characters-context');
vi.mock('../../services/characters');

const mockUseCharacterContext = vi.mocked(useCharacterContext);
const mockGetCharacters = vi.mocked(getCharacters);

describe('SearchBar', () => {
  const setCharacters = vi.fn();
  const setShowFilteredCharacters = vi.fn();
  const setCharacterDetail = vi.fn();
  const showFilteredCharacters = false;
  const characters: MarvelCharacter[] = [
    {
      id: 1011334,
      name: '3-D Man',
      description: '',
      thumbnail:
        'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784.jpg',
      comics: {
        id: 21366,
        year: 2007,
        title: 'Avengers: The Initiative (2007) #14',
        description: '',
        thumbnail: '',
      },
    },
  ];
  const characterDetail = undefined;

  beforeEach(() => {
    mockUseCharacterContext.mockReturnValue({
      setCharacters,
      characters,
      setShowFilteredCharacters,
      characterDetail,
      showFilteredCharacters,
      setCharacterDetail,
    });
    mockGetCharacters.mockResolvedValue([]);
  });

  it('should render the search bar with a placeholder', () => {
    render(<SearchBar placeholder="Search a character..." />);
    expect(
      screen.getByPlaceholderText('SEARCH A CHARACTER...'),
    ).toBeInTheDocument();
  });

  it('should update the search value when typed into', () => {
    render(<SearchBar placeholder="Search a character..." />);

    const input = screen.getByPlaceholderText(
      'SEARCH A CHARACTER...',
    );
    fireEvent.change(input, { target: { value: 'Spider-Man' } });

    expect(input).toHaveValue('Spider-Man');
  });

  it('should fetch characters when the debounced search value changes', async () => {
    render(<SearchBar placeholder="Search a character..." />);

    const input = screen.getByPlaceholderText(
      'SEARCH A CHARACTER...',
    );
    fireEvent.change(input, { target: { value: 'Spider-Man' } });

    await waitFor(() => {
      expect(mockGetCharacters).toHaveBeenCalledWith('Spider-Man');
      expect(setCharacters).toHaveBeenCalled();
      expect(setShowFilteredCharacters).toHaveBeenCalledWith(true);
    });
  });

  it('should update the URL with the search query', async () => {
    render(<SearchBar placeholder="Search a character..." />);

    const input = screen.getByPlaceholderText(
      'SEARCH A CHARACTER...',
    );
    fireEvent.change(input, { target: { value: 'Spider-Man' } });

    await waitFor(() => {
      expect(window.location.search).toBe('?q=Spider-Man');
    });
  });

  it('should display the number of results', () => {
    mockUseCharacterContext.mockReturnValue({
      setCharacters,
      characters,
      setShowFilteredCharacters,
      characterDetail,
      showFilteredCharacters,
      setCharacterDetail,
    });
    mockGetCharacters.mockResolvedValue([]);

    render(<SearchBar placeholder="Search a character..." />);
    expect(screen.getByText('1 results')).toBeInTheDocument();
  });
});
