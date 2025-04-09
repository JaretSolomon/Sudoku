import React, { useState, useEffect, useCallback, useRef } from "react";
import SudokuCell from "./SudokuCell";
import AlbumKeypad from "./AlbumKeypad";
import { AlbumIcons } from "../assets/icons";

interface SudokuGridProps {
  grid: (number | null)[][];
  onCellChange: (row: number, col: number, value: number | null) => void;
  lockedCells: boolean[][];
  isNotesMode?: boolean;
  onToggleNotesMode?: () => void;
}

const SudokuGrid: React.FC<SudokuGridProps> = ({ 
  grid, 
  onCellChange, 
  lockedCells,
  isNotesMode = false,
  onToggleNotesMode = () => {}
}) => {
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  
  // State for candidate marks for each cell
  const [candidates, setCandidates] = useState<boolean[][][]>(
    Array(9).fill(null).map(() => 
      Array(9).fill(null).map(() => 
        Array(9).fill(false)
      )
    )
  );
  
  const gridRef = useRef<HTMLDivElement>(null);

  const handleCellClick = useCallback((row: number, col: number, event: React.MouseEvent) => {
    // If clicking on a locked cell, just select it
    if (lockedCells[row][col]) {
      setSelectedCell({ row, col });
      return;
    }

    // Select the cell
    setSelectedCell({ row, col });
    
    // If a value is already selected in the keypad, apply it
    if (selectedValue !== null) {
      if (isNotesMode) {
        // Toggle candidate mark
        handleToggleCandidate(row, col, selectedValue);
      } else {
        // Set the value directly
        onCellChange(row, col, selectedValue);
      }
    }
  }, [lockedCells, selectedValue, isNotesMode, onCellChange]);

  // Handle value selection from the album keypad
  const handleAlbumSelect = useCallback((value: number | null) => {
    setSelectedValue(value);
    
    // If a cell is selected, update its value or candidate marks
    if (selectedCell && !lockedCells[selectedCell.row][selectedCell.col]) {
      if (isNotesMode && value !== null) {
        // Toggle candidate mark
        handleToggleCandidate(selectedCell.row, selectedCell.col, value);
      } else {
        // Set the value directly
        onCellChange(selectedCell.row, selectedCell.col, value);
      }
    }
  }, [selectedCell, lockedCells, isNotesMode, onCellChange]);

  // Function to toggle note mode
  const toggleNotesMode = useCallback(() => {
    onToggleNotesMode();
  }, [onToggleNotesMode]);

  // Function to toggle a candidate value for a cell
  const handleToggleCandidate = useCallback((row: number, col: number, value: number) => {
    if (lockedCells[row][col] || grid[row][col] !== null) return;

    setCandidates(prev => {
      const newCandidates = [...prev];
      // Create a new array for the specific cell to maintain immutability
      newCandidates[row] = [...newCandidates[row]];
      newCandidates[row][col] = [...newCandidates[row][col]];
      // Toggle the candidate value
      newCandidates[row][col][value] = !newCandidates[row][col][value];
      return newCandidates;
    });
  }, [lockedCells, grid]);

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
          if (!lockedCells[row][col] && selectedValue !== null) {
            if (isNotesMode) {
              handleToggleCandidate(row, col, selectedValue);
            } else {
              onCellChange(row, col, selectedValue);
            }
          }
          e.preventDefault(); // Prevent scrolling with space
          return;
        case "n": // Toggle notes mode with 'n' key
          onToggleNotesMode();
          e.preventDefault();
          return;
        default:
          // Check if key is a number between 1-9
          const num = parseInt(e.key);
          if (!isNaN(num) && num >= 1 && num <= 9) {
            // Convert to 0-based index (1 -> 0, 2 -> 1, etc.)
            const value = num - 1;
            setSelectedValue(value);
            
            if (!lockedCells[row][col]) {
              if (isNotesMode) {
                handleToggleCandidate(row, col, value);
              } else {
                onCellChange(row, col, value);
              }
            }
            return;
          }
          // Check if Backspace or Delete was pressed
          if ((e.key === 'Backspace' || e.key === 'Delete') && !lockedCells[row][col]) {
            onCellChange(row, col, null);
            // Also clear all candidates for this cell
            setCandidates(prev => {
              const newCandidates = [...prev];
              newCandidates[row] = [...newCandidates[row]];
              newCandidates[row][col] = Array(9).fill(false);
              return newCandidates;
            });
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
  }, [selectedCell, lockedCells, onCellChange, isNotesMode, selectedValue, handleToggleCandidate]);

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start justify-center">
      <div 
        ref={gridRef} 
        className="sudoku-grid grid grid-cols-9 gap-0 border-2 border-primary rounded-md overflow-hidden shadow-md max-w-lg w-full relative"
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
              candidates={candidates[rowIndex][colIndex]}
              onToggleCandidate={handleToggleCandidate}
              isNotesMode={isNotesMode}
            />
          ))
        )}
      </div>
      
      <div className="controls-section">
        <AlbumKeypad 
          onSelect={handleAlbumSelect}
          selectedValue={selectedValue}
          isNotesMode={isNotesMode}
          onToggleNotesMode={onToggleNotesMode}
        />
      </div>
    </div>
  );
};

export default SudokuGrid;
