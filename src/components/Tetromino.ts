import {Coordinate} from './types';

type TetrominoType = 'I' | 'O' | 'L' | 'S' | 'Z' | 'T' | 'J';
type Orientation = "N" | "W" | "S" | "E";

type Side = {
  [O in Orientation]: {
    left: Orientation,
    right: Orientation
  }
}

const sides: Side = {
  "N": {
    left: "W",
    right: "E"
  },
  "W": {
    left: "S",
    right: "N"
  },
  "S": {
    left: "E",
    right: "W"
  },
  "E": {
    left: "N",
    right: "S"
  }
};

export const tetrominoTypes: TetrominoType[] = ["I", "O", "L", "S", "Z", "T", "J"];

interface ITetromino {
  type: TetrominoType;
  startCol: number;
  coords: Coordinate[];
  numCols: number;
  orientation: Orientation;
  moveDown: Function;
  moveRight: Function;
  moveLeft: Function;
  rotateRight: Function;
  rotateLeft: Function;
}

export class Tetromino implements ITetromino {
  type: TetrominoType;
  startCol: number = 0;
  coords: Coordinate[] = [];
  numCols: number;
  orientation: Orientation = "N";

  constructor(type: TetrominoType, initCol: number, num_cols: number) {
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

  rotateLeft(): void {
  };

  rotateRight(): void {
  };
}

class TetrominoT extends Tetromino {
  constructor(initCol: number, numCols: number) {
    super("T", initCol, numCols);

    this.startCol = this.calculateStartCol(initCol, 3);
    this.coords = [
      {row: -2, col: this.startCol},
      {row: -2, col: this.startCol + 1},
      {row: -2, col: this.startCol + 2},
      {row: -1, col: this.startCol + 1},
    ];
  }

  rotateRight(): void {
    switch (this.orientation) {
      case "N": {
        this.orientation = sides["N"].right;
        const [left, center, right, bottom] = this.coords;
        this.coords = [{row: right.row - 1, col: right.col - 1}, left, center, bottom]; // U L C B
        break;
      }
      case "W": {
        this.orientation = sides["W"].right;
        break;
      }
      case "S":
        this.orientation = sides["S"].right;
        break;
      case "E": {
        this.orientation = sides["E"].right;
        const [up, left, center, bottom] = this.coords;
        this.coords = [
          {row: left.row - 1, col: left.col + 1},
          {row: bottom.row - 1, col: bottom.col - 1},
          center,
          {row: up.row + 1, col: up.col + 1}
        ]; // U L C B
        break;
      }
      default:
        this.orientation = sides["N"].right;
    }
  }

  rotateLeft(): void {

  }
}

class TetrominoO extends Tetromino {
  constructor(initCol: number, numCols: number) {
    super("O", initCol, numCols);

    this.startCol = this.calculateStartCol(initCol, 2);
    this.coords = [
      {row: -2, col: this.startCol},
      {row: -1, col: this.startCol},
      {row: -2, col: this.startCol + 1},
      {row: -1, col: this.startCol + 1},
    ];
  }

  rotateRight(): void {

  }

  rotateLeft(): void {

  }
}

class TetrominoJ extends Tetromino {
  constructor(initCol: number, numCols: number) {
    super("J", initCol, numCols);

    this.startCol = this.calculateStartCol(initCol, 3);
    this.coords = [
      {row: -2, col: this.startCol},
      {row: -1, col: this.startCol},
      {row: -1, col: this.startCol + 1},
      {row: -1, col: this.startCol + 2},
    ];
  }

  rotateRight(): void {

  }

  rotateLeft(): void {

  }
}

class TetrominoI extends Tetromino {
  constructor(initCol: number, numCols: number) {
    super("I", initCol, numCols);

    this.startCol = this.calculateStartCol(initCol, 4);
    this.coords = [
      {row: -1, col: this.startCol},
      {row: -1, col: this.startCol + 1},
      {row: -1, col: this.startCol + 2},
      {row: -1, col: this.startCol + 3},
    ];
  }

  rotateRight(): void {

  }

  rotateLeft(): void {

  }
}

class TetrominoL extends Tetromino {
  constructor(initCol: number, numCols: number) {
    super("L", initCol, numCols);

    this.startCol = this.calculateStartCol(initCol, 3);
    this.coords = [
      {row: -2, col: this.startCol},
      {row: -1, col: this.startCol},
      {row: -2, col: this.startCol + 1},
      {row: -2, col: this.startCol + 2},
    ];
  }

  rotateRight(): void {

  }

  rotateLeft(): void {

  }
}

class TetrominoS extends Tetromino {
  constructor(initCol: number, numCols: number) {
    super("S", initCol, numCols);

    this.startCol = this.calculateStartCol(initCol, 3);
    this.coords = [
      {row: -1, col: this.startCol},
      {row: -1, col: this.startCol + 1},
      {row: -2, col: this.startCol + 1},
      {row: -2, col: this.startCol + 2},
    ];
  }

  rotateRight(): void {

  }

  rotateLeft(): void {

  }
}

class TetrominoZ extends Tetromino {
  constructor(initCol: number, numCols: number) {
    super("Z", initCol, numCols);

    this.startCol = this.calculateStartCol(initCol, 3);
    this.coords = [
      {row: -2, col: this.startCol},
      {row: -2, col: this.startCol + 1},
      {row: -1, col: this.startCol + 1},
      {row: -1, col: this.startCol + 2},
    ];
  }

  rotateRight(): void {

  }

  rotateLeft(): void {

  }
}

export default class TetrominoFactory {
  private readonly numCols: number;

  constructor(numCols: number) {
    this.numCols = numCols;
  }

  createTetromino(type: TetrominoType, initCol: number): Tetromino {
    switch (type) {
      case "T":
        return new TetrominoT(initCol, this.numCols);
      case "O":
        return new TetrominoO(initCol, this.numCols);
      case "J":
        return new TetrominoJ(initCol, this.numCols);
      case "I":
        return new TetrominoI(initCol, this.numCols);
      case "L":
        return new TetrominoL(initCol, this.numCols);
      case "S":
        return new TetrominoS(initCol, this.numCols);
      case "Z":
        return new TetrominoZ(initCol, this.numCols);
      default:
        return new TetrominoT(initCol, this.numCols);
    }
  }
}
