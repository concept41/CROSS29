import React, { ReactNode, useState, useCallback, useEffect } from 'react';
import { generateGrid } from 'utils/generateGrid';
import { updateCell } from 'utils/updateCell';
import { alterPropertyIfNotUndefined } from 'utils/alterPropertyIfNotUndefined';
import { CROSSWORD_CELL_STATE, CellState, CELL_CONTENT_TYPE } from 'types/crossword.types';
import { updateAllCells } from 'utils/updateAllCells';
import { Tile } from 'components/presentational/Tile/Tile';
import { deepCloneGrid } from 'utils/deepCloneGrid';


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
  initialGridHeight: number,
  initialGridWidth: number,
  cellLength: number,
  defaultCellState: CROSSWORD_CELL_STATE = CROSSWORD_CELL_STATE.DISABLED,
) => {
  
  // construction of letters on a grid
  const [gridContentsState, setGridContentsState] = useState(generateGrid(initialGridHeight, initialGridWidth, emptyCellContents(cellLength, defaultCellState)));

  // update properties of a given cell
  const updateCrosswordGridCell = useCallback(({
    coordinates,
    state,
    contents,
  }: IUpdateCrosswordGridCellArgs) => {
    setGridContentsState((initialState) => {
      const newGridContentsState = updateCell(initialState, coordinates, (initialCellState) => {   
        const newState = alterPropertyIfNotUndefined(initialCellState, {
          length: initialCellState.length,
          state,
          contents,
        });
        return newState
      });

      return newGridContentsState;
    });
  }, [setGridContentsState]);

  // updates all cells
  const updateCrosswordGridCells = useCallback(({
    state,
  }: IUpdateCrosswordGridCellsArgs) => {
    setGridContentsState((initialState) => {
      return updateAllCells(initialState, (initialCellState) => {
        const newState = alterPropertyIfNotUndefined(initialCellState, {
          length: initialCellState.length,
          state,
        });

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

  // append an empty row
  const addRow = useCallback(() => {
    console.log('addRow');
    setGridContentsState((initialState) => {
      console.log('initialState:', initialState.length);
      const updatedState = deepCloneGrid(initialState);
      const width = initialState[0].length;
      const row = new Array(width)
        .fill(null)
        .map((_val) => emptyCellContents(cellLength, defaultCellState)());
      updatedState.push(row);
      console.log(row);
      console.log('updatedState:', updatedState.length);
      return updatedState;
    });
  }, [setGridContentsState]);

  // append an empty column
  const addColumn = useCallback(() => {
    console.log('addColumn');
    setGridContentsState((initialState) => {
      const updatedState = deepCloneGrid(initialState);
      return updatedState.map((row) => ([
        ...row,
        emptyCellContents(cellLength, defaultCellState)(),
      ]));
    });
  }, [setGridContentsState]);

  // list of words
  const [wordList, setWordList] = useState([]);
  useEffect(() => {
    // whenever gridContentsState is updated, update list of words
    
  }, [gridContentsState, setWordList]);


  return {
    gridContentsState,
    setGridContentsState,
    updateCrosswordGridCell,
    updateCrosswordGridCells,
    getSelectedCoordinates,
    setSelected,
    setTile,
    addRow,
    addColumn,
  };
}
