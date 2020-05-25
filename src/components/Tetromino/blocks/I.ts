import Tetromino from '../Tetromino';

export default class I extends Tetromino {
  constructor(initCol: number, numCols: number) {
    super('I', initCol, numCols);

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
