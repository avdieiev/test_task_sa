import { useCallback, useEffect, useState } from 'react';

import './App.css';
import { GRID_SIZE, TICK_TIME, TIME_BEFORE_START } from './constants';
import { Grid } from './types';
import { calculateNextGenerationGrid } from './utils';


const randomGrid: Grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null)
  .map(() => Math.random() > 0.7));

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
