import { NeighboursPositions } from "./types";


export const GRID_SIZE = 50;
export const TICK_TIME = 400;
export const TIME_BEFORE_START = 1000;

export const NEIGHBOURS_POSITIONS: NeighboursPositions = [
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