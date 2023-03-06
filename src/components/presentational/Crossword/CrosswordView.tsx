import React, { useCallback } from 'react';
import { GridView } from "components/presentational/GridView/GridView";
import { FlexBox } from "components/presentational/FlexBox/FlexBox";
import { CROSSWORD_CELL_STATE } from 'types/crossword.types';
import { useCrosswordGridState } from 'hooks/useCrosswordGridState';


export const CrosswordView = () => {
  // constants
  const gridHeight = 5;
  const gridWidth = 5;
  const cellLength = 47;
  // construction of letters on a grid
  const {gridContentsState, setGridContentsState, updateCrosswordGridCell: updateCrosswordGridCellState} = useCrosswordGridState(gridHeight, gridWidth, cellLength);
  // typing and direction is separate from crossword grid
  const clickHandler = useCallback((coordinates) => {
    updateCrosswordGridCellState({
      coordinates,
      state: CROSSWORD_CELL_STATE.SELECTED,
    });
  }, [updateCrosswordGridCellState]);
  // letters on tiles
  // side view of clues

  return (
    <>
      <FlexBox className='CrosswordContainer'>
        <GridView
          gridContents={gridContentsState}
          clickHandler={clickHandler}/>
      </FlexBox>
    </>
  )
}


// Currently Unused
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