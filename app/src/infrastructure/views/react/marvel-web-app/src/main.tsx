import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import ErrorPage from './error-page.tsx';
import { Header } from './components/header/header.tsx';
import CharactersGrid, {
  loader as CharactersLoader,
} from './components/characters-grid/characters-grid';
import { CharacterProvider } from './components/contexts/characters-context';
import CharacterDetail from './components/character-detail/character-detail';
import CharacterComicList, {
  loader as CharacterDetailLoader,
} from './components/character-comic-list/character-comic-list';
import { FavoriteCharacterProvider } from './components/contexts/favorite-character.tsx';
import { SearchBar } from './components/search-bar/search-bar.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: (
          <>
            <SearchBar placeholder="Search a character..." />
            <CharactersGrid />,
          </>
        ),
        loader: CharactersLoader,
      },
      {
        path: '/character/:id',
        loader: CharacterDetailLoader,
        element: (
          <>
            <CharacterDetail />
            <CharacterComicList />
          </>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CharacterProvider>
      <FavoriteCharacterProvider>
        <RouterProvider router={router} />
      </FavoriteCharacterProvider>
    </CharacterProvider>
  </React.StrictMode>,
);
