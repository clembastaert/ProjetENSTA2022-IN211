import { Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
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
      const allMovies = [];
      let page = 1;
      while (page <= 10) {
        // fetch 10 pages of popular movies
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&language=fr&page=${page}`
        );
        allMovies.push(...response.data.results);
        page++;
      }
      allMovies.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date)
      );
      setMovies(allMovies);
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
        <Route path="users" element={<Users />} />
        <Route path="/films/:id" element={<DetailsMovie movies={movies} />} />
      </Routes>
    </Root>
  );
}

export default App;
