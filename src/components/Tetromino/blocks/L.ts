import Tetromino from '../Tetromino';
import Coordinate from '../../Coordinate/Coordinate';

export default class L extends Tetromino {
  constructor(initCol: number, numCols: number) {
    super('L', initCol, numCols);

    this.startCol = this.calculateStartCol(initCol, 3);
    this.coords = [
      new Coordinate(-2, this.startCol),
      new Coordinate(-1, this.startCol),
      new Coordinate(-2, this.startCol + 1),
      new Coordinate(-2, this.startCol + 2)
    ];
  }

  rotate(): void {

  }
}
