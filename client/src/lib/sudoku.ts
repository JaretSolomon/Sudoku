// Function to check if a Sudoku grid is valid
export const isValidSudoku = (grid: (number | null)[][]): boolean => {
  // Check if any rows, columns, or boxes have duplicates
  return (
    checkRows(grid) && checkColumns(grid) && checkBoxes(grid)
  );
};

// Check if all rows are valid (no duplicates)
const checkRows = (grid: (number | null)[][]): boolean => {
  for (let row = 0; row < 9; row++) {
    const seen = new Set<number>();
    for (let col = 0; col < 9; col++) {
      const value = grid[row][col];
      if (value !== null) {
        if (seen.has(value)) {
          return false; // Duplicate found
        }
        seen.add(value);
      }
    }
  }
  return true;
};

// Check if all columns are valid (no duplicates)
const checkColumns = (grid: (number | null)[][]): boolean => {
  for (let col = 0; col < 9; col++) {
    const seen = new Set<number>();
    for (let row = 0; row < 9; row++) {
      const value = grid[row][col];
      if (value !== null) {
        if (seen.has(value)) {
          return false; // Duplicate found
        }
        seen.add(value);
      }
    }
  }
  return true;
};

// Check if all 3x3 boxes are valid (no duplicates)
const checkBoxes = (grid: (number | null)[][]): boolean => {
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const seen = new Set<number>();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const row = boxRow * 3 + i;
          const col = boxCol * 3 + j;
          const value = grid[row][col];
          if (value !== null) {
            if (seen.has(value)) {
              return false; // Duplicate found
            }
            seen.add(value);
          }
        }
      }
    }
  }
  return true;
};

// Check if the Sudoku is complete (all cells filled)
export const isComplete = (grid: (number | null)[][]): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === null) {
        return false;
      }
    }
  }
  return true;
};

// Generate a random Sudoku puzzle (partially filled)
export const generatePuzzle = (): { grid: (number | null)[][], lockedCells: boolean[][] } => {
  // Create an empty 9x9 grid
  const grid: (number | null)[][] = Array(9).fill(null).map(() => Array(9).fill(null));
  const lockedCells: boolean[][] = Array(9).fill(null).map(() => Array(9).fill(false));
  
  // Define some seed positions for Taylor Swift album icons
  const seedPositions = [
    { row: 0, col: 1, value: 0 }, // Debut
    { row: 0, col: 3, value: 2 }, // Red
    { row: 0, col: 6, value: 5 }, // Lover
    { row: 1, col: 1, value: 1 }, // Fearless
    { row: 1, col: 2, value: 6 }, // Folklore
    { row: 1, col: 4, value: 3 }, // 1989
    { row: 1, col: 7, value: 4 }, // Reputation
    { row: 8, col: 0, value: 7 }, // Evermore
    { row: 8, col: 8, value: 8 }, // Midnights
    // Add more seed positions to make the puzzle solvable
    { row: 2, col: 5, value: 7 },
    { row: 3, col: 2, value: 3 },
    { row: 3, col: 7, value: 1 },
    { row: 4, col: 4, value: 6 },
    { row: 5, col: 1, value: 8 },
    { row: 5, col: 6, value: 0 },
    { row: 6, col: 3, value: 8 },
    { row: 7, col: 0, value: 3 },
    { row: 7, col: 4, value: 1 },
  ];

  // Place seed values in the grid
  seedPositions.forEach(({ row, col, value }) => {
    grid[row][col] = value;
    lockedCells[row][col] = true;
  });

  return { grid, lockedCells };
};

// Find an empty cell to provide a hint
export const getHint = (
  grid: (number | null)[][],
  lockedCells: boolean[][]
): { row: number; col: number; value: number } | null => {
  // First, find all empty cells
  const emptyCells: { row: number; col: number }[] = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === null && !lockedCells[row][col]) {
        emptyCells.push({ row, col });
      }
    }
  }

  // If no empty cells, return null
  if (emptyCells.length === 0) {
    return null;
  }

  // Pick a random empty cell
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const { row, col } = emptyCells[randomIndex];

  // For simplicity, set a random value from 0-8
  // In a real implementation, we'd use a solver to find a valid value
  const value = Math.floor(Math.random() * 9);

  return { row, col, value };
};
