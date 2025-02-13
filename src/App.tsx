import React, { useState, useMemo } from "react";
import MovieList from "./components/MovieList";
import CategoryFilter from "./components/CategoryFilter";
import Pagination from "./components/Pagination";
import moviesData from "./data/moviesData";

function App() {
  const [movies, setMovies] = useState(moviesData);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const filteredMovies = useMemo(() => {
    if (selectedCategories.length === 0) return movies;
    return movies.filter((movie) => selectedCategories.includes(movie.category));
  }, [movies, selectedCategories]);

  const handleFilterChange = (selectedOptions: any) => {
    setSelectedCategories(selectedOptions ? selectedOptions.map((option: any) => option.value) : []);
    setCurrentPage(0);
  };

  const handleDelete = (title: string) => {
    setMovies(movies.filter((movie) => movie.title !== title));
  };

  const handleLikeDislike = (title: string, action: "like" | "dislike") => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.title === title
          ? {
              ...movie,
              likes: action === "like" ? movie.likes + 1 : Math.max(0, movie.likes - 1),
              dislikes: action === "dislike" ? movie.dislikes + 1 : Math.max(0, movie.dislikes - 1),
            }
          : movie
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-center text-3xl font-bold mb-6">Bienvenue et découvrez mes films :</h1>
      <CategoryFilter movies={movies} onFilterChange={handleFilterChange} />

      <MovieList
        movies={filteredMovies}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onDelete={handleDelete}
        onLikeDislike={handleLikeDislike}
      />

      <Pagination
        totalItems={filteredMovies.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  );
}

export default App;
