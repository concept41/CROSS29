// given a grid, update a cell
export const updateCell = (
  grid: any[][],
  cellCoordinates: Coordinates,
  updateFunc: (initialValue: any) => any,
) => {
  // handling coordinates out of bounds 
  const gridHasCellAtCoordinates = grid.length > cellCoordinates.y && grid[cellCoordinates.y].length > cellCoordinates.x;

  if (!gridHasCellAtCoordinates) {
    throw new Error(`Error in updateCell: grid does not have a cell at (${cellCoordinates.x},${cellCoordinates.y})`);
  }

  // update value
  const initialValue = grid[cellCoordinates.y][cellCoordinates.x];
  grid[cellCoordinates.y][cellCoordinates.x] = updateFunc(initialValue);

  return grid;
}
