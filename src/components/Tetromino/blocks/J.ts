import Tetromino from '../Tetromino';
import Coordinate from '../../Coordinate/Coordinate';

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

  }
}
