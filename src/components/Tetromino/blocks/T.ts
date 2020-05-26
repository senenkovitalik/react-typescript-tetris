import Tetromino from '../Tetromino';
import {SIDES} from '../constants';
import Coordinate from '../../Coordinate/Coordinate';

export default class T extends Tetromino {
  constructor(initCol: number, numCols: number) {
    super('T', initCol, numCols);

    this.startCol = this.calculateStartCol(initCol, 3);
    this.coords = [
      new Coordinate(-2, this.startCol),
      new Coordinate(-2, this.startCol + 1),
      new Coordinate(-2, this.startCol + 2),
      new Coordinate(-1, this.startCol + 1),
    ];
  }

  rotate(): void {
    switch (this.orientation) {
      // case letter mean current orientation
      case 'N': {
        const [left, center, right, bottom] = this.coords;
        this.coords = [
          right.up().left(),
          left,
          center,
          bottom
        ]; // U L C B
        break;
      }
      case 'W': {
        const [up, center, right, bottom] = this.coords;
        this.coords = [
          up.down().left(),
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
          left.down().right()
        ]; // U C R B
        break;
      }
      case 'E': {
        const [up, left, center, bottom] = this.coords;
        this.coords = [
          left.up().right(),
          bottom.up().left(),
          center,
          up.down().right()
        ]; // U L C B
        break;
      }
    }

    this.orientation = SIDES[this.orientation];
  }
}
