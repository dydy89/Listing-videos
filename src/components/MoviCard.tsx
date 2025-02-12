import React, { useState } from "react";

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
  // ✅ Par défaut, l'utilisateur a disliké
  const [liked, setLiked] = useState<"dislike" | "like">(() => {
    return likes > dislikes ? "like" : "dislike";
  });
  
  const [hover, setHover] = useState(false);

  const handleToggle = () => {
    setLiked((prevLiked) => {
      const newLiked = prevLiked === "like" ? "dislike" : "like";
      onLikeDislike(title, newLiked);
      return newLiked;
    });
  };

  // ✅ Calcul des pourcentages
  const totalVotes = likes + dislikes;
  const likePercentage = totalVotes ? Math.round((likes / totalVotes) * 100) : 0;
  const dislikePercentage = totalVotes ? Math.round((dislikes / totalVotes) * 100) : 0;

  return (
    <div className="bg-gray-800 text-white shadow-lg rounded-lg p-4 w-80 transition transform hover:scale-105">
      <div
        className="relative w-full h-[400px] bg-black rounded-md overflow-hidden"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img 
          src={image} 
          alt={title} 
          className={`w-full h-full object-cover transition-all duration-300 ${hover ? "opacity-50" : "opacity-100"}`} 
        />
        {hover && (
          <div className="absolute inset-0 flex items-center justify-center text-center bg-black bg-opacity-50 text-white p-4">
            <p className="text-sm">Un excellent film {category} qui ne manquera pas de vous captiver !</p>
          </div>
        )}
      </div>
      <div className="mt-3">
        <h2 className="font-bold text-lg">{title}</h2>
        <p className="text-gray-400">{category}</p>

        {/* ✅ Affichage des pourcentages */}
        <div className="flex justify-between text-sm font-semibold mt-2">
          <span className="text-green-400">{likePercentage}% 👍</span>
          <span className="text-red-400">{dislikePercentage}% 👎</span>
        </div>

        {/* ✅ Jauge dynamique avec pourcentage */}
        <div className="mt-2 h-2 w-full bg-gray-600 rounded-full relative">
          <div
            className="absolute h-full bg-green-500 rounded-full transition-all duration-300"
            style={{ width: `${likePercentage}%` }}
          ></div>
          <div
            className="absolute h-full bg-red-500 rounded-full transition-all duration-300"
            style={{ left: `${likePercentage}%`, width: `${dislikePercentage}%` }}
          ></div>
        </div>

        {/* ✅ Bouton Supprimer & Toggle Like/Dislike */}
        <div className="mt-4 flex justify-between items-center">
          {/* 🗑️ Bouton Supprimer */}
          <button 
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md shadow-md transition-all"
            onClick={() => onDelete(title)}
          >
            Supprimer
          </button>

          {/* 🎛️ Toggle Like/Dislike */}
          <div 
            className="relative w-24 h-12 bg-gray-700 rounded-full flex items-center p-1 cursor-pointer shadow-md"
            onClick={handleToggle}
          >
            <div
              className={`absolute w-10 h-10 bg-white rounded-full transition-all duration-300 shadow-lg ${
                liked === "like" ? "translate-x-12 bg-green-500" : "translate-x-0 bg-red-500"
              }`}
            ></div>
            <div className="w-1/2 h-full flex justify-center items-center text-green-400 font-bold">👍</div>
            <div className="w-1/2 h-full flex justify-center items-center text-red-400 font-bold">👎</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
