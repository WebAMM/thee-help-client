import React, { useState, useEffect } from "react";
import "./pagination.scss";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const [totalPages, setTotalPages] = useState(0);
  const [displayPages, setDisplayPages] = useState([]);

  useEffect(() => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    setTotalPages(totalPages);
  }, [totalItems, itemsPerPage]);

  useEffect(() => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    setDisplayPages(pages);
  }, [currentPage, totalPages]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    onPageChange(page);
  };

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <div className="page-item">
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
        </div>
      )}

      {displayPages.map((page) => (
        <div
          key={page}
          className={`page-item ${currentPage === page ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => handlePageChange(page)}>
            {page}
          </button>
        </div>
      ))}

      {currentPage < totalPages && (
        <div className="page-item">
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
