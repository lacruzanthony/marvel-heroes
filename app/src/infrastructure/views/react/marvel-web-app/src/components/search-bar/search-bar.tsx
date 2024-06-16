import './styles.css';
import React, { ChangeEvent, useEffect } from 'react';
import searchIcon from '../../assets/glass.svg';
import { getCharacters } from '../../services/characters';
import { useCharacterContext } from '../contexts/characters-context';
import { useDebounce } from '@uidotdev/usehooks';
import { MarvelCharacter } from '../../services/types';

interface SearchBarProps {
  placeholder: string;
}

const DEBOUNCE_TIME = 500;

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
}) => {
  const [searchValue, setSearchValue] = React.useState(() => {
    const query = new URLSearchParams(window.location.search).get(
      'q',
    );
    return query || '';
  });
  const { setCharacters, characters, setShowFilteredCharacters } =
    useCharacterContext();

  const debouncedSearch = useDebounce(searchValue, DEBOUNCE_TIME);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  /**
   * Updates the browser's URL to include the current search value.
   *
   * @returns {void}
   */
  useEffect(() => {
    const pathName =
      debouncedSearch === '' ? '/' : `/?q=${debouncedSearch}`;
    window.history.replaceState(null, '', pathName);
  }, [debouncedSearch]);

  useEffect(() => {
    /**
     * Fetches characters based on the debounced search value and updates the character state.
     *
     * @returns {void} No return value
     */
    const fetchCharacters = async () => {
      const characters = (await getCharacters(
        debouncedSearch,
      )) as MarvelCharacter[];
      setCharacters(characters);
      setShowFilteredCharacters(true);
    };
    fetchCharacters();
  }, [debouncedSearch, setCharacters, setShowFilteredCharacters]);

  return (
    <>
      <div className="container search-bar-container mt-3">
        <img src={searchIcon} alt="Search" className="search-icon" />
        <form className="w-100">
          <input
            type="search"
            value={searchValue}
            onChange={onChangeHandler}
            className="form-control search-input border rounded-0 border-black border-start-0 border-end-0 border-top-0"
            placeholder={placeholder.toUpperCase()}
          />
        </form>
      </div>
      <pre className="container fw-light mt-2">
        {characters.length} results
      </pre>
    </>
  );
};
