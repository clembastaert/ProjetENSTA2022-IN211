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
    axios
      .get(
        'https://api.themoviedb.org/3/movie/popular?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&language=fr&page=1'
      )
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.results);
      })
      .catch((error) => console.error(error));
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
        <Route path="categories" element={<Categories />} />
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
