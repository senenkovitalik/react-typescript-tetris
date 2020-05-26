import Tetromino from '../Tetromino';
import Coordinate from '../../Coordinate/Coordinate';
import {SIDES} from '../constants';

export default class J extends Tetromino {
  constructor(initCol: number, numCols: number) {
    super('J', initCol, numCols);

    this.startCol = this.calculateStartCol(initCol, 3);
    this.coords = [
      new Coordinate(-2, this.startCol),
      new Coordinate(-1, this.startCol),
      new Coordinate(-1, this.startCol + 1),
      new Coordinate(-1, this.startCol + 2)
    ];
  }

  rotate(): void {
    switch (this.orientation) {
      // case letter mean current orientation
      case 'N': {
        const [leftUp, leftDown, center, right] = this.coords;
        this.coords = [
          leftUp.right(1),
          leftDown.right(2).up(),
          center,
          right.down().left()
        ];
        break;
      }
      case 'E': {
        const [upLeft, upRight, center, bottom] = this.coords;
        this.coords = [
          upLeft.left().down(),
          center,
          upRight.down(),
          bottom.right()
        ];
        break;
      }
      case 'S': {
        const [left, center, right, rightBottom] = this.coords;
        this.coords = [
          left.up().right(),
          center,
          right.left().down(),
          rightBottom.left(2)
        ];
        break;
      }
      case 'W': {
        const [up, center, bottom, bottomLeft] = this.coords;
        this.coords = [
          up.left(),
          bottomLeft.up(),
          center,
          bottom.up().right()
        ];
        break;
      }
    }

    this.orientation = SIDES[this.orientation];
  }
}
