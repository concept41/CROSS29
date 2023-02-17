import React, { ReactNode, useCallback } from 'react';
import { FlexBox } from "components/presentational/FlexBox/FlexBox";
import cx from 'classnames';

import './Grid.scss';


interface IGridProperties {
  gridContents: ICellProps[][],
}

export const Grid = ({
  gridContents,
}: IGridProperties) => {
  const renderGrid = useCallback(() => {
    return gridContents.map((row, y) => {
      return (
        <FlexBox key={y}>
          {row.map((cellProps, x) => <Cell key={`(${x},${y})`} {...cellProps}/>)}
        </FlexBox>
      )
    });
  }, [gridContents]);

  return (
    <>
      <FlexBox className='GridContainer' direction='column'>
        { renderGrid() }
      </FlexBox>
    </>
  )
}

interface ICellProps {
  length: number,
  isSelectable: boolean,
  contents?: ReactNode,
}

export const Cell = ({
  length,
  isSelectable = false,
  contents,
}: ICellProps) => {
  return (
    <div
      className={cx('CellContainer', {
        isSelectable,
      })}
      style={{
        height: `${length}px`,
        width: `${length}px`,
      }}>
      <FlexBox>{contents}</FlexBox>
    </div>
  )
}