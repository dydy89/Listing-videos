import React from "react";

interface MovieInfoProps {
  title: string;
  category: string;
  likes: number;
  dislikes: number;
}

const MovieInfo: React.FC<MovieInfoProps> = ({ title, category, likes, dislikes }) => {
  const totalVotes = likes + dislikes;
  const likePercentage = totalVotes ? Math.round((likes / totalVotes) * 100) : 0;
  const dislikePercentage = totalVotes ? Math.round((dislikes / totalVotes) * 100) : 0;

  return (
    <div className="mt-3">
      <h2 className="font-bold text-lg">{title}</h2>
      <p className="text-gray-400">{category}</p>

      {/* ✅ Affichage des pourcentages */}
      <div className="flex justify-between text-sm font-semibold mt-2">
        <span className="text-green-400">{likePercentage}% 👍</span>
        <span className="text-red-400">{dislikePercentage}% 👎</span>
      </div>

      {/* ✅ Jauge dynamique */}
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
    </div>
  );
};

export default MovieInfo;
