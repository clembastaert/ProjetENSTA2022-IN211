import './Home.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Movie from '../../components/Movie/Movie';

function Home({ movies }) {
  const [genres, setGenres] = useState([]);
  function filteredMovies(id) {
    return movies.filter((movie) => movie.genre_ids.includes(parseInt(id)));
    // return movies.filter((movie) => movie.genre_ids[0] === parseInt(id));
  }

  useEffect(() => {
    async function fetchGenres() {
      const response = await axios.get(
        'https://api.themoviedb.org/3/genre/movie/list',
        {
          params: {
            api_key: '15d2ea6d0dc1d476efbca3eba2b9bbfb',
            language: 'fr-FR',
          },
        }
      );
      const sortedGenres = response.data.genres.sort(
        (a, b) => b.popularity - a.popularity
      );
      const popularGenres = sortedGenres.slice(0, 15);
      setGenres(popularGenres);
    }

    fetchGenres();
  }, []);

  return (
    <div className="categories">
      {genres.map((genre) => (
        <div className="categorie">
          <Link
            className="LinkCM"
            to={`/categories/${genre.id}`}
            key={genre.id}
          >
            {genre.name}
          </Link>
          <div className="MovieList">
            {filteredMovies(genre.id).map((movie) => (
              <Movie movie={movie} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
