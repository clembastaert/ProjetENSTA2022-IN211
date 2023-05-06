import { Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Root } from './components/Root/Root';
import Categories from './pages/Categories/Categories';
import Users from './pages/Users/Users';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import DetailsMovie from './pages/DetailsMovie/DetailsMovie';

function useFetchMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKDEND_URL}/movies/`
      );
      setMovies(response.data.movies);
    };
    fetchMovies();
  }, []);

  return movies;
}

function App() {
  const movies = useFetchMovies();
  const [movieName, setMovieName] = useState('');

  return (
    <Root movieName={movieName} setMovieName={setMovieName}>
      <Routes>
        <Route path="/" element={<Home movies={movies} />} />
        <Route
          path="/categories/:id"
          element={<Categories movies={movies} />}
        />
        <Route
          path="search"
          element={<Search movieName={movieName} movies={movies} />}
        />
        <Route path="users" element={<Users movies={movies} />} />
        <Route path="/films/:id" element={<DetailsMovie movies={movies} />} />
      </Routes>
    </Root>
  );
}

export default App;
