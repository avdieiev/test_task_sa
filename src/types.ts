export type Grid = boolean[][];

export type GridMaker = (grid: Grid) => Grid;

export type NeighboursPositions = [ number, number ][];