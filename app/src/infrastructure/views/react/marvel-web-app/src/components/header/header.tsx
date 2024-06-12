import marvelLogo from '../../assets/marvel-logo.svg';
import favorites from '../../assets/heart-selected.svg';
import { Link, Outlet } from 'react-router-dom';

export const Header = () => {
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
            src={favorites}
            alt="favorites"
            className="h-8 sm:h-12"
          />
        </div>
      </header>
      <Outlet />
    </>
  );
};
