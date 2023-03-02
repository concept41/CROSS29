import { ReactNode, useState, useCallback } from 'react';
import { generateGrid } from 'utils/generateGrid';
import { updateCell } from 'utils/updateCell';
import { alterPropertyIfNotUndefined } from 'utils/alterPropertyIfNotUndefined';
import { CROSSWORD_CELL_STATE, CellState } from 'types/crossword.types';


interface IUpdateCrosswordGridCellState {
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

  // update contents of a given cell
  const updateCrosswordGridCellState = useCallback(({
    coordinates,
    state,
    contents,
  }: IUpdateCrosswordGridCellState) => {
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
  }, [setGridContentsState])


  return {
    gridContentsState,
    setGridContentsState,
    updateCrosswordGridCellState,
  };
}
