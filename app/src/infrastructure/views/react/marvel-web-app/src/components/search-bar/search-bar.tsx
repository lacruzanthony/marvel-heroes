import './styles.css';
import React from 'react';
import searchIcon from '../../assets/glass.svg'; // Asegúrate de que la ruta sea correcta

interface SearchBarProps {
  placeholder: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
}) => {
  return (
    <>
      <div className="container search-bar-container mt-3">
        <img src={searchIcon} alt="Search" className="search-icon" />
        <input
          type="text"
          className="form-control search-input border rounded-0 border-black border-start-0 border-end-0 border-top-0"
          placeholder={placeholder.toUpperCase()}
        />
      </div>
      <pre className="container fw-light mt-2">50 results</pre>
    </>
  );
};
