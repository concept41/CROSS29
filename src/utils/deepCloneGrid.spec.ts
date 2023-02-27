import { deepCloneGrid } from './deepCloneGrid';

describe('deepCloneGrid()', () => {
  let grid: any[][];
  
  beforeEach(() => {
    grid = [
      [1, 'a'],
      [[], {}],
    ];
  })

  describe('cloning accuracy', () => {
    it('should accurately represent the values present in the original grid', () => {
      const gridCopy = deepCloneGrid(grid);

      gridCopy.forEach((row, y) => {
        row.forEach((cell, x) => {
          expect(cell).toEqual(grid[y][x]);
        });
      });
    });
  });

  describe('deep cloning', () => {
    it('should copy values rather than references', () => {
      // create clone
      const gridCopy = deepCloneGrid(grid);
      // alter all values on clone
      gridCopy[0][0] = 2;
      gridCopy[0][1] = 'b';
      gridCopy[1][0].push('dingus');
      gridCopy[1][1]['schmeckle'] = 100;

      // test original and copy
      gridCopy.forEach((row, y) => {
        row.forEach((cell, x) => {
          expect(cell).not.toEqual(grid[y][x]);
        });
      });
    });
  });
});
