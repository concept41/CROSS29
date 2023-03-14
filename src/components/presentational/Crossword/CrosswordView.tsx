import React, { useCallback, KeyboardEvent } from 'react';
import { GridView } from "components/presentational/GridView/GridView";
import { FlexBox } from "components/presentational/FlexBox/FlexBox";
import { useCrosswordGridState } from 'hooks/useCrosswordGridState';


export const CrosswordView = () => {
  // constants
  const gridHeight = 5;
  const gridWidth = 5;
  const cellLength = 47;
  // construction of letters on a grid
  const {
    gridContentsState,
    setGridContentsState,
    updateCrosswordGridCell,
    updateCrosswordGridCells,
    getSelectedCoordinates,
    setSelected,
    setTile,
  } = useCrosswordGridState(gridHeight, gridWidth, cellLength);
  // listen for key presses
  const downHandler = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    setTile(event.key);
  }, [setTile]);

  // side view of clues

  return (
    <>
      <FlexBox className='CrosswordContainer'>
        <GridView
          gridContents={gridContentsState}
          clickHandler={setSelected}
          keyDownHandler={downHandler}/>
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