import { NEIGHBOURS_POSITIONS } from "./constants";
import { calculateNextGenerationGridTest } from "./utils";


const grid = [
  [false, false, false, false, false],
  [false, false, false, false, false],
  [false, true, true, true, false],
  [false, false, false, false, false],
  [false, false, false, false, false],
]

const nextGrid = [
  [false, false, false, false, false],
  [false, false, true, false, false],
  [false, false, true, false, false],
  [false, false, true, false, false],
  [false, false, false, false, false],
]

describe('grid next generation calculator', () => {
  it('should return 3 true in a column after 3 true in a row passed', () => {
    expect(calculateNextGenerationGridTest(grid)(NEIGHBOURS_POSITIONS, 5)).toEqual(nextGrid);
  });
});
