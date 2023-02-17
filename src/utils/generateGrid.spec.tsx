import { generateGrid } from './generateGrid';

describe('generateGrid()', () => {
  it('should generate a grid', () => {
    expect(generateGrid(2,2)).toEqual([[null, null], [null, null]]);
  });

  it('should populate cells with null if no contents are provided', () => {
    expect(generateGrid(2,2)[0][0]).toBeNull();
  });

  it('should generate a grid given a height and width', () => {
    const testGridSizes = [
      { height: 10, width: 10 },
      { height: 5, width: 10 },
      { height: 10, width: 5 },
    ];

    testGridSizes.map(({height, width}) => generateGrid(height, width))
      .forEach((testGrid, idx) => {
        const { height, width } = testGridSizes[idx];
        // check height
        expect(testGrid.length).toEqual(height);
        // check width
        testGrid.forEach(row => {
          expect(row.length).toEqual(width);
        });
      });
  });

  it('should allow passing contents to each cell of the grid', () => {
    const testValue = 1;
    const testGrid = generateGrid(1,2, () => testValue);

    expect(testGrid[0][0]).toEqual(testValue);
    expect(testGrid[0][1]).toEqual(testValue);
  });
});