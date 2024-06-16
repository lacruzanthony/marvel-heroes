import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CharacterComicList from './character-comic-list';
import { useLoaderData } from 'react-router-dom';
import { vi } from 'vitest';
import { useDraggableSection } from '../hooks/use-draggable-section';

vi.mock('react-router-dom', () => ({
  useLoaderData: vi.fn(),
}));

vi.mock('../hooks/use-draggable-section', () => ({
  useDraggableSection: vi.fn(),
}));

describe('CharacterComicList', () => {
  const comics = [
    {
      id: 1,
      title: 'Comic 1',
      year: 2021,
      thumbnail: 'https://example.com/comic1.jpg',
    },
    {
      id: 2,
      title: 'Comic 2',
      year: 2022,
      thumbnail: 'https://example.com/comic2.jpg',
    },
  ];

  const mockOnMouseDown = vi.fn();

  beforeEach(() => {
    (useLoaderData as jest.Mock).mockReturnValue(comics);
    (useDraggableSection as jest.Mock).mockReturnValue({
      onMouseDown: mockOnMouseDown,
    });
  });

  it('should render the list of comics', () => {
    render(<CharacterComicList />);

    expect(screen.getByText('Comic 1')).toBeInTheDocument();
    expect(screen.getByText('Comic 2')).toBeInTheDocument();
    expect(screen.getByAltText('Comic 1')).toBeInTheDocument();
    expect(screen.getByAltText('Comic 2')).toBeInTheDocument();
  });

  it('should apply draggable behavior', () => {
    render(<CharacterComicList />);

    const comicListContainer = screen
      .getByText('Comic 1')
      .closest('.comic-list-container');
    fireEvent.mouseDown(comicListContainer!);

    expect(mockOnMouseDown).toHaveBeenCalled();
  });
});
