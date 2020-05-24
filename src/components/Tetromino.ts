import {Coordinate} from './types';

export type TetrominoType = 'I' | 'O' | 'L' | 'S' | 'Z' | 'T' | 'J';

export default class Tetromino {
  type: TetrominoType;
  startCol: number;
  coords: Coordinate[] = [];

  constructor(type: TetrominoType, startCol: number) {
    this.type = type;
    this.startCol = startCol;

    switch (type) {
      case "I":
        this.coords = [
          {row: -1, col: startCol},
          {row: -1, col: startCol + 1},
          {row: -1, col: startCol + 2},
          {row: -1, col: startCol + 3},
        ];
        break;
      case "O":
        this.coords = [
          {row: -2, col: startCol},
          {row: -1, col: startCol},
          {row: -2, col: startCol + 1},
          {row: -1, col: startCol + 1},
        ];
        break;
      case "L":
        this.coords = [
          {row: -2, col: startCol},
          {row: -1, col: startCol},
          {row: -2, col: startCol + 1},
          {row: -2, col: startCol + 2},
        ];
        break;
      case "S":
        this.coords = [
          {row: -1, col: startCol},
          {row: -1, col: startCol + 1},
          {row: -2, col: startCol + 1},
          {row: -2, col: startCol + 2},
        ];
        break;
      case "Z":
        this.coords = [
          {row: -2, col: startCol},
          {row: -2, col: startCol+1},
          {row: -1, col: startCol+1},
          {row: -1, col: startCol+2},
        ];
        break;
      case "T":
        this.coords = [
          {row: -2, col: startCol},
          {row: -2, col: startCol+1},
          {row: -2, col: startCol+2},
          {row: -1, col: startCol+1},
        ];
        break;
      case "J":
        this.coords = [
          {row: -2, col: startCol},
          {row: -1, col: startCol},
          {row: -1, col: startCol+1},
          {row: -1, col: startCol+2},
        ];
        break;
    }
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

  moveDown(): void {
    this.coords = this.coords.map(({row, col}) => ({row: row + 1, col}));
  }
}
