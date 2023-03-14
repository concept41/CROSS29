import React, { ReactNode, useState, useCallback } from 'react';
import { generateGrid } from 'utils/generateGrid';
import { updateCell } from 'utils/updateCell';
import { alterPropertyIfNotUndefined } from 'utils/alterPropertyIfNotUndefined';
import { CROSSWORD_CELL_STATE, CellState, CELL_CONTENT_TYPE } from 'types/crossword.types';
import { updateAllCells } from 'utils/updateAllCells';
import { Tile } from 'components/presentational/Tile/Tile';


interface IUpdateCrosswordGridCellArgs {
  coordinates: GridCoordinates;
  state?: CROSSWORD_CELL_STATE;
  contents?: ReactNode;
}

interface IUpdateCrosswordGridCellsArgs {
  state?: CROSSWORD_CELL_STATE;
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
    console.log(`updateCrosswordGridCell: ${JSON.stringify(coordinates)}, ${state}`);
    setGridContentsState((initialState) => {
      const newGridContentsState = updateCell(initialState, coordinates, (initialCellState) => {   
        const newState = alterPropertyIfNotUndefined(initialCellState, {
          length: initialCellState.length,
          state,
          contents,
        });
        console.log(initialCellState, newState);
        return newState
      });

      return newGridContentsState;
    });
  }, [setGridContentsState]);

  // updates all cells
  const updateCrosswordGridCells = useCallback(({
    state,
  }: IUpdateCrosswordGridCellsArgs) => {
    console.log(`updateCrosswordGridCells: ${state}`);
    setGridContentsState((initialState) => {
      return updateAllCells(initialState, (initialCellState) => {
        const newState = alterPropertyIfNotUndefined(initialCellState, {
          length: initialCellState.length,
          state,
        });
        console.log(initialCellState, newState);

        return newState;
      });
    });
  }, [setGridContentsState]);

  // get coordinates of selected cell
  const getSelectedCoordinates = useCallback(() => {
    for(let y = 0; y < gridContentsState.length; y++) {
      const row = gridContentsState[y];
      for(let x = 0; x < row.length; x++) {
        const cell = row[x];
        if (cell.state === CROSSWORD_CELL_STATE.SELECTED) {
          return {x,y};
        }
      }
    }
    return null;
  }, [gridContentsState]);

  // select a Cell
  const setSelected = useCallback((coordinates) => {
    console.log(`setSelected: ${JSON.stringify(coordinates)}`);
    // clear existing state
    updateCrosswordGridCells({
      state: CROSSWORD_CELL_STATE.DISABLED,
    });
    // update cell state
    updateCrosswordGridCell({
      coordinates,
      state: CROSSWORD_CELL_STATE.SELECTED,
    });
  }, [updateCrosswordGridCells, updateCrosswordGridCell]);

  // set tile on selected cell
  const setTile = useCallback((letter: string) => {
    const coordinates = getSelectedCoordinates();
    console.log(coordinates);

    if (!coordinates) {
      throw new Error('Error in useCrosswordGridState.setTile: no selected coordinates');
    }

    updateCrosswordGridCell({
      coordinates,
      contents: {
        contentType: CELL_CONTENT_TYPE.TILE,
        contentProps: {
          letter,
        }
      }
    })

  }, [getSelectedCoordinates, updateCrosswordGridCell]);



  return {
    gridContentsState,
    setGridContentsState,
    updateCrosswordGridCell,
    updateCrosswordGridCells,
    getSelectedCoordinates,
    setSelected,
    setTile,
  };
}
