import React from "react";

const GameInstructions: React.FC = () => {
  return (
    <div className="bg-background p-4 rounded-lg max-w-lg w-full">
      <h2 className="font-display text-xl mb-2 text-primary">How to Play</h2>
      <ul className="list-disc list-inside space-y-2 text-sm">
        <li>Click on a cell to cycle through Taylor Swift album icons</li>
        <li>Each row, column, and 3×3 box must contain each icon exactly once</li>
        <li>Use the "Check Solution" button to verify your progress</li>
        <li>Use keyboard navigation (arrow keys) to move between cells</li>
        <li>Press Enter or Space to cycle through icons in the selected cell</li>
      </ul>
    </div>
  );
};

export default GameInstructions;
