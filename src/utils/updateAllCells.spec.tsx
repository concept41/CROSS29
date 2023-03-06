import { updateAllCells } from './updateAllCells';
import { generateGrid } from './generateGrid';

describe('updateAllCells()', () => {
  const testAllCellsForValue = (grid: any[][], testValue: any) => {
    return grid.forEach((row) => {
      row.forEach((cell) => {
        expect(cell).toEqual(testValue);
      });
    });
  }

  it('should update the expected cell', () => {
    const testValue = 1;
    let grid = generateGrid(2,2, () => testValue);
    const newValue = 100;
    const updateFunc = () => newValue;

    // check initial state
    testAllCellsForValue(grid, testValue);

    // update
    grid = updateAllCells(grid, updateFunc);

    // check final state
    testAllCellsForValue(grid, newValue);
  });

  it('should be able to update the cell based on the cell\'s initial value', () => {
    const testValue = 1;
    let grid = generateGrid(2,2, () => testValue);
    const updateFunc = (initial: any) => initial + 1;
    const newValue = updateFunc(testValue);

     // check initial state
     testAllCellsForValue(grid, testValue);

    // update
    grid = updateAllCells(grid, updateFunc);

    // check final state
    testAllCellsForValue(grid, newValue);
  });
});
