import Tetromino from '../Tetromino';
import Coordinate from '../../Coordinate/Coordinate';

export default class O extends Tetromino {
  constructor(initCol: number, numCols: number) {
    super('O', initCol, numCols);

    this.startCol = this.calculateStartCol(initCol, 2);
    this.coords = [
      new Coordinate(-2, this.startCol),
      new Coordinate(-1, this.startCol),
      new Coordinate(-2, this.startCol + 1),
      new Coordinate(-1, this.startCol + 1),
    ];
  }

  rotate(): void {

  }
}
