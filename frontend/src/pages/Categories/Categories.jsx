import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Movie from '../../components/Movie/Movie';
import './Categories.css';

function Categories({ movies }) {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 45;

  const filteredMovies = movies.filter((movie) => movie.genre_ids.includes(id));

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
      <h1 className="titleCategories"> </h1>
      <div className="MovieListCat">
        {currentMovies.map((movie) => (
          <Movie movie={movie} />
        ))}
      </div>
      <div className="Pagination">{paginationButtons}</div>
    </div>
  );
}

export default Categories;
