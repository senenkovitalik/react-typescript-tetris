import Coordinate from "../Coordinate/Coordinate";
import Tetromino from "../Tetromino/Tetromino";

type MatrixBody = number[][];

type Direction = "UP"|"DOWN"|"LEFT"|"RIGHT";

export default class Matrix {
  public COLS: number = 0;
  public ROWS: number = 0;
  private readonly matrixBody: MatrixBody = [];

  constructor(rows: number, cols: number) {
    if (rows <= 0 || cols <= 0) {
      throw new Error("Invalid row/col values");
    }

    this.COLS = cols;
    this.ROWS = rows;
    this.matrixBody = [...Array(rows)].map(_ => [...Array(cols)].map(_ => 0));
  }

  get body(): MatrixBody {
    return this.matrixBody;
  }

  public canMove(tetromino: Tetromino, direction: Direction): boolean {
    switch (direction) {
      case "DOWN":
        return this.canMoveDown(tetromino);
      case "LEFT":
        return this.canMoveLeft(tetromino);
      case "RIGHT":
        return this.canMoveRight(tetromino);
      default:
        return false;
    }
  }

  private canMoveDown = (tetromino: Tetromino): boolean => {
    const nextCoordsPredicate = ({coordinates: {row, col}}: Coordinate) => new Coordinate(row, col).down();
    const nextBottomCoords: Coordinate[] = tetromino.bottomBorderCoords.map(nextCoordsPredicate);

    const isEnd = nextBottomCoords
      .map(({coordinates: {row}}) => row === this.ROWS)
      .includes(true);

    if (isEnd) {
      return false;
    }

    const nextValuesPredicate = ({coordinates: {col, row}}: Coordinate): number => this.matrixBody[row < 0 ? 0 : row][col];
    const nextMatrixValues = nextBottomCoords.map(nextValuesPredicate);

    return !nextMatrixValues.includes(1);
  };

  private canMoveLeft = (tetromino: Tetromino): boolean => {
    const nextCoordsPredicate = ({coordinates: {row, col}}: Coordinate) => new Coordinate(row, col).left();
    const nextLeftCoords: Coordinate[] = tetromino.leftBorderCoords.map(nextCoordsPredicate);

    const isEnd = nextLeftCoords
      .map(({coordinates: {col}}) => col === -1)
      .includes(true);

    if (isEnd) {
      return false;
    }

    const nextMatrixValues = nextLeftCoords.map(({coordinates: {col, row}}) => this.matrixBody[row][col]);

    return !nextMatrixValues.includes(1);
  };

  private canMoveRight = (tetromino: Tetromino): boolean => {
    const nextCoordsPredicate = ({coordinates: {row, col}}: Coordinate) => new Coordinate(row, col).right();
    const nextLeftCoords: Coordinate[] = tetromino.rightBorderCoords.map(nextCoordsPredicate);

    const isEnd = nextLeftCoords
      .map(({coordinates: {col}}) => col === this.COLS)
      .includes(true);

    if (isEnd) {
      return false;
    }

    const nextMatrixValues = nextLeftCoords.map(({coordinates: {row, col}}) => this.matrixBody[row][col]);

    return !nextMatrixValues.includes(1);
  };

  public clearCoordinates(coordinates: Coordinate[]): void {
    this.fillCells(coordinates, 0);
  }

  public fillCoordinates(coordinates: Coordinate[]): void {
    this.fillCells(coordinates, 1);
  }

  private fillCells(coordinates: Coordinate[], value: 0|1): void {
    coordinates.forEach(({coordinates: {row, col}}) => {
      if (row >= 0 && row < this.ROWS && col >= 0 && col < this.COLS) {
        this.matrixBody[row][col] = value;
      }
    });
  }
}