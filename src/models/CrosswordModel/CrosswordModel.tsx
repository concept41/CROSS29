import { CROSSWORD_DIRECTION, CrosswordWord } from "types/crossword.types";
import { deepCloneGrid } from "utils/deepCloneGrid";
import { generateGrid } from "utils/generateGrid";
import { updateCell } from "utils/updateCell";

export class CrosswordModel {
  private grid?: string[][];

  constructor(
    private words: CrosswordWord[],
  ) {}


  // Validation Functions
  public isWordsFitInGrid(grid: any[][]): Boolean {
    // get dimensions of grid
    const gridHeight = grid.length || 0;
    const gridWidth = grid[0] ? grid[0].length : 0;
    
    return this.words.reduce((acc, word) => {
      return acc && Boolean(this.isWordFitInGrid(gridHeight, gridWidth, word));
    }, true);
  }

  public isWordFitInGrid(
    gridHeight: number,
    gridWidth: number,
    {
      direction,
      origin,
      word,
    }: CrosswordWord): Boolean {
    // figure out max dimensions needed for word
    const wordMinX = origin.x;
    const wordMaxX = direction === CROSSWORD_DIRECTION.ACROSS ? wordMinX + word.length - 1 : wordMinX;

    const wordMinY = origin.y;
    const wordMaxY = direction === CROSSWORD_DIRECTION.DOWN ? wordMinY + word.length - 1 : wordMinY;
    
    // return answer
    return gridHeight > wordMaxY && gridWidth > wordMaxX;
  }

  public createPopulatedGrid(grid: any[][]) {
    // validation
    if (!this.isWordsFitInGrid(grid)) {
      throw new Error('CrosswordModel.createPopulatedGrid Error: words do not fit in grid');
    }

    let gridCopy = deepCloneGrid(grid);
    
    // insertion
    this.words.forEach(({
      direction,
      origin,
      word,
    }) => {
      word.split('').forEach((letter, idx) => {
        const x = origin.x + (direction === CROSSWORD_DIRECTION.ACROSS ? idx : 0);
        const y = origin.y + (direction === CROSSWORD_DIRECTION.DOWN ? idx : 0);

        gridCopy = updateCell(gridCopy, {y,x}, (initialValue) => {
          if (initialValue && initialValue !== letter) {
            throw new Error(`CrosswordModel.createPopulatedGrid Error: attempted to insert letter, [${letter}] in a cell that already contains a different letter, [${initialValue}]`);
          }
          
          return letter;
        });
      });
    });

    return gridCopy;
  }

  public minSizeGrid() {
    return {
      x: this.minX() + 1,
      y: this.minY() + 1,
    }
  }

  public minX() {
    return this.words.reduce((
      acc,
      {
        direction,
        origin,
        word,
      }
    ) => {
      const wordMinX = origin.x;
      const wordMaxX = direction === CROSSWORD_DIRECTION.ACROSS ? wordMinX + word.length - 1 : wordMinX;
      return Math.max(acc, wordMaxX);
    }, 0);
  }
  
  public minY() {
    return this.words.reduce((
      acc,
      {
        direction,
        origin,
        word,
      }
    ) => {
      const wordMinY = origin.y;
      const wordMaxY = direction === CROSSWORD_DIRECTION.DOWN ? wordMinY + word.length - 1 : wordMinY;
      return Math.max(acc, wordMaxY);
    }, 0);
  }

  private getGrid() {
    if(!this.grid) {
      this.grid = this.generateGrid();
    }

    return this.grid;
  }

  private generateGrid() {
    const size = this.minSizeGrid();
    const grid = generateGrid(size.y, size.x, () => null);
    return this.createPopulatedGrid(grid);
  }

  public letterAtCoordinates({
    x,
    y,
  }: GridCoordinates) {
    if (y > this.getGrid().length || x > this.getGrid()[0].length) {
      return null;
    }

    return this.getGrid()[y][x];
  }
}