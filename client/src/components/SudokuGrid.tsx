import React, { useState, useEffect, useCallback, useRef } from "react";
import SudokuCell from "./SudokuCell";
import AlbumSelector from "./AlbumSelector";
import { AlbumIcons } from "../assets/icons";

interface SudokuGridProps {
  grid: (number | null)[][];
  onCellChange: (row: number, col: number, value: number | null) => void;
  lockedCells: boolean[][];
}

const SudokuGrid: React.FC<SudokuGridProps> = ({ grid, onCellChange, lockedCells }) => {
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [selectorPosition, setSelectorPosition] = useState<{ x: number; y: number } | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleCellClick = useCallback((row: number, col: number, event: React.MouseEvent) => {
    // If clicking on a locked cell, just select it but don't show selector
    if (lockedCells[row][col]) {
      setSelectedCell({ row, col });
      return;
    }

    // Get the position of the click to position the selector
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setSelectorPosition({
      x: rect.left + rect.width / 2,
      y: rect.bottom
    });
    
    // Select the cell and open the selector
    setSelectedCell({ row, col });
    setSelectorOpen(true);
  }, [lockedCells]);

  // Handle value selection from the album selector
  const handleAlbumSelect = useCallback((value: number | null) => {
    if (selectedCell) {
      onCellChange(selectedCell.row, selectedCell.col, value);
    }
  }, [selectedCell, onCellChange]);

  // Close selector
  const handleCloseSelector = useCallback(() => {
    setSelectorOpen(false);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCell || selectorOpen) return;

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
            // Instead of cycling, open the selector
            const element = document.querySelector(`[data-cell="${row}-${col}"]`) as HTMLElement;
            if (element) {
              const rect = element.getBoundingClientRect();
              setSelectorPosition({
                x: rect.left + rect.width / 2,
                y: rect.bottom
              });
              setSelectorOpen(true);
            }
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
          // Check if Backspace or Delete was pressed
          if ((e.key === 'Backspace' || e.key === 'Delete') && !lockedCells[row][col]) {
            onCellChange(row, col, null);
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
  }, [selectedCell, lockedCells, onCellChange, selectorOpen]);

  return (
    <div 
      ref={gridRef} 
      className="sudoku-grid grid grid-cols-9 gap-0 border-2 border-primary rounded-md overflow-hidden shadow-md mb-6 max-w-lg w-full relative"
    >
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
      
      <AlbumSelector 
        isOpen={selectorOpen}
        onClose={handleCloseSelector}
        onSelect={handleAlbumSelect}
        position={selectorPosition}
      />
    </div>
  );
};

export default SudokuGrid;
