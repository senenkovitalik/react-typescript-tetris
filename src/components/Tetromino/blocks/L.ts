import Tetromino from '../Tetromino';
import Coordinate from '../../Coordinate/Coordinate';
import {SIDES} from '../constants';

export default class L extends Tetromino {
  constructor(initCol: number, numCols: number) {
    super('L', initCol, numCols);

    this.startCol = this.calculateStartCol(initCol, 3);
    this.coords = [
      new Coordinate(-1, this.startCol),
      new Coordinate(-2, this.startCol),
      new Coordinate(-2, this.startCol + 1),
      new Coordinate(-2, this.startCol + 2)
    ];
  }

  rotate(): void {
    switch (this.orientation) {
      // case letter mean current orientation
      case 'N': {
        const [bottom, left, center, right] = this.coords;
        this.coords = [
          bottom.up(2),
          left.up().right(),
          center,
          right.left().down()
        ];
        break;
      }
      case 'E': {
        const [left, up, center, bottom] = this.coords;
        this.coords = [
          left.right(2),
          up.right().down(),
          center,
          bottom.left().up()
        ];
        break;
      }
      case 'S': {
        const [up, right, center, left] = this.coords;
        this.coords = [
          left.right().up(),
          center,
          right.down().left(),
          up.down(2)
        ];
        break;
      }
      case 'W': {
        const [up, center, bottom, right] = this.coords;
        this.coords = [
          up.left().down(2),
          bottom.up().left(),
          center,
          right.up()
        ];
        break;
      }
    }

    this.orientation = SIDES[this.orientation];
  }
}
