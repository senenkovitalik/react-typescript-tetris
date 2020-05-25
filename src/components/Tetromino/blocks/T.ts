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

  rotateRight(): void {
    switch (this.orientation) {
      case 'N': {
        this.orientation = SIDES['N'].right;
        const [left, center, right, bottom] = this.coords;
        this.coords = [{row: right.row - 1, col: right.col - 1}, left, center, bottom]; // U L C B
        break;
      }
      case 'W': {
        this.orientation = SIDES['W'].right;
        break;
      }
      case 'S':
        this.orientation = SIDES['S'].right;
        break;
      case 'E': {
        this.orientation = SIDES['E'].right;
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
        this.orientation = SIDES['N'].right;
    }
  }

  rotateLeft(): void {

  }
}
