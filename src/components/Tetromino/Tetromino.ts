import {Coordinate} from '../types';
import {Orientation, TetrominoType} from './types';

export default abstract class Tetromino {
  type: TetrominoType;
  startCol: number = 0;
  coords: Coordinate[] = [];
  numCols: number;
  orientation: Orientation = "N";

  protected constructor(type: TetrominoType, initCol: number, num_cols: number) {
    this.type = type;
    this.numCols = num_cols;
  }

  protected calculateStartCol(initCol: number, length: number) {
    const delta = initCol + length - this.numCols;
    return delta > 0 ? initCol - delta : initCol;
  }

  get coordinates(): Coordinate[] {
    return this.coords;
  }

  get bottomBorderCoords(): Coordinate[] {
    const groupMap = new Map();

    this.coords.forEach(({row, col}) => {
      if (groupMap.has(col)) {
        groupMap.set(col, [...groupMap.get(col), row])
      } else {
        groupMap.set(col, [row])
      }
    });

    const borderCoords: Coordinate[] = [];

    groupMap.forEach((rows, col) => {
      const lowestRow = rows.sort((a: number, b: number) => a - b)[rows.length - 1];
      borderCoords.push({
        row: lowestRow,
        col: col
      });
    });

    return borderCoords;
  }

  get leftBorderCoords(): Coordinate[] {
    const groupMap = new Map();

    this.coords.forEach(({row, col}) => {
      if (groupMap.has(row)) {
        groupMap.set(row, [...groupMap.get(row), col])
      } else {
        groupMap.set(row, [col])
      }
    });

    const borderCoords: Coordinate[] = [];

    groupMap.forEach((cols, row) => {
      const leftmostCol = cols.sort((a: number, b: number) => a - b)[0];
      borderCoords.push({
        row,
        col: leftmostCol
      });
    });

    return borderCoords;
  }

  get rightBorderCoords(): Coordinate[] {
    const groupMap = new Map();

    this.coords.forEach(({row, col}) => {
      if (groupMap.has(row)) {
        groupMap.set(row, [...groupMap.get(row), col])
      } else {
        groupMap.set(row, [col])
      }
    });

    const borderCoords: Coordinate[] = [];

    groupMap.forEach((cols, row) => {
      const leftmostCol = cols.sort((a: number, b: number) => a - b)[cols.length - 1];
      borderCoords.push({
        row,
        col: leftmostCol
      });
    });

    return borderCoords;
  }

  moveDown(): void {
    this.coords = this.coords.map(({row, col}) => ({row: row + 1, col}));
  }

  moveRight(): void {
    this.coords = this.coords.map(({row, col}) => ({row: row, col: col + 1}));
  }

  moveLeft(): void {
    this.coords = this.coords.map(({row, col}) => ({row: row, col: col - 1}));
  }

  abstract rotateLeft(): void

  abstract rotateRight(): void
}
