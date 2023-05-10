function generatePaginationButtons(currentPage, totalPages, handlePageClick) {
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
    <button
      key={currentPage}
      onClick={() => handlePageClick(currentPage)}
      className="active"
    >
      {currentPage}
    </button>
  );

  for (
    let i = currentPage + 1;
    i <= Math.min(totalPages, currentPage + 2);
    i++
  ) {
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

  return paginationButtons;
}

export default generatePaginationButtons;
