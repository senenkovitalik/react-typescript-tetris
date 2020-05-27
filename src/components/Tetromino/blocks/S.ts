import Tetromino from '../Tetromino';
import Coordinate from '../../Coordinate/Coordinate';
import {SIDES} from '../constants';

export default class S extends Tetromino {
  constructor(initCol: number, numCols: number) {
    super('S', initCol, numCols);

    this.startCol = this.calculateStartCol(initCol, 3);
    this.coords = [
      new Coordinate(-1, this.startCol),
      new Coordinate(-1, this.startCol + 1),
      new Coordinate(-2, this.startCol + 1),
      new Coordinate(-2, this.startCol + 2)
    ];
  }

  rotate(): void {
    switch (this.orientation) {
      // case letter mean current orientation
      case 'N': {
        const [left, centerBottom, centerUp, right] = this.coords;
        this.coords = [
          left.right().up(),
          centerBottom,
          centerUp.down().right(),
          right.down(2)
        ];
        break;
      }
      case 'E': {
        const [up, centerLeft, centerRight, bottom] = this.coords;
        this.coords = [
          up.left().down(),
          centerLeft,
          centerRight.up().left(),
          bottom.up(2)
        ];
        break;
      }
      case 'S': {
        const [left, centerBottom, centerUp, right] = this.coords;
        this.coords = [
          left.up(),
          centerBottom.left(),
          centerUp.down(),
          right.down(2).left()
        ];
        break;
      }
      case 'W': {
        const [up, centerLeft, centerRight, bottom] = this.coords;
        this.coords = [
          up.down(),
          centerLeft.right(),
          centerRight.up(),
          bottom.up(2).right()
        ];
        break;
      }
    }

    this.orientation = SIDES[this.orientation];
  }
}
