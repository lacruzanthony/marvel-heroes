import './styles.css';
import marvelLogo from '../../assets/marvel-logo.svg';
import emptyHeart from '../../assets/heart-default.svg';
import selectedHeart from '../../assets/heart-selected.svg';
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';

export const Header = () => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected((prevState) => !prevState);
  };

  return (
    <>
      <header className="bg-black">
        <div className="d-flex justify-content-between px-4 py-2  border border-start-0 border-end-0 border-top-0  border-white">
          <Link to="/">
            <img
              src={marvelLogo}
              alt="marvel-logo"
              className="h-8 sm:h-12"
            />
          </Link>
          <img
            src={isSelected ? selectedHeart : emptyHeart}
            alt="favorites"
            className={`h-8 sm:h-12 heart-icon ${
              isSelected ? 'filled' : ''
            }`}
            onClick={handleClick}
          />
        </div>
      </header>
      <Outlet />
    </>
  );
};
