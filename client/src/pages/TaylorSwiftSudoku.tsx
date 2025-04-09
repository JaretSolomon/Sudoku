import React, { useState, useEffect } from "react";
import GameHeader from "../components/GameHeader";
import AlbumLegend from "../components/AlbumLegend";
import SudokuGrid from "../components/SudokuGrid";
import GameControls from "../components/GameControls";
import FeedbackArea from "../components/FeedbackArea";
import GameInstructions from "../components/GameInstructions";
import Footer from "../components/Footer";
import { generatePuzzle, isValidSudoku, isComplete, getHint } from "../lib/sudoku";

const TaylorSwiftSudoku: React.FC = () => {
  // State to store the Sudoku grid data
  const [sudokuGrid, setSudokuGrid] = useState<(number | null)[][]>([]);
  const [lockedCells, setLockedCells] = useState<boolean[][]>([]);
  
  // State for feedback messages
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  // Initialize the game on component mount
  useEffect(() => {
    initializeGame();
  }, []);

  // Function to initialize the game
  const initializeGame = () => {
    const { grid, lockedCells } = generatePuzzle();
    setSudokuGrid(grid);
    setLockedCells(lockedCells);
    setShowSuccess(false);
    setShowError(false);
  };

  // Function to handle cell value changes
  const handleCellChange = (row: number, col: number, value: number | null) => {
    // Don't allow changing locked cells
    if (lockedCells[row][col]) return;

    const newGrid = [...sudokuGrid];
    newGrid[row] = [...newGrid[row]];
    newGrid[row][col] = value;
    setSudokuGrid(newGrid);

    // Clear any feedback messages when user makes a change
    if (showSuccess || showError) {
      setShowSuccess(false);
      setShowError(false);
    }
  };

  // Function to reset the game
  const handleReset = () => {
    initializeGame();
  };

  // Function to validate the current solution
  const handleValidate = () => {
    // First, check if the grid is complete
    const complete = isComplete(sudokuGrid);
    
    // Then check if it's valid
    const valid = isValidSudoku(sudokuGrid);
    
    // Show the appropriate feedback message
    if (complete && valid) {
      setShowSuccess(true);
      setShowError(false);
    } else {
      setShowSuccess(false);
      setShowError(true);
    }
  };

  // Function to provide a hint
  const handleHint = () => {
    const hint = getHint(sudokuGrid, lockedCells);
    if (hint) {
      const { row, col, value } = hint;
      // Update the grid with the hint
      const newGrid = [...sudokuGrid];
      newGrid[row] = [...newGrid[row]];
      newGrid[row][col] = value;
      setSudokuGrid(newGrid);
    }
  };

  // Clear feedback messages
  const clearFeedback = () => {
    setShowSuccess(false);
    setShowError(false);
  };

  // Only render once we have grid data
  if (!sudokuGrid.length || !lockedCells.length) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="bg-pattern min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        <GameHeader />
        
        <div className="flex flex-col items-center">
          <AlbumLegend />
          
          <SudokuGrid 
            grid={sudokuGrid} 
            onCellChange={handleCellChange} 
            lockedCells={lockedCells}
          />
          
          <GameControls 
            onReset={handleReset} 
            onValidate={handleValidate} 
            onHint={handleHint}
          />
          
          <FeedbackArea 
            showSuccess={showSuccess} 
            showError={showError} 
            onClose={clearFeedback}
          />
          
          <GameInstructions />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TaylorSwiftSudoku;
