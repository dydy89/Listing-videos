import React, { useState } from "react";

interface MovieImageProps {
  title: string;
  image: string;
  category: string;
}

const MovieImage: React.FC<MovieImageProps> = ({ title, image, category }) => {
  const [hover, setHover] = useState(false);

  return (
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
  );
};

export default MovieImage;
