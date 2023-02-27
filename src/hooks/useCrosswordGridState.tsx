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

export const useCrosswordGridState = (
  gridHeight: number,
  gridWidth: number,
  cellLength: number,
  defaultCellState: CROSSWORD_CELL_STATE = CROSSWORD_CELL_STATE.DISABLED,
) => {
  const emptyCellContents: () => CellState = () => ({
    length: cellLength,
    state: defaultCellState,
    contents: null,
  });

  // construction of letters on a grid
  const [gridContentsState, setGridContentsState] = useState(generateGrid(gridHeight, gridWidth, emptyCellContents));

  // update contents of a given cell
  const updateCrosswordGridCellState = useCallback(({
    coordinates,
    state,
    contents,
  }: IUpdateCrosswordGridCellState) => {
    setGridContentsState((initialState) => {
      console.log(initialState[0][0]);
      const newGridContentsState = updateCell(initialState, coordinates, (initialCellState) => {        
        return alterPropertyIfNotUndefined(initialCellState, {
          length: initialCellState.length,
          state,
          contents,
        })
      });

      console.log(newGridContentsState[0][0]);
      return newGridContentsState;
    });
  }, [setGridContentsState])


  return {
    gridContentsState,
    setGridContentsState,
    updateCrosswordGridCellState,
  };
}
