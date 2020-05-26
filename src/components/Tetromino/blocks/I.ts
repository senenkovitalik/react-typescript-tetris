import Tetromino from '../Tetromino';
import Coordinate from '../../Coordinate/Coordinate';

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

  }
}
