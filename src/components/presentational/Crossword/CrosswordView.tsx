import React, { useCallback, KeyboardEvent, useState } from 'react';
import { GridView } from "components/presentational/GridView/GridView";
import { FlexBox } from "components/presentational/FlexBox/FlexBox";
import { useCrosswordGridState } from 'hooks/useCrosswordGridState';


export const CrosswordView = () => {
  // constants
  const initialGridHeight = 5;
  const initialGridWidth = 5;
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
    addRow,
    addColumn,
  } = useCrosswordGridState(initialGridHeight, initialGridWidth, cellLength);
  // listen for key presses
  const downHandler = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key.match(/^[a-z]$/i)) {
      setTile(event.key);
    }
  }, [setTile]);
  // side view of clues

  return (
    <>
      <FlexBox className='CrosswordContainer' direction='column'>
        <div>
          <button onClick={addRow}>Add Row</button>
          <button onClick={addColumn}>Add Column</button>
        </div>
        <GridView
          gridContents={gridContentsState}
          clickHandler={setSelected}
          keyDownHandler={downHandler}/>
      </FlexBox>
    </>
  )
}

// interface IInputProps {
//   type?: string;
//   value: any;
//   label?: string;
//   handleChange: (event: any) => void;
//   disableKeydown?: boolean;
// }

// export const Input = ({
//   type,
//   value,
//   label,
//   handleChange,
//   disableKeydown = false,
// }: IInputProps) => {
//   return (
//     <div className="InputContainer">
//       <label>{label}</label>
//       <input
//         type={type}
//         value={value}
//         onChange={handleChange}
//         onkeydown={() => disableKeydown ? false : }/>
//     </div>
//   )
// }