import { useCallback, useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';

import './App.css';
import { GRID_SIZE, TICK_TIME, TIME_BEFORE_START } from './constants';
import { Grid, GridMaker } from './types';


const randomGrid: Grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null)
  .map(() => Math.random() > 0.7));

const neighboursPositions: [ number, number ][] = [
  [ -1, -1 ],
  [ -1, 0 ],
  [ -1, 1 ],
  [ 0, -1 ],
  // [0, 0],
  [ 0, 1 ],
  [ 1, -1 ],
  [ 1, 0 ],
  [ 1, 1 ],
]

const calculateNextGenerationGrid: GridMaker = (prevGrid) => (
  cloneDeep(prevGrid).map((row, rowIdx) => (
    row.map((cell, cellIdx) => {
      let liveNeighboursNumber = 0;

      neighboursPositions.map(([ neighRowPos, neighCellPos ]) => {
        const neighRowIdx = neighRowPos + rowIdx;
        const neighCellIdx = neighCellPos + cellIdx;
        const isNeighbourExisting = neighRowIdx >= 0 && neighCellIdx >= 0 && neighCellIdx < GRID_SIZE && neighRowIdx < GRID_SIZE && prevGrid[ neighRowIdx ][ neighCellIdx ];

        if (isNeighbourExisting) {
          liveNeighboursNumber = liveNeighboursNumber + 1;
        }
      })

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
);

function App() {
  const [ grid, setGrid ] = useState(randomGrid)

  const runTick = useCallback(() => {
    setGrid(calculateNextGenerationGrid);

    setTimeout(runTick, TICK_TIME);
  }, [])

  useEffect(() => {
    setTimeout(runTick, TIME_BEFORE_START);
  }, [ runTick ])

  return (
    <table className="table">
      <tbody>
        {grid.map((row, rowIdx) => (
          <tr className="row" key={rowIdx}>
            {row.map((cell, cellIdx) => (
              <td
                key={`${rowIdx} ${cellIdx}`}
                className={`cell${cell ? ' cell_live' : ''}`}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
