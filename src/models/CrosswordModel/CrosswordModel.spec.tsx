import { CROSSWORD_DIRECTION } from 'types/crossword.types';
import { generateGrid } from 'utils/generateGrid';
import { CrosswordModel } from './CrosswordModel';

describe('CrosswordModel', () => {
  describe('#isWordFitInGrid', () => {
    it('should return true if the word fits in the grid', () => {
      // b a n a n a
      // _ _ _ n _ _
      // _ _ _ t _ _
      // _ _ _ l e g
      // _ _ _ e _ _
      // _ _ _ r _ _

      const words = [
        {
          direction: CROSSWORD_DIRECTION.ACROSS,
          origin: {x: 0, y: 0},
          word: 'banana',
        },
        {
          direction: CROSSWORD_DIRECTION.DOWN,
          origin: {x: 3, y: 0},
          word: 'antler',
        },
        {
          direction: CROSSWORD_DIRECTION.ACROSS,
          origin: {x: 3, y: 3},
          word: 'leg',
        }
      ];

      const crosswordModel = new CrosswordModel(words);
      
      words.forEach((word) => {
        expect(crosswordModel.isWordFitInGrid(6,6, word)).toEqual(true);
      });
    });

    it('should return false if the word does not fit in the grid', () => {
      // _ _ s _ _ _
      // _ _ a _ _ _
      // b u t l e r s
      // _ _ i _ _ _
      // _ _ s _ _ _
      // _ _ f _ _ _
      //     y

      const words = [
        {
          direction: CROSSWORD_DIRECTION.ACROSS,
          origin: {x: 0, y: 2},
          word: 'butlers',
        },
        {
          direction: CROSSWORD_DIRECTION.DOWN,
          origin: {x: 2, y: 0},
          word: 'satisfy',
        },
      ];

      const crosswordModel = new CrosswordModel(words);

      words.forEach((word) => {
        expect(crosswordModel.isWordFitInGrid(6,6, word)).toEqual(false);
      });
    });
  });

  describe('#isWordsfitInGrid', () => {
    it('should return true if all words fit in the grid', () => {
      // b a n a n a
      // _ _ _ n _ _
      // _ _ _ t _ _
      // _ _ _ l e g
      // _ _ _ e _ _
      // _ _ _ r _ _

      const words = [
        {
          direction: CROSSWORD_DIRECTION.ACROSS,
          origin: {x: 0, y: 0},
          word: 'banana',
        },
        {
          direction: CROSSWORD_DIRECTION.DOWN,
          origin: {x: 3, y: 0},
          word: 'antler',
        },
        {
          direction: CROSSWORD_DIRECTION.ACROSS,
          origin: {x: 3, y: 3},
          word: 'leg',
        }
      ];

      const crosswordModel = new CrosswordModel(words);
      const grid = generateGrid(6,6, () => null);

      expect(crosswordModel.isWordsFitInGrid(grid)).toEqual(true);
    });

    it('should return false if at least one word does not in the grid', () => {
      // s w e a t s
      // _ _ _ n _ _
      // _ _ _ o _ _
      // _ _ _ t u g
      // _ _ _ h _ _
      // _ _ _ e _ _
      //       r

      const words = [
        {
          direction: CROSSWORD_DIRECTION.ACROSS,
          origin: {x: 0, y: 0},
          word: 'sweats',
        },
        {
          direction: CROSSWORD_DIRECTION.DOWN,
          origin: {x: 3, y: 0},
          word: 'another',
        },
        {
          direction: CROSSWORD_DIRECTION.ACROSS,
          origin: {x: 3, y: 3},
          word: 'tug',
        }
      ];

      const crosswordModel = new CrosswordModel(words);
      const grid = generateGrid(6,6, () => null);

      expect(crosswordModel.isWordsFitInGrid(grid)).toEqual(false);
    });
  });

  describe('#createPopulatedGrid', () => {
    it('should throw an error if words do not fit in the grid', () => {
      // s t a r _
      // _ _ _ a _
      // _ _ _ t _
      // _ _ p e s t
      // _ _ _ _ _

      const words = [
        {
          direction: CROSSWORD_DIRECTION.ACROSS,
          origin: {x: 0, y: 0},
          word: 'star',
        },
        {
          direction: CROSSWORD_DIRECTION.DOWN,
          origin: {x: 3, y: 0},
          word: 'rate',
        },
        {
          direction: CROSSWORD_DIRECTION.ACROSS,
          origin: {x: 2, y: 3},
          word: 'pest',
        }
      ];

      const grid = generateGrid(5, 5, () => null);
      const crosswordModel = new CrosswordModel(words);

      expect(() => crosswordModel.createPopulatedGrid(grid)).toThrow();
    });

    it('should populate the grid with all the words in the crossword', () => {
      const expected = [
        [ 's', 't', 'a', 'v', 'e'],
        [ null, 'a', null, 'e', null],
        [ null, 'p', 'i', 'n', null],
        [ null, 'e', null, 't', null],
        [ null, 'r', null, null, null],
      ]

      const words = [
        {
          direction: CROSSWORD_DIRECTION.ACROSS,
          origin: {x: 0, y: 0},
          word: 'stave',
        },
        {
          direction: CROSSWORD_DIRECTION.DOWN,
          origin: {x: 1, y: 0},
          word: 'taper',
        },
        {
          direction: CROSSWORD_DIRECTION.DOWN,
          origin: {x: 3, y: 0},
          word: 'vent',
        },
        {
          direction: CROSSWORD_DIRECTION.ACROSS,
          origin: {x: 1, y: 2},
          word: 'pin',
        }
      ];

      const grid = generateGrid(5, 5, () => null);
      const crosswordModel = new CrosswordModel(words);

      expect(crosswordModel.createPopulatedGrid(grid)).toEqual(expected);
    });
  });

  describe('#minSizeGrid', () => {
    it('should return the minimum dimensions for a grid to fit the given words', () => {
      // s e v e r e
      // _ _ _ _ i
      // _ _ _ _ t
      // _ _ b e e
      // _ _ _ l _
      //       k  

      const words = [
        {
          direction: CROSSWORD_DIRECTION.ACROSS,
          origin: {x: 0, y: 0},
          word: 'severe',
        },
        {
          direction: CROSSWORD_DIRECTION.DOWN,
          origin: {x: 4, y: 0},
          word: 'rite',
        },
        {
          direction: CROSSWORD_DIRECTION.ACROSS,
          origin: {x: 2, y: 3},
          word: 'bee',
        },
        {
          direction: CROSSWORD_DIRECTION.DOWN,
          origin: {x: 3, y: 3},
          word: 'elk',
        },
      ];

      const crossword = new CrosswordModel(words);

      expect(crossword.minSizeGrid()).toEqual({
        x: 6,
        y: 6,
      });
    });
  });

  describe('#minX', () => {
    it('should return the maximum value of X for a set of words', () => {
      // _ _ _ _ _
      // _ _ s c a l e
      // _ _ _ a _
      // _ t y r a n n y
      // _ _ _ _ _

      const words = [
        {
          direction: CROSSWORD_DIRECTION.ACROSS,
          origin: {x: 2, y: 1},
          word: 'scale',
        },
        {
          direction: CROSSWORD_DIRECTION.DOWN,
          origin: {x: 3, y: 1},
          word: 'car',
        },
        {
          direction: CROSSWORD_DIRECTION.ACROSS,
          origin: {x: 1, y: 3},
          word: 'tyranny',
        },
      ];

      const crossword = new CrosswordModel(words);
      expect(crossword.minX()).toEqual(7);
    });
  });

  describe('#minY', () => {
    it('should return the maximum value of Y for a set of words', () => {
      // _ s e v e r
      // _ t _ _ _
      // _ u _ _ _
      // _ d o n e
      // _ e _ _ v
      //   n     e
      //   t

      const words = [
        {
          direction: CROSSWORD_DIRECTION.ACROSS,
          origin: {x: 1, y: 0},
          word: 'sever',
        },
        {
          direction: CROSSWORD_DIRECTION.DOWN,
          origin: {x: 1, y: 0},
          word: 'student',
        },
        {
          direction: CROSSWORD_DIRECTION.ACROSS,
          origin: {x: 1, y: 3},
          word: 'done',
        },
        {
          direction: CROSSWORD_DIRECTION.DOWN,
          origin: {x: 4, y: 3},
          word: 'eve',
        },
      ];

      const crossword = new CrosswordModel(words);
      expect(crossword.minY()).toEqual(6);
    });
  });

  describe('#letterAtCoordinates', () => {
    let crossword: CrosswordModel;

    beforeEach(() => {
      //p y t h o n
      //_ _ _ a _ _
      //_ _ _ m a x
      //_ _ _ _ _ _

      const words = [
        {
          direction: CROSSWORD_DIRECTION.ACROSS,
          origin: {x: 0, y: 0},
          word: 'python',
        },
        {
          direction: CROSSWORD_DIRECTION.DOWN,
          origin: {x: 3, y: 0},
          word: 'ham',
        },
        {
          direction: CROSSWORD_DIRECTION.ACROSS,
          origin: {x: 3, y: 2},
          word: 'max',
        },
      ];

      crossword = new CrosswordModel(words);
    });


    it('should fetch the correct letter given the coordinates', () => {
      expect(crossword.letterAtCoordinates({
        x: 3,
        y: 2,
      })).toEqual('m');
    });

    it('should return null if there is no letter at the coordinates', () => {
      expect(crossword.letterAtCoordinates({
        x: 1,
        y: 1,
      })).toEqual(null);
    });

    it('should return null if the coordinates are out of bounds of the grid', () => {
      expect(crossword.letterAtCoordinates({
        x: 100,
        y: 100,
      })).toEqual(null);
    });
  });
});