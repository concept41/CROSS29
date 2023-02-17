import React, { useState } from 'react';
import { Grid } from "components/presentational/Grid/Grid";
import { generateGrid } from 'utils/generateGrid';
import { FlexBox } from "components/presentational/FlexBox/FlexBox";

export const Crossword = () => {
  // constants
  const gridHeight = 2;
  const gridWidth = 2;
  const cellLength = 45;
  // default values
  const emptyCellContents = () => ({
    length: cellLength,
    isSelectable: true,
    contents: <CellLabel cellLength={cellLength} numericLabel={1}/>,
  });
  // construction of letters on a grid
  const [gridContentsState, setGridContentsState] = useState(generateGrid(gridHeight, gridWidth, emptyCellContents));
  // letters on tiles
  // side view of clues

  return (
    <>
      <FlexBox className='CrosswordContainer'>
        <Grid
          gridContents={gridContentsState}/>
      </FlexBox>
    </>
  )
}

enum CrosswordDirection {
  across = 'across',
  down = 'down',
}

interface CrosswordWord {
  direction: CrosswordDirection,
  origin: Coordinates,
  word: string,
}

interface ICellLabelProps {
  cellLength: number,
  numericLabel?: number,
}

const CellLabel = ({
  cellLength,
  numericLabel,
}: ICellLabelProps) => {
  return (
    <div
      className={'CellLabelContainer'}
      style={{
        height: `${cellLength}px`,
        width: `${cellLength}px`,
      }}>
      <span>{numericLabel}</span>
    </div>
  );
}

const Tile = () => {
  return (
    <>a</>
  )
}