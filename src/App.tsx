import React, { useState, useMemo } from "react";
import MovieCard from "./components/MoviCard";
import Select from "react-select";
import ReactPaginate from "react-paginate";

const moviesData = [
  { title: "Inception", category: "Sci-Fi", likes: 120, dislikes: 30, image: "/images/Inception.jpg" },
  { title: "Titanic", category: "Romance", likes: 150, dislikes: 20, image: "/images/Titanic.jpg" },
  { title: "Equalizer", category: "Action", likes: 200, dislikes: 40, image: "/images/Equalizer.jpg" },
  { title: "Avatar", category: "Sci-Fi", likes: 180, dislikes: 50, image: "/images/Avatar.jpg" },
  { title: "Interstellar", category: "Sci-Fi", likes: 210, dislikes: 60, image: "/images/Interstellar.jpg" },
  { title: "The Notebook", category: "Romance", likes: 170, dislikes: 40, image: "/images/TheNotebook.jpg" },
  { title: "The Dark Knight", category: "Action", likes: 250, dislikes: 10, image: "/images/ThedarkNight.jpg" },
  { title: "Joker", category: "Drame", likes: 220, dislikes: 40, image: "/images/joker.jpg" },
  { title: "Spider-Man", category: "Action", likes: 190, dislikes: 30, image: "/images/spiderman.jpg" },
  { title: "Forrest Gump", category: "Drame", likes: 240, dislikes: 20, image: "/images/forrest-gump.jpg" },
  { title: "The Godfather", category: "Crime", likes: 300, dislikes: 10, image: "/images/Thegodfather.jpg" },
  { title: "Pulp Fiction", category: "Crime", likes: 280, dislikes: 15, image: "/images/PulpFiction.jpg" },
];


const getUniqueCategories = (movies: { category: string }[]) => {
  return Array.from(new Set(movies.map((movie) => movie.category))).map(
    (category) => ({ value: category, label: category })
  );
};

function App() {
  const [movies, setMovies] = useState(moviesData);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Début avec 4 films par page

  const categories = useMemo(() => getUniqueCategories(movies), [movies]);

  const filteredMovies = useMemo(() => {
    if (selectedCategories.length === 0) return movies;
    return movies.filter((movie) => selectedCategories.includes(movie.category));
  }, [movies, selectedCategories]);

  // ✅ Gestion du changement de sélection des catégories
  const handleFilterChange = (selectedOptions: any) => {
    setSelectedCategories(selectedOptions ? selectedOptions.map((option: any) => option.value) : []);
    setCurrentPage(0);
  };

  // ✅ Suppression d'un film
  const handleDelete = (title: string) => {
    setMovies(movies.filter((movie) => movie.title !== title));
  };

  // ✅ Gestion du like/dislike
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
  

  // ✅ Gestion de la pagination dynamique
  const pageCount = Math.ceil(filteredMovies.length / itemsPerPage);
  const displayedMovies = filteredMovies.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  // ✅ Gestion du clic sur une page
  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  // ✅ Gestion du changement de nombre d'éléments par page
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(0); // ✅ Revient à la première page pour éviter d'être sur une page inexistante
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* ✅ Sélection des catégories */}
      <div className="mb-4 w-1/2 mx-auto">
        <Select
          isMulti
          options={categories}
          onChange={handleFilterChange}
          placeholder="Filtrer par catégorie"
          className="text-black"
        />
      </div>

      {/* ✅ Affichage des films */}
      <div className="flex flex-wrap gap-6 justify-center">
        {displayedMovies.map((movie, index) => (
          <MovieCard
            key={index}
            title={movie.title}
            category={movie.category}
            likes={movie.likes}
            dislikes={movie.dislikes}
            image={movie.image}
            onDelete={handleDelete}
            onLikeDislike={handleLikeDislike}
          />
        ))}
      </div>

      {/* ✅ Pagination & Sélecteur d'éléments par page */}
      <div className="mt-6 flex flex-col items-center">
        <ReactPaginate
          previousLabel={"← Précédent"}
          nextLabel={"Suivant →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"flex space-x-2 mt-4"}
          activeClassName={"text-blue-500 font-bold"}
          pageClassName={"border p-2 rounded cursor-pointer hover:bg-gray-700"}
          previousClassName={"border p-2 rounded"}
          nextClassName={"border p-2 rounded"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
        />

        {/* ✅ Sélecteur du nombre d'éléments par page */}
        <div className="mt-4 flex flex-col items-center">
          <label htmlFor="itemsPerPage" className="text-gray-300 mb-2">Films par page :</label>
          <select
            id="itemsPerPage"
            className="p-2 border rounded bg-gray-800 text-white"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;
