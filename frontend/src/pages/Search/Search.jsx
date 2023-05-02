import './Search.css';
import React from 'react';
import Movie from '../../components/Movie/Movie';

function Search({ movieName, movies }) {
  const filteredMovies = movies.filter((movie) => {
    return movie.title.toLowerCase().includes(movieName.toLowerCase());
  });

  if (filteredMovies.length === 0) {
    return (
      <div className="MovieDisplayed">
        <p> Recherche pour '{movieName}' : </p>
        <p> Aucun film ne correspond à votre recherche. </p>
      </div>
    );
  }

  return (
    <div>
      <p className="MovieDisplayed"> Recherche pour '{movieName}' : </p>
      <div className="MovieListP">
        {filteredMovies.map((movie) => (
          <Movie movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Search;
