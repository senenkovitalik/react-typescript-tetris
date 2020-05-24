import {Coordinate} from './types';

type TetrominoType = 'I' | 'O' | 'L' | 'S' | 'Z' | 'T' | 'J';

export const tetrominoTypes: TetrominoType[] = ["I", "O", "L", "S", "Z", "T", "J"];

export default class Tetromino {
  type: TetrominoType;
  startCol: number = 0;
  coords: Coordinate[] = [];
  num_colls: number;

  constructor(type: TetrominoType, initCol: number, num_colls: number) {
    this.type = type;
    this.num_colls = num_colls;

    switch (type) {
      case "I":
        this.startCol = this.calculateStartCol(initCol, 4);
        this.coords = [
          {row: -1, col: this.startCol},
          {row: -1, col: this.startCol + 1},
          {row: -1, col: this.startCol + 2},
          {row: -1, col: this.startCol + 3},
        ];
        break;
      case "O":
        this.startCol = this.calculateStartCol(initCol, 2);
        this.coords = [
          {row: -2, col: this.startCol},
          {row: -1, col: this.startCol},
          {row: -2, col: this.startCol + 1},
          {row: -1, col: this.startCol + 1},
        ];
        break;
      case "L":
        this.startCol = this.calculateStartCol(initCol, 3);
        this.coords = [
          {row: -2, col: this.startCol},
          {row: -1, col: this.startCol},
          {row: -2, col: this.startCol + 1},
          {row: -2, col: this.startCol + 2},
        ];
        break;
      case "S":
        this.startCol = this.calculateStartCol(initCol, 3);
        this.coords = [
          {row: -1, col: this.startCol},
          {row: -1, col: this.startCol + 1},
          {row: -2, col: this.startCol + 1},
          {row: -2, col: this.startCol + 2},
        ];
        break;
      case "Z":
        this.startCol = this.calculateStartCol(initCol, 3);
        this.coords = [
          {row: -2, col: this.startCol},
          {row: -2, col: this.startCol+1},
          {row: -1, col: this.startCol+1},
          {row: -1, col: this.startCol+2},
        ];
        break;
      case "T":
        this.startCol = this.calculateStartCol(initCol, 3);
        this.coords = [
          {row: -2, col: this.startCol},
          {row: -2, col: this.startCol+1},
          {row: -2, col: this.startCol+2},
          {row: -1, col: this.startCol+1},
        ];
        break;
      case "J":
        this.startCol = this.calculateStartCol(initCol, 3);
        this.coords = [
          {row: -2, col: this.startCol},
          {row: -1, col: this.startCol},
          {row: -1, col: this.startCol+1},
          {row: -1, col: this.startCol+2},
        ];
        break;
    }
  }

  private calculateStartCol(initCol: number, length: number) {
    const delta = initCol + length - this.num_colls;
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
}
