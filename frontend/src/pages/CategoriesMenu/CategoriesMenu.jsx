import './CategoriesMenu.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CategoriesMenu() {
  const [genres, setGenres] = useState([]);

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
      const popularGenres = sortedGenres.slice(0, 10);
      setGenres(popularGenres);
    }

    fetchGenres();
  }, []);

  return (
    <div className="categories">
      {genres.map((genre) => (
        <div className="categorie">
          <Link to={`/categories/${genre.id}`} key={genre.id}>
            {genre.name}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CategoriesMenu;
