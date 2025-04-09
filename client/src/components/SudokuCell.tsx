import React from "react";
import { AlbumIcons, type Album } from "../assets/icons";

interface SudokuCellProps {
  row: number;
  col: number;
  value: number | null;
  isSelected: boolean;
  onClick: (row: number, col: number, event: React.MouseEvent) => void;
  isLocked: boolean;
}

const SudokuCell: React.FC<SudokuCellProps> = ({
  row,
  col,
  value,
  isSelected,
  onClick,
  isLocked,
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

  return (
    <button
      className={`grid-cell w-full aspect-square ${borderRight} ${borderBottom} border-gray-300 flex items-center justify-center ${bgColor} focus:bg-selection/30 transition-colors duration-200 text-lg focus:outline-none`}
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
    </button>
  );
};

export default SudokuCell;
