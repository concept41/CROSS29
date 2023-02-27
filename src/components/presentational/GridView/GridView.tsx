import React, { useCallback } from 'react';
import { FlexBox } from "components/presentational/FlexBox/FlexBox";
import { CROSSWORD_CELL_STATE, ICellProps, CellState } from 'types/crossword.types';
import cx from 'classnames';

import './Grid.scss';


interface IGridProperties {
  gridContents: CellState[][],
  clickHandler: (coordinates: GridCoordinates) => void,
}

export const GridView = ({
  gridContents,
  clickHandler,
}: IGridProperties) => {
  const renderGrid = useCallback(() => {
    console.log('renderGrid is currently not running when the individual cells are updated');
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
    <>
      <FlexBox className='GridContainer' direction='column'>
        { renderGrid() }
      </FlexBox>
    </>
  )
}



export const Cell = ({
  length,
  coordinates,
  state = CROSSWORD_CELL_STATE.DISABLED,
  contents,
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
      <FlexBox>{contents}</FlexBox>
    </div>
  )
}