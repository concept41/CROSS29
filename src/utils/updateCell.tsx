import { deepCloneGrid } from "./deepCloneGrid";

// given a grid, update a cell
export const updateCell = (
  grid: any[][],
  cellCoordinates: GridCoordinates,
  updateFunc: (initialValue: any) => any,
) => {
  // create copy of grid to return
  const gridCopy = deepCloneGrid(grid);
  // handling coordinates out of bounds 
  const gridHasCellAtCoordinates = gridCopy.length > cellCoordinates.y && gridCopy[cellCoordinates.y].length > cellCoordinates.x;

  if (!gridHasCellAtCoordinates) {
    throw new Error(`Error in updateCell: grid does not have a cell at (${cellCoordinates.x},${cellCoordinates.y})`);
  }

  // update value
  const initialValue = gridCopy[cellCoordinates.y][cellCoordinates.x];
  gridCopy[cellCoordinates.y][cellCoordinates.x] = updateFunc(initialValue);

  return gridCopy;
}
