import Tetromino from '../Tetromino';

export default class O extends Tetromino {
  constructor(initCol: number, numCols: number) {
    super('O', initCol, numCols);

    this.startCol = this.calculateStartCol(initCol, 2);
    this.coords = [
      {row: -2, col: this.startCol},
      {row: -1, col: this.startCol},
      {row: -2, col: this.startCol + 1},
      {row: -1, col: this.startCol + 1},
    ];
  }

  rotate(): void {

  }
}
