import { updateCell } from './updateCell';
import { generateGrid } from './generateGrid';

describe('updateCell()', () => {
  it('should update the expected cell', () => {
    const testValue = 1;
    const grid = generateGrid(2,2, () => testValue);
    const newValue = 100;
    const updateFunc = () => newValue;
    const cellToUpdate = {
      x: 1,
      y: 1,
    }

    // check initial state
    expect(grid[cellToUpdate.y][cellToUpdate.x]).toEqual(testValue);

    // update
    updateCell(grid, cellToUpdate, updateFunc);

    // check final state
    expect(grid[cellToUpdate.y][cellToUpdate.x]).toEqual(newValue);
    expect(grid[0][0]).toEqual(testValue);
  });

  it('should be able to update the cell based on the cell\'s initial value', () => {
    const testValue = 1;
    const grid = generateGrid(2,2, () => testValue);
    const updateFunc = (initial: any) => initial + 1;
    const cellToUpdate = {
      x: 1,
      y: 1,
    }

    // check initial state
    expect(grid[cellToUpdate.y][cellToUpdate.x]).toEqual(testValue);

    // update
    updateCell(grid, cellToUpdate, updateFunc);

    // check final state
    expect(grid[cellToUpdate.y][cellToUpdate.x]).toEqual(updateFunc(testValue));
    expect(grid[0][0]).toEqual(testValue);
  });

  it('should throw an error if the coordinates are out of bounds', () => {
    const testValue = 1;
    const grid = generateGrid(2,2, () => testValue);
    const updateFunc = (initial: any) => initial + 1;
    const cellToUpdate = {
      x: 2,
      y: 2,
    }

    expect(() => updateCell(grid, cellToUpdate, updateFunc)).toThrow();
  });
});
