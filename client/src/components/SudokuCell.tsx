import React from "react";
import { AlbumIcons, type Album } from "../assets/icons";
import CandidateMarks from "./CandidateMarks";

interface SudokuCellProps {
  row: number;
  col: number;
  value: number | null;
  isSelected: boolean;
  onClick: (row: number, col: number, event: React.MouseEvent) => void;
  isLocked: boolean;
  candidates: boolean[];
  onToggleCandidate: (row: number, col: number, value: number) => void;
  isNotesMode: boolean;
}

const SudokuCell: React.FC<SudokuCellProps> = ({
  row,
  col,
  value,
  isSelected,
  onClick,
  isLocked,
  candidates,
  onToggleCandidate,
  isNotesMode
}) => {
  // Calculate if this cell is at a 3x3 grid boundary (for thicker borders)
  const borderRight = (col + 1) % 3 === 0 && col !== 8 ? "border-r-2" : "border-r";
  const borderBottom = (row + 1) % 3 === 0 && row !== 8 ? "border-b-2" : "border-b";

  // Get the album icon for the current value
  const albumIcon = value !== null ? AlbumIcons[value] : null;

  // Calculate background based on selection state and whether cell is locked
  const bgColor = isSelected
    ? "bg-selection"
    : isLocked
    ? "bg-gray-100"
    : "bg-white hover:bg-selection/30";

  // Function to handle toggling a candidate value
  const handleToggleCandidate = (candidateValue: number) => {
    onToggleCandidate(row, col, candidateValue);
  };

  // Determine if we should show candidates
  // Only show candidates if the cell has no value and has some candidates
  const showCandidates = value === null && candidates.some(c => c) && !isLocked;

  return (
    <button
      className={`grid-cell w-full aspect-square ${borderRight} ${borderBottom} border-gray-300 flex items-center justify-center ${bgColor} focus:bg-selection/30 transition-colors duration-200 text-lg focus:outline-none relative`}
      onClick={(e) => onClick(row, col, e)}
      tabIndex={0}
      data-cell={`${row}-${col}`}
      aria-label={`Cell at row ${row + 1}, column ${col + 1}${
        albumIcon ? `, contains ${albumIcon.name}` : ", empty"
      }`}
    >
      {albumIcon && (
        <span className={`${albumIcon.color} album-icon transition-transform duration-200`}>
          {albumIcon.icon}
        </span>
      )}

      {/* Show candidates if in notes mode or if the cell has no value but has candidates */}
      {showCandidates && (
        <div className="absolute inset-0 p-0.5">
          <CandidateMarks 
            candidates={candidates} 
            onToggleCandidate={handleToggleCandidate}
          />
        </div>
      )}
    </button>
  );
};

// Set default props for optional parameters
SudokuCell.defaultProps = {
  candidates: Array(9).fill(false),
  onToggleCandidate: () => {},
  isNotesMode: false
};

export default SudokuCell;
