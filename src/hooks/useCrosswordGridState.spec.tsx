import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { emptyCellContents, useCrosswordGridState } from './useCrosswordGridState';
import { CROSSWORD_CELL_STATE } from 'types/crossword.types';


describe('useCrosswordGridState()', () => {
  const defaultGridHeight = 2;
  const defaultGridWidth = 2;
  const defaultCellLength = 45;
  const emptyCellContentsGenerator = emptyCellContents(defaultCellLength, CROSSWORD_CELL_STATE.DISABLED);
  
  test('initial state', () => {
    // setup
    const { result } = renderHook(() => useCrosswordGridState(defaultGridHeight, defaultGridWidth, defaultCellLength));

    // test
    const expectedState = [[],[]].map((val) => [emptyCellContentsGenerator(), emptyCellContentsGenerator()]);
    expect(result.current.gridContentsState).toStrictEqual(expectedState);
  });

  describe('#updateCrosswordGridCellState behavior', () => {
    test('updating state of a single cell', () => {
      // setup
      const { result } = renderHook(() => useCrosswordGridState(defaultGridHeight, defaultGridWidth, defaultCellLength));

      // check existing state
      expect(result.current.gridContentsState[1][1]).toEqual(emptyCellContentsGenerator());

      // update
      const expectedState = {
        coordinates: {x:1, y:1},
        state: CROSSWORD_CELL_STATE.SELECTABLE,
        contents: result.current.gridContentsState[1][1].contents,
      }
      act(() => {
        result.current.updateCrosswordGridCell(expectedState);
      });

      // test
      expect(result.current.gridContentsState[1][1]).toEqual({
        ...emptyCellContentsGenerator(),
        state: expectedState.state,
      });
    });

    test('updating contents of a single cell', () => {
      // setup
      const { result } = renderHook(() => useCrosswordGridState(defaultGridHeight, defaultGridWidth, defaultCellLength));

      // check existing state
      expect(result.current.gridContentsState[1][1]).toEqual(emptyCellContentsGenerator());

      // update
      const expectedState = {
        coordinates: {x:1, y:1},
        state: CROSSWORD_CELL_STATE.DISABLED,
        contents: <div>hello</div>,
      }
      act(() => {
        result.current.updateCrosswordGridCell(expectedState);
      });

      // test
      expect(result.current.gridContentsState[1][1]).toEqual({
        ...emptyCellContentsGenerator(),
        contents: expectedState.contents,
      });
    });
  });
});
