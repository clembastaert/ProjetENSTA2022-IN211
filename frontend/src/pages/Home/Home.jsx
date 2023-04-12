import './Home.css';
import React from 'react';
import Movie from '../../components/Movie/Movie';

function Home({ movieName, movies }) {
  const filteredMovies = movies.filter((movie) => {
    return movie.title.toLowerCase().includes(movieName.toLowerCase());
  });

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

export default Home;
