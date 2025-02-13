import React, { useMemo } from "react";
import Select from "react-select";

const getUniqueCategories = (movies: { category: string }[]) => {
  return Array.from(new Set(movies.map((movie) => movie.category))).map(
    (category) => ({ value: category, label: category })
  );
};

interface Props {
  movies: { category: string }[];
  onFilterChange: (selectedOptions: any) => void;
}

const CategoryFilter: React.FC<Props> = ({ movies, onFilterChange }) => {
  const categories = useMemo(() => getUniqueCategories(movies), [movies]);

  return (
    <div className="mb-4 w-1/2 mx-auto">
      <Select
        isMulti
        options={categories}
        onChange={onFilterChange}
        placeholder="Filtrer par catégorie"
        className="text-black"
      />
    </div>
  );
};

export default CategoryFilter;
