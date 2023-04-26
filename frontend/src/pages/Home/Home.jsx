import './Home.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Movie from '../../components/Movie/Movie';

function Home({ movies }) {
  const [genres, setGenres] = useState([
    { "id": 28, "name": "Action" },
    { "id": 12, "name": "Aventure" },
    { "id": 16, "name": "Animation" },
    { "id": 35, "name": "Comédie" },
    { "id": 80, "name": "Crime" },
    { "id": 99, "name": "Documentaire" },
    { "id": 18, "name": "Drame" },
    { "id": 10751, "name": "Familial" },
    { "id": 14, "name": "Fantastique" },
    { "id": 36, "name": "Histoire" },
    { "id": 27, "name": "Horreur" },
    { "id": 10402, "name": "Musique" },
    { "id": 9648, "name": "Mystère" },
    { "id": 10749, "name": "Romance" },
    { "id": 878, "name": "Science-Fiction" },
    { "id": 10770, "name": "Téléfilm" },
    { "id": 53, "name": "Thriller" },
    { "id": 10752, "name": "Guerre" },
    { "id": 37, "name": "Western" }]);

  function filteredMovies(id) {
    const moviesByGenre = movies.filter((movie) => parseInt(movie.genre_ids[0]) === parseInt(id));
    return moviesByGenre.sort((a, b) => b.popularity - a.popularity).slice(0, 20);
  }


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
