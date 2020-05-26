import Tetromino from '../Tetromino';
import {SIDES} from '../constants';

export default class T extends Tetromino {
  constructor(initCol: number, numCols: number) {
    super('T', initCol, numCols);

    this.startCol = this.calculateStartCol(initCol, 3);
    this.coords = [
      {row: -2, col: this.startCol},
      {row: -2, col: this.startCol + 1},
      {row: -2, col: this.startCol + 2},
      {row: -1, col: this.startCol + 1},
    ];
  }

  rotate(): void {
    switch (this.orientation) {
      // case letter mean current orientation
      case 'N': {
        const [left, center, right, bottom] = this.coords;
        this.coords = [{row: right.row - 1, col: right.col - 1}, left, center, bottom]; // U L C B
        break;
      }
      case 'W': {
        const [up, center, right, bottom] = this.coords;
        this.coords = [
          {row: up.row + 1, col: up.col - 1},
          center,
          right,
          bottom
        ]; // L C R B
        break;
      }
      case 'S': {
        const [up, left, center, right] = this.coords;
        this.coords = [
          up,
          center,
          right,
          {row: left.row + 1, col: left.col + 1}
        ]; // U C R B
        break;
      }
      case 'E': {
        const [up, left, center, bottom] = this.coords;
        this.coords = [
          {row: left.row - 1, col: left.col + 1},
          {row: bottom.row - 1, col: bottom.col - 1},
          center,
          {row: up.row + 1, col: up.col + 1}
        ]; // U L C B
        break;
      }
    }

    this.orientation = SIDES[this.orientation];
  }
}
