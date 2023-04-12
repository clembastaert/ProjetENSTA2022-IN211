import './Home.css';
import React from 'react';
import Movie from '../../components/Movie/Movie';

function Home({ movies }) {
  return (
    <div className="App">
      <div className="MovieList">
        {movies.map((movie) => (
          <Movie movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
