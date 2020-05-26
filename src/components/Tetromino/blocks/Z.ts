import Tetromino from '../Tetromino';
import {SIDES} from '../constants';
import Coordinate from '../../Coordinate/Coordinate';

export default class Z extends Tetromino {
  constructor(initCol: number, numCols: number) {
    super('Z', initCol, numCols);

    this.startCol = this.calculateStartCol(initCol, 3);
    this.coords = [
      new Coordinate(-2, this.startCol),
      new Coordinate(-2, this.startCol + 1),
      new Coordinate(-1, this.startCol + 1),
      new Coordinate(-1, this.startCol + 2)
    ];
  }

  rotate(): void {
    switch (this.orientation) {
      // case letter mean current orientation
      case 'N': {
        const [left, centerUp, centerBottom, right] = this.coords;
        this.coords = [
          centerUp.right(),
          centerBottom,
          right,
          left.down(2).right()
        ]; // U CL CR B
        break;
      }
      case 'E': {
        const [up, centerLeft, centerRight, bottom] = this.coords;
        this.coords = [
          up.left(2),
          bottom.up(2),
          centerLeft,
          centerRight,
        ]; // L CU CB R
        break;
      }
      case 'S': {
        const [left, centerUp, centerBottom, right] = this.coords;
        this.coords = [
          centerUp,
          left.down(1),
          centerBottom,
          right.down().left(2)
        ]; // U CL CR B
        break;
      }
      case 'W': {
        const [up, centerLeft, centerRight, bottom] = this.coords;
        this.coords = [
          centerLeft.up(),
          up,
          centerRight,
          bottom.up().right(2)
        ]; // U CL CR B
        break;
      }
    }

    this.orientation = SIDES[this.orientation];
  }
}
