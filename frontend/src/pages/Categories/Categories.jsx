import React from 'react';
import { useParams } from 'react-router-dom';
import Movie from '../../components/Movie/Movie';
import './Categories.css';

function Categories({ movies }) {
  const { id } = useParams();
  const filteredMovies = movies.filter((movie) => movie.genre_ids.includes(id));

  return (
    <div>
      <h1 className="titleCategories"> </h1>
      <div className="MovieListCat">
        {filteredMovies.map((movie) => (
          <Movie movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Categories;
