import React from 'react';
import { useParams } from 'react-router-dom';
import Movie from '../../components/Movie/Movie';

function Categories({ movies }) {
  const { id } = useParams();
  const filteredMovies = movies.filter((movie) =>
    movie.genre_ids.includes(parseInt(id))
  );

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

export default Categories;
