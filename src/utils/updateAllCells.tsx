import { deepCloneGrid } from "./deepCloneGrid";

// given a grid, update all cells
export const updateAllCells = (
  grid: any[][],
  updateFunc: (initialValue: any) => any,
) => {
  // create copy of grid to return
  let gridCopy: any[][] = deepCloneGrid(grid);

  // update values
  gridCopy = gridCopy.map((row: any[]) => {
    return row.map(updateFunc);
  });

  return gridCopy;
}