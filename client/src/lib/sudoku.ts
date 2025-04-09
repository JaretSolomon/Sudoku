// Function to check if the current state of a Sudoku grid is valid
// (no duplicates in rows, columns, or boxes)
export const isValidSudoku = (grid: (number | null)[][]): boolean => {
  // Check if any rows, columns, or boxes have duplicates
  return checkRows(grid) && checkColumns(grid) && checkBoxes(grid);
};

// Function to check if the Sudoku grid has a solution from its current state
export const hasSolution = (grid: (number | null)[][]): boolean => {
  // Make a copy of the grid
  const gridCopy = JSON.parse(JSON.stringify(grid));
  
  // Helper function to find an empty cell
  const findEmptyCell = (): { row: number; col: number } | null => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (gridCopy[row][col] === null) {
          return { row, col };
        }
      }
    }
    return null;
  };
  
  // Helper function to check if a value is valid at a given position
  const isValid = (row: number, col: number, value: number): boolean => {
    // Check row
    for (let c = 0; c < 9; c++) {
      if (gridCopy[row][c] === value) return false;
    }
    
    // Check column
    for (let r = 0; r < 9; r++) {
      if (gridCopy[r][col] === value) return false;
    }
    
    // Check 3x3 box
    const boxRowStart = Math.floor(row / 3) * 3;
    const boxColStart = Math.floor(col / 3) * 3;
    for (let r = boxRowStart; r < boxRowStart + 3; r++) {
      for (let c = boxColStart; c < boxColStart + 3; c++) {
        if (gridCopy[r][c] === value) return false;
      }
    }
    
    return true;
  };
  
  // Recursive function to solve the grid
  const solve = (): boolean => {
    const emptyCell = findEmptyCell();
    
    // If there are no more empty cells, the grid is solved
    if (!emptyCell) return true;
    
    const { row, col } = emptyCell;
    
    // Try each possible value
    for (let value = 0; value < 9; value++) {
      if (isValid(row, col, value)) {
        gridCopy[row][col] = value;
        
        // Recursively solve the rest of the grid
        if (solve()) {
          return true;
        }
        
        // If we can't solve the grid with this value, backtrack
        gridCopy[row][col] = null;
      }
    }
    
    return false;
  };
  
  // Check if the current grid is valid first
  if (!isValidSudoku(gridCopy)) return false;
  
  // Try to solve the grid
  return solve();
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

// Generate a full solved Sudoku board using backtracking
const generateSolvedGrid = (): (number | null)[][] => {
  const grid: (number | null)[][] = Array(9).fill(null).map(() => Array(9).fill(null));
  
  // Helper function to check if a value is valid at a given position
  const isValid = (row: number, col: number, value: number): boolean => {
    // Check row
    for (let c = 0; c < 9; c++) {
      if (grid[row][c] === value) return false;
    }
    
    // Check column
    for (let r = 0; r < 9; r++) {
      if (grid[r][col] === value) return false;
    }
    
    // Check 3x3 box
    const boxRowStart = Math.floor(row / 3) * 3;
    const boxColStart = Math.floor(col / 3) * 3;
    for (let r = boxRowStart; r < boxRowStart + 3; r++) {
      for (let c = boxColStart; c < boxColStart + 3; c++) {
        if (grid[r][c] === value) return false;
      }
    }
    
    return true;
  };
  
  // Recursive function to fill the grid
  const fillGrid = (row: number, col: number): boolean => {
    // If we've filled all rows, the grid is complete
    if (row === 9) return true;
    
    // Move to the next cell
    const nextRow = col === 8 ? row + 1 : row;
    const nextCol = col === 8 ? 0 : col + 1;
    
    // Create a random order of values to try
    const values = Array.from({ length: 9 }, (_, i) => i);
    // Shuffle the values
    for (let i = values.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [values[i], values[j]] = [values[j], values[i]];
    }
    
    // Try each value
    for (const value of values) {
      if (isValid(row, col, value)) {
        grid[row][col] = value;
        
        // Recursively fill the next cell
        if (fillGrid(nextRow, nextCol)) {
          return true;
        }
        
        // If we can't fill the grid with this value, backtrack
        grid[row][col] = null;
      }
    }
    
    return false;
  };
  
  // Start filling the grid from the top-left corner
  fillGrid(0, 0);
  
  return grid;
};

// Generate a random Sudoku puzzle by removing values from a solved grid
export const generatePuzzle = (): { grid: (number | null)[][], lockedCells: boolean[][] } => {
  // Generate a fully solved grid
  const solvedGrid = generateSolvedGrid();
  
  // Create a copy of the solved grid to remove values from
  const grid: (number | null)[][] = JSON.parse(JSON.stringify(solvedGrid));
  const lockedCells: boolean[][] = Array(9).fill(null).map(() => Array(9).fill(true));
  
  // Keep track of cells that can be removed
  const cellsToConsider: { row: number; col: number }[] = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      cellsToConsider.push({ row, col });
    }
  }
  
  // Shuffle the cells to consider
  for (let i = cellsToConsider.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cellsToConsider[i], cellsToConsider[j]] = [cellsToConsider[j], cellsToConsider[i]];
  }
  
  // Remove around 45-55 values to create a medium difficulty puzzle
  // This will leave around 26-36 clues, which should be solvable
  const cellsToRemove = Math.floor(Math.random() * 10) + 45;
  
  for (let i = 0; i < Math.min(cellsToRemove, cellsToConsider.length); i++) {
    const { row, col } = cellsToConsider[i];
    grid[row][col] = null;
    lockedCells[row][col] = false;
  }
  
  return { grid, lockedCells };
};

// Find the correct value for a cell based on the solved grid
const findCorrectValue = (grid: (number | null)[][], row: number, col: number): number | null => {
  // Make a copy of the grid
  const gridCopy = JSON.parse(JSON.stringify(grid));
  
  // Create a set of all possible values (0-8)
  const possibleValues = new Set<number>();
  for (let i = 0; i < 9; i++) {
    possibleValues.add(i);
  }

  // Remove values already present in the same row
  for (let c = 0; c < 9; c++) {
    if (grid[row][c] !== null) {
      possibleValues.delete(grid[row][c]!);
    }
  }

  // Remove values already present in the same column
  for (let r = 0; r < 9; r++) {
    if (grid[r][col] !== null) {
      possibleValues.delete(grid[r][col]!);
    }
  }

  // Remove values already present in the same 3x3 box
  const boxRowStart = Math.floor(row / 3) * 3;
  const boxColStart = Math.floor(col / 3) * 3;
  for (let r = boxRowStart; r < boxRowStart + 3; r++) {
    for (let c = boxColStart; c < boxColStart + 3; c++) {
      if (grid[r][c] !== null) {
        possibleValues.delete(grid[r][c]!);
      }
    }
  }

  // If there are no possible values, return null
  if (possibleValues.size === 0) {
    return null;
  }

  // Instead of picking a random value, solve the grid and find the correct value
  // for this position in the solution
  const validValues = Array.from(possibleValues);
  
  // Try each possible value and see if it leads to a solution
  for (const value of validValues) {
    gridCopy[row][col] = value;
    
    // If this value leads to a solution, it's the correct one
    if (hasSolution(gridCopy)) {
      return value;
    }
    
    // Reset for the next attempt
    gridCopy[row][col] = null;
  }
  
  // If no value leads to a solution, return a random valid value as fallback
  return validValues[Math.floor(Math.random() * validValues.length)];
};

// Find an empty cell to provide a hint
export const getHint = (
  grid: (number | null)[][],
  lockedCells: boolean[][]
): { row: number; col: number; value: number } | null => {
  // First, check if the current grid is valid
  if (!isValidSudoku(grid)) {
    return null;
  }
  
  // Find all empty cells
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
  
  // Make a copy of the grid for solving
  const gridCopy = JSON.parse(JSON.stringify(grid));
  
  // Solve the puzzle to find the solution
  if (!hasSolution(gridCopy)) {
    return null; // The current grid state doesn't have a solution
  }
  
  // Pick a random empty cell
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const { row, col } = emptyCells[randomIndex];
  
  // Generate a temporary grid to find the correct value
  const tempGrid = JSON.parse(JSON.stringify(grid));
  
  // Create a set of all possible values (0-8)
  const possibleValues = new Set<number>();
  for (let i = 0; i < 9; i++) {
    possibleValues.add(i);
  }

  // Remove values already present in the same row
  for (let c = 0; c < 9; c++) {
    if (grid[row][c] !== null) {
      possibleValues.delete(grid[row][c]!);
    }
  }

  // Remove values already present in the same column
  for (let r = 0; r < 9; r++) {
    if (grid[r][col] !== null) {
      possibleValues.delete(grid[r][col]!);
    }
  }

  // Remove values already present in the same 3x3 box
  const boxRowStart = Math.floor(row / 3) * 3;
  const boxColStart = Math.floor(col / 3) * 3;
  for (let r = boxRowStart; r < boxRowStart + 3; r++) {
    for (let c = boxColStart; c < boxColStart + 3; c++) {
      if (grid[r][c] !== null) {
        possibleValues.delete(grid[r][c]!);
      }
    }
  }

  // If there are no possible values, return null
  if (possibleValues.size === 0) {
    return null;
  }

  // Try each possible value and see if it leads to a solution
  const validValues = Array.from(possibleValues);
  for (const value of validValues) {
    tempGrid[row][col] = value;
    
    // If this value leads to a solution, it's the correct one
    if (hasSolution(tempGrid)) {
      return { row, col, value };
    }
    
    // Reset for the next attempt
    tempGrid[row][col] = null;
  }
  
  // Fallback: return a random valid value if we can't find a definitive one
  const randomValue = validValues[Math.floor(Math.random() * validValues.length)];
  return { row, col, value: randomValue };
};
