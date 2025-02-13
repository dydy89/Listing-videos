import React from "react";
import ReactPaginate from "react-paginate";

interface Props {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (value: number) => void;
}

const Pagination: React.FC<Props> = ({ totalItems, itemsPerPage, currentPage, onPageChange, onItemsPerPageChange }) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="mt-6 flex flex-col items-center">
      <ReactPaginate
        previousLabel={"← Précédent"}
        nextLabel={"Suivant →"}
        pageCount={pageCount}
        onPageChange={({ selected }) => onPageChange(selected)}
        containerClassName={"flex space-x-2 mt-4"}
        activeClassName={"text-blue-500 font-bold"}
        pageClassName={"border p-2 rounded cursor-pointer hover:bg-gray-700"}
        previousClassName={"border p-2 rounded"}
        nextClassName={"border p-2 rounded"}
        disabledClassName={"opacity-50 cursor-not-allowed"}
      />

      <div className="mt-4 flex flex-col items-center">
        <label htmlFor="itemsPerPage" className="text-gray-300 mb-2">Films par page :</label>
        <select
          id="itemsPerPage"
          className="p-2 border rounded bg-gray-800 text-white"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        >
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={12}>12</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
