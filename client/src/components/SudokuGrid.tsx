import React, { useState, useEffect, useCallback } from "react";
import SudokuCell from "./SudokuCell";
import { AlbumIcons } from "../assets/icons";

interface SudokuGridProps {
  grid: (number | null)[][];
  onCellChange: (row: number, col: number, value: number | null) => void;
  lockedCells: boolean[][];
}

const SudokuGrid: React.FC<SudokuGridProps> = ({ grid, onCellChange, lockedCells }) => {
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);

  const handleCellClick = useCallback((row: number, col: number) => {
    // If clicking on a locked cell, only select it but don't change its value
    if (lockedCells[row][col]) {
      setSelectedCell({ row, col });
      return;
    }

    // If clicking on the already selected cell, cycle its value
    if (selectedCell?.row === row && selectedCell?.col === col) {
      const currentValue = grid[row][col];
      // Cycle to the next value (null -> 0, 0 -> 1, ..., 8 -> null)
      const nextValue = currentValue === null ? 0 : currentValue === 8 ? null : currentValue + 1;
      onCellChange(row, col, nextValue);
    } else {
      // Otherwise, just select the cell
      setSelectedCell({ row, col });
    }
  }, [selectedCell, grid, onCellChange, lockedCells]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCell) return;

      const { row, col } = selectedCell;
      let newRow = row;
      let newCol = col;

      switch (e.key) {
        case "ArrowUp":
          newRow = Math.max(0, row - 1);
          break;
        case "ArrowDown":
          newRow = Math.min(8, row + 1);
          break;
        case "ArrowLeft":
          newCol = Math.max(0, col - 1);
          break;
        case "ArrowRight":
          newCol = Math.min(8, col + 1);
          break;
        case "Enter":
        case " ": // Space key
          if (!lockedCells[row][col]) {
            const currentValue = grid[row][col];
            const nextValue = currentValue === null ? 0 : currentValue === 8 ? null : currentValue + 1;
            onCellChange(row, col, nextValue);
          }
          e.preventDefault(); // Prevent scrolling with space
          return;
        default:
          // Check if key is a number between 1-9
          const num = parseInt(e.key);
          if (!isNaN(num) && num >= 1 && num <= 9 && !lockedCells[row][col]) {
            // Convert to 0-based index (1 -> 0, 2 -> 1, etc.)
            onCellChange(row, col, num - 1);
            return;
          }
          return;
      }

      if (newRow !== row || newCol !== col) {
        setSelectedCell({ row: newRow, col: newCol });
        e.preventDefault(); // Prevent scrolling with arrow keys
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCell, grid, onCellChange, lockedCells]);

  return (
    <div className="sudoku-grid grid grid-cols-9 gap-0 border-2 border-primary rounded-md overflow-hidden shadow-md mb-6 max-w-lg w-full">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <SudokuCell
            key={`${rowIndex}-${colIndex}`}
            row={rowIndex}
            col={colIndex}
            value={cell}
            isSelected={
              selectedCell?.row === rowIndex && selectedCell?.col === colIndex
            }
            onClick={handleCellClick}
            isLocked={lockedCells[rowIndex][colIndex]}
          />
        ))
      )}
    </div>
  );
};

export default SudokuGrid;
