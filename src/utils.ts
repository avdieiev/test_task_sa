import { cloneDeep } from 'lodash';

import { GRID_SIZE, NEIGHBOURS_POSITIONS } from './constants';
import { NeighboursPositions, GridMaker, Grid } from './types';


export const calculateNextGenerationGridTest = (prevGrid: Grid) => (
  neighboursPositions: NeighboursPositions, gridSize: number,
): Grid => (
  cloneDeep(prevGrid).map((row, rowIdx) => (
    row.map((cell, cellIdx) => {

      const liveNeighboursNumber = (
        neighboursPositions.reduce((acc, [ neighRowPos, neighCellPos ]) => {
          const neighRowIdx = neighRowPos + rowIdx;
          const neighCellIdx = neighCellPos + cellIdx;
          const isNeighbourExisting = neighRowIdx >= 0 && neighCellIdx >= 0 && neighCellIdx < gridSize && neighRowIdx < gridSize && prevGrid[ neighRowIdx ][ neighCellIdx ];

          if (isNeighbourExisting) {
            acc = acc + 1;
          }
          return acc;
        }, 0)
      )

      if (liveNeighboursNumber < 2 && prevGrid[ rowIdx ][ cellIdx ]) {
        return false
      }

      if ((liveNeighboursNumber === 2 || liveNeighboursNumber === 3) && prevGrid[ rowIdx ][ cellIdx ]) {
        return true
      }

      if (liveNeighboursNumber > 3 && prevGrid[ rowIdx ][ cellIdx ]) {
        return false;
      }

      if (liveNeighboursNumber === 3 && !prevGrid[ rowIdx ][ cellIdx ]) {
        return true;
      }

      return prevGrid[ rowIdx ][ cellIdx ];

    })
  ))
)

export const calculateNextGenerationGrid: GridMaker = (prevGrid) => (
  calculateNextGenerationGridTest(prevGrid)(NEIGHBOURS_POSITIONS, GRID_SIZE)
);