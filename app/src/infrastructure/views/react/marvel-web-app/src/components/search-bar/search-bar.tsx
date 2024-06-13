import './styles.css';
import React, { ChangeEvent } from 'react';
import searchIcon from '../../assets/glass.svg'; // Asegúrate de que la ruta sea correcta
import { useCharacterContext } from '../contexts/characters-context';

interface SearchBarProps {
  placeholder: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
}) => {
  const [searchValue, setSearchValue] = React.useState('');
  const { characters, setCharacters, setShowFilteredCharacters } =
    useCharacterContext();

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    if (event.target.value === '') {
      setShowFilteredCharacters(false);
      return;
    }

    const filterdCharacters = characters.filter((character) =>
      character.name.toLowerCase().includes(event.target.value),
    );

    setCharacters(filterdCharacters);
    setShowFilteredCharacters(true);
  };

  return (
    <>
      <div className="container search-bar-container mt-3">
        <img src={searchIcon} alt="Search" className="search-icon" />
        <input
          type="text"
          value={searchValue}
          onChange={onChangeHandler}
          className="form-control search-input border rounded-0 border-black border-start-0 border-end-0 border-top-0"
          placeholder={placeholder.toUpperCase()}
        />
      </div>
      <pre className="container fw-light mt-2">50 results</pre>
    </>
  );
};
