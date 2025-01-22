import React from "react";

const Pagination = ({ notesPerPage, totalNotes, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalNotes / notesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          padding: 0,
        }}
      >
        {pageNumbers.map((number) => (
          <li key={number} style={{ display: "inline" }}>
            <button
              style={{
                padding: "5px 10px",
                cursor: "pointer",
                backgroundColor: currentPage === number ? "lightblue" : "white",
                border: "1px solid #ccc",
              }}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
