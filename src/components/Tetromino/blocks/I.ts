import Tetromino from '../Tetromino';
import Coordinate from '../../Coordinate/Coordinate';
import {SIDES} from '../constants';

export default class I extends Tetromino {
  constructor(initCol: number, numCols: number) {
    super('I', initCol, numCols);

    this.startCol = this.calculateStartCol(initCol, 4);
    this.coords = [
      new Coordinate(-1, this.startCol),
      new Coordinate(-1, this.startCol + 1),
      new Coordinate(-1, this.startCol + 2),
      new Coordinate(-1,  this.startCol + 3),
    ];
  }

  rotate(): void {
    switch (this.orientation) {
      // case letter mean current orientation
      case 'N': {
        const [left, centerLeft, centerRight, right] = this.coords;
        this.coords = [
          left.right(2).up(2),
          centerLeft.right().up(),
          centerRight,
          right.left().down()
        ];
        break;
      }
      case 'E': {
        const [up, centerUp, centerBottom, bottom] = this.coords;
        this.coords = [
          up.left(2).down(),
          centerUp.left(),
          centerBottom.up(),
          bottom.up(2).right()
        ];
        break;
      }
      case 'S': {
        const [left, centerLeft, centerRight, right] = this.coords;
        this.coords = [
          left.right().up(),
          centerLeft,
          centerRight.left().down(),
          right.left(2).down(2)
        ]; // U C R B
        break;
      }
      case 'W': {
        const [up, centerUp, centerBottom, bottom] = this.coords;
        this.coords = [
          up.left(1).down(),
          centerUp,
          centerBottom.up().right(),
          bottom.up(2).right(2)
        ]; // L C R B
        break;
      }
    }

    this.orientation = SIDES[this.orientation];
  }
}
