import Tetromino from '../Tetromino';
import {SIDES} from '../constants';

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

  rotate(): void {
    switch (this.orientation) {
      // case letter mean current orientation
      case 'N': {
        const [left, centerUp, centerBottom, right] = this.coords;
        this.coords = [
          {
            row: centerUp.row,
            col: centerUp.col + 1
          },
          centerBottom,
          right,
          {
            row: left.row + 2,
            col: left.col + 1
          }
        ]; // U CL CR B
        break;
      }
      case 'E': {
        const [up, centerLeft, centerRight, bottom] = this.coords;
        this.coords = [
          {
            row: up.row,
            col: up.col - 2
          },
          {
            row: bottom.row - 2,
            col: bottom.col
          },
          centerLeft,
          centerRight,
        ]; // L CU CB R
        break;
      }
      case 'S': {
        const [left, centerUp, centerBottom, right] = this.coords;
        this.coords = [
          centerUp,
          {
            row: left.row + 1,
            col: left.col
          },
          centerBottom,
          {
            row: right.row + 1,
            col: right.col - 2
          }
        ]; // U CL CR B
        break;
      }
      case 'W': {
        const [up, centerLeft, centerRight, bottom] = this.coords;
        this.coords = [
          {
            row: centerLeft.row - 1,
            col: centerLeft.col
          },
          up,
          centerRight,
          {
            row: bottom.row - 1,
            col: bottom.col + 2
          }
        ]; // U CL CR B
        break;
      }
    }

    this.orientation = SIDES[this.orientation];
  }
}
