import React from "react";
import MovieCard from "./MovieCard/MovieCard";

interface Movie {
  title: string;
  category: string;
  likes: number;
  dislikes: number;
  image: string;
}

interface Props {
  movies: Movie[];
  currentPage: number;
  itemsPerPage: number;
  onDelete: (title: string) => void;
  onLikeDislike: (title: string, action: "like" | "dislike") => void;
}

const MovieList: React.FC<Props> = ({ movies, currentPage, itemsPerPage, onDelete, onLikeDislike }) => {
  const displayedMovies = movies.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {displayedMovies.map((movie, index) => (
        <MovieCard
          key={index}
          title={movie.title}
          category={movie.category}
          likes={movie.likes}
          dislikes={movie.dislikes}
          image={movie.image}
          onDelete={onDelete}
          onLikeDislike={onLikeDislike}
        />
      ))}
    </div>
  );
};

export default MovieList;
