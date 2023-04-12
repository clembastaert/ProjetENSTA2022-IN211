import './Search.css';
import React from 'react';
import Movie from '../../components/Movie/Movie';

function Search({ movieName, movies }) {
  const filteredMovies = movies.filter((movie) => {
    return movie.title.toLowerCase().includes(movieName.toLowerCase());
  });
  if (filteredMovies.length === 0) {
    return (
      <div className="noFilm">
        {' '}
        <p> Aucun film ne correspond à votre recherche. </p>{' '}
      </div>
    );
  }

  return (
    <div className="App">
      <div className="MovieList">
        {filteredMovies.map((movie) => (
          <Movie movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Search;
