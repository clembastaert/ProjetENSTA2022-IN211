import './Movie.css';
import { Link } from 'react-router-dom';
import React from 'react';

function Movie({ movie }) {

  return (
    <div className="movie" key={movie.id}>
      <Link to={`/films/${movie.id}`}>
        <img src={`${movie.poster_path}`} alt={movie.title} />
      </Link>
      <p className="movieTitle">{movie.title}</p>
    </div>
  );
}

export default Movie;
