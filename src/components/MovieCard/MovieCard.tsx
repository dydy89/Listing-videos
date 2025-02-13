import React, { useState } from "react";
import MovieImage from "./MovieImage";
import MovieInfo from "./MovieInfo";
import MovieActions from "./MovieActions";

interface MovieCardProps {
  title: string;
  category: string;
  likes: number;
  dislikes: number;
  image: string;
  onDelete: (title: string) => void;
  onLikeDislike: (title: string, action: "like" | "dislike") => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, category, likes, dislikes, image, onDelete, onLikeDislike }) => {
  const [liked, setLiked] = useState<"dislike" | "like">(() => (likes > dislikes ? "like" : "dislike"));

  const handleToggle = () => {
    setLiked((prevLiked) => {
      const newLiked = prevLiked === "like" ? "dislike" : "like";
      onLikeDislike(title, newLiked);
      return newLiked;
    });
  };

  return (
    <div className="bg-gray-800 text-white shadow-lg rounded-lg p-4 w-80 transition transform hover:scale-105">
      <MovieImage title={title} image={image} category={category} />
      <MovieInfo title={title} category={category} likes={likes} dislikes={dislikes} />
      <MovieActions title={title} liked={liked} onDelete={onDelete} onToggleLike={handleToggle} />
    </div>
  );
};

export default MovieCard;