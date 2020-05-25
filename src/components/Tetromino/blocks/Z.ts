import Tetromino from '../Tetromino';

export default class Z extends Tetromino {
  constructor(initCol: number, numCols: number) {
    super('Z', initCol, numCols);

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
