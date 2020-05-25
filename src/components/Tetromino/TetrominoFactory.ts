import Tetromino from './Tetromino';
import {TetrominoType} from './types';
import T from './blocks/T';
import O from './blocks/O';
import J from './blocks/J';
import I from './blocks/I';
import L from './blocks/L';
import S from './blocks/S';
import Z from './blocks/Z';

export default class TetrominoFactory {
  private readonly numCols: number;

  constructor(numCols: number) {
    this.numCols = numCols;
  }

  createTetromino(type: TetrominoType, initCol: number): Tetromino {
    switch (type) {
      case 'T':
        return new T(initCol, this.numCols);
      case 'O':
        return new O(initCol, this.numCols);
      case 'J':
        return new J(initCol, this.numCols);
      case 'I':
        return new I(initCol, this.numCols);
      case 'L':
        return new L(initCol, this.numCols);
      case 'S':
        return new S(initCol, this.numCols);
      case 'Z':
        return new Z(initCol, this.numCols);
      default:
        return new T(initCol, this.numCols);
    }
  }
}
