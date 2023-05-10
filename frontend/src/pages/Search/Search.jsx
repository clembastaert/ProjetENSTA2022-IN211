import './Search.css';
import React, { useEffect, useState } from 'react';
import Movie from '../../components/Movie/Movie';
import generatePaginationButtons from '../../pagination';

function Search({ movieName, movies }) {
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 45;

  useEffect(() => {
    setCurrentPage(1);
  }, [movieName]);

  const filteredMovies = movies.filter((movie) => {
    return movie.title.toLowerCase().includes(movieName.toLowerCase());
  });

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (filteredMovies.length === 0) {
    return (
      <div className="MovieDisplayed">
        <p> Recherche pour '{movieName}' : </p>
        <p> Aucun film ne correspond à votre recherche. </p>
      </div>
    );
  }

  // Générer les boutons de pagination
  const paginationButtons = generatePaginationButtons(
    currentPage,
    totalPages,
    handlePageClick
  )

  return (
    <div>
      <p className="MovieDisplayed"> Recherche pour '{movieName}' : </p>
      <div className="MovieListP">
        {currentMovies.map((movie) => (
          <Movie movie={movie} />
        ))}
      </div>
      <div className="Pagination">{paginationButtons}</div>
    </div>
  );
}

export default Search;
