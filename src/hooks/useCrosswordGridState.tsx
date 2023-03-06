import { ReactNode, useState, useCallback } from 'react';
import { generateGrid } from 'utils/generateGrid';
import { updateCell } from 'utils/updateCell';
import { alterPropertyIfNotUndefined } from 'utils/alterPropertyIfNotUndefined';
import { CROSSWORD_CELL_STATE, CellState } from 'types/crossword.types';


interface IUpdateCrosswordGridCellArgs {
  coordinates: GridCoordinates;
  state?: CROSSWORD_CELL_STATE;
  contents?: ReactNode;
}

type emptyCellContentsReturnType = (cellLength: number, defaultCellState: CROSSWORD_CELL_STATE) => () => CellState;

export const emptyCellContents: emptyCellContentsReturnType = (cellLength: number, defaultCellState: CROSSWORD_CELL_STATE) => {
  return () => ({
    length: cellLength,
    state: defaultCellState,
    contents: null,
  });
};

export const useCrosswordGridState = (
  gridHeight: number,
  gridWidth: number,
  cellLength: number,
  defaultCellState: CROSSWORD_CELL_STATE = CROSSWORD_CELL_STATE.DISABLED,
) => {
  
  // construction of letters on a grid
  const [gridContentsState, setGridContentsState] = useState(generateGrid(gridHeight, gridWidth, emptyCellContents(cellLength, defaultCellState)));

  // update properties of a given cell
  const updateCrosswordGridCell = useCallback(({
    coordinates,
    state,
    contents,
  }: IUpdateCrosswordGridCellArgs) => {
    setGridContentsState((initialState) => {
      const newGridContentsState = updateCell(initialState, coordinates, (initialCellState) => {        
        return alterPropertyIfNotUndefined(initialCellState, {
          length: initialCellState.length,
          state,
          contents,
        })
      });

      return newGridContentsState;
    });
  }, [setGridContentsState]);

  // updates all cells
  const updateCrosswordGridCells = useCallback(() => {
    setGridContentsState((initialState) => {
      // update state of all cells
    });
  }, [setGridContentsState]);


  return {
    gridContentsState,
    setGridContentsState,
    updateCrosswordGridCell,
    updateCrosswordGridCells
  };
}
