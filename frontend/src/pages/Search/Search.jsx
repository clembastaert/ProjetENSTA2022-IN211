import './Search.css';
import React, { useState } from 'react';
import Movie from '../../components/Movie/Movie';

function Search({ movieName, movies }) {
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 45;

  const filteredMovies = movies.filter((movie) => {
    return movie.title.toLowerCase().includes(movieName.toLowerCase());
  });

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

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
  const paginationButtons = [];
  if (currentPage > 3) {
    paginationButtons.push(
      <button key={1} onClick={() => handlePageClick(1)}>
        1
      </button>
    );
    if (currentPage > 4) {
      paginationButtons.push(<span key="ellipsis1">...</span>);
    }
  }
  for (let i = Math.max(1, currentPage - 2); i < currentPage; i++) {
    paginationButtons.push(
      <button key={i} onClick={() => handlePageClick(i)}>
        {i}
      </button>
    );
  }
  paginationButtons.push(
    <button key={currentPage} onClick={() => handlePageClick(currentPage)} className="active">
      {currentPage}
    </button>
  );
  for (let i = currentPage + 1; i <= Math.min(totalPages, currentPage + 2); i++) {
    paginationButtons.push(
      <button key={i} onClick={() => handlePageClick(i)}>
        {i}
      </button>
    );
  }
  if (currentPage < totalPages - 2) {
    if (currentPage < totalPages - 3) {
      paginationButtons.push(<span key="ellipsis2">...</span>);
    }
    paginationButtons.push(
      <button key={totalPages} onClick={() => handlePageClick(totalPages)}>
        {totalPages}
      </button>
    );
  }

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
