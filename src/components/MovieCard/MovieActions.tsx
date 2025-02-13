import React from "react";

interface MovieActionsProps {
  title: string;
  liked: "like" | "dislike";
  onDelete: (title: string) => void;
  onToggleLike: () => void;
}

const MovieActions: React.FC<MovieActionsProps> = ({ title, liked, onDelete, onToggleLike }) => {
  return (
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
        onClick={onToggleLike}
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
  );
};

export default MovieActions;
