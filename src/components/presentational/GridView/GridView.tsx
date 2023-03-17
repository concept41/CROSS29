import React, { KeyboardEventHandler, useCallback } from 'react';
import { FlexBox } from "components/presentational/FlexBox/FlexBox";
import { CROSSWORD_CELL_STATE, ICellProps, CellState, CELL_CONTENT_TYPE, CellContents } from 'types/crossword.types';
import cx from 'classnames';

import './Grid.scss';
import { ITileProps, Tile } from '../Tile/Tile';


interface IGridProperties {
  gridContents: CellState[][],
  clickHandler: (coordinates: GridCoordinates) => void,
  keyDownHandler: KeyboardEventHandler<HTMLDivElement>,
}

export const GridView = ({
  gridContents,
  clickHandler,
  keyDownHandler,
}: IGridProperties) => {
  const renderGrid = useCallback(() => {
    return gridContents.map((row, y) => {
      return (
        <FlexBox key={y}>
          {row.map((cellProps, x) => (
            <Cell
              coordinates={{x,y}}
              clickHandler={clickHandler}
              key={`(${x},${y})`}
              {...cellProps}/>
          ))}
        </FlexBox>
      )
    });
  }, [gridContents, clickHandler]);

  return (
    <div className='GridViewContainer' onKeyDown={keyDownHandler} tabIndex={0}>
      <FlexBox className='GridContainer' direction='column'>
        { renderGrid() }
      </FlexBox>
    </div>
  )
}


// Currently Unused
// interface ICellLabelProps {
//   cellLength: number,
//   numericLabel?: number,
// }

// const CellLabel = ({
//   cellLength,
//   numericLabel,
// }: ICellLabelProps) => {
//   return (
//     <div
//       className={'CellLabelContainer'}
//       style={{
//         height: `${cellLength}px`,
//         width: `${cellLength}px`,
//       }}>
//       <span>{numericLabel}</span>
//     </div>
//   );
// }

const buildCellContents = (cellContents: CellContents<unknown> | null) => {
  if(!cellContents) {
    return null;
  }

  switch(cellContents.contentType) {
    case CELL_CONTENT_TYPE.TILE:
      const props = cellContents.contentProps as ITileProps;
      return <Tile {...props}/>;
  }
}


export const Cell = ({
  length,
  coordinates,
  state = CROSSWORD_CELL_STATE.DISABLED,
  contents = null,
  clickHandler,
}: ICellProps) => {
  return (
    <div
      className={cx('CellContainer', {
        [state]: true,
      })}
      style={{
        height: `${length}px`,
        width: `${length}px`,
      }}
      onClick={() => clickHandler(coordinates)}>
      <FlexBox>{buildCellContents(contents)}</FlexBox>
    </div>
  )
}