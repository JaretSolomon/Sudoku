import React from "react";

const GameHeader: React.FC = () => {
  return (
    <header className="text-center mb-6">
      <h1 className="font-display font-bold text-3xl md:text-4xl text-primary mb-2">
        <span className="relative inline-block">
          <span className="absolute -top-1 -left-3 text-accent animate-sparkle">✨</span>
          Taylor Swift Sudoku
          <span className="absolute -bottom-1 -right-3 text-accent animate-sparkle">✨</span>
        </span>
      </h1>
      <p className="font-sans text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
        Fill the grid with Taylor's album icons! Follow Sudoku rules - each icon must appear exactly once in every row, column, and 3×3 box.
      </p>
    </header>
  );
};

export default GameHeader;
