
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
  contents: CellContents<unknown> | null,
}

export enum CELL_CONTENT_TYPE {
  TILE = 'tile',
}

export interface CellContents<T> {
  contentType: CELL_CONTENT_TYPE,
  contentProps: T,
}

export interface ICellProps extends CellState {
  clickHandler: (coordinates: GridCoordinates) => void,
  coordinates: GridCoordinates,
}
