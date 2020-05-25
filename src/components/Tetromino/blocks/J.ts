import Tetromino from '../Tetromino';

export default class J extends Tetromino {
  constructor(initCol: number, numCols: number) {
    super('J', initCol, numCols);

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