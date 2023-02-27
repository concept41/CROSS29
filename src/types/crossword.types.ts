import { ReactNode } from 'react';

export enum CROSSWORD_DIRECTION {
  ACROSS = 'across',
  DOWN = 'down',
}

export interface CrosswordWord {
  direction: CROSSWORD_DIRECTION,
  origin: GridCoordinates, // begins at 0,0
  word: string,
}

export enum CROSSWORD_CELL_STATE {
  SELECTED = 'selected',
  SELECTABLE = 'selectable',
  DISABLED = 'disabled',
}

export interface CellState {
  length: number,
  state: CROSSWORD_CELL_STATE,
  contents?: ReactNode,
}

export interface ICellProps extends CellState {
  clickHandler: (coordinates: GridCoordinates) => void,
  coordinates: GridCoordinates,
}
