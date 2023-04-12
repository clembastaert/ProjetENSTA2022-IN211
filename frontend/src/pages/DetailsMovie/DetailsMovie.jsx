import React from 'react';
import { useParams } from 'react-router-dom';
import './DetailsMovie.css';

function DetailsMovie({ movies }) {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === parseInt(id));

  if (!movie) {
    return (
      <div className="NotMoviePage">
        <p>Le film que vous recherchez n'existe pas.</p>
      </div>
    );
  }

  return (
    <div className="MoviePage">
      <h1>{movie.title}</h1>
      <div className="MoviePresentation">
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="MovieText">
          <p>{movie.overview}</p>
          <p>Date de sortie : {movie.release_date}</p>
          <p>
            Note moyenne : {movie.vote_average}/10 ({movie.vote_count} votes)
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetailsMovie;
