import Tetromino from '../Tetromino';

export default class S extends Tetromino {
  constructor(initCol: number, numCols: number) {
    super('S', initCol, numCols);

    this.startCol = this.calculateStartCol(initCol, 3);
    this.coords = [
      {row: -1, col: this.startCol},
      {row: -1, col: this.startCol + 1},
      {row: -2, col: this.startCol + 1},
      {row: -2, col: this.startCol + 2},
    ];
  }

  rotate(): void {

  }
}
