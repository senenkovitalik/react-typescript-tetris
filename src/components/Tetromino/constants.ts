import {Side, TetrominoType} from './types';

export const TETROMINO_TYPES: TetrominoType[] = ["I", "O", "L", "S", "Z", "T", "J"];

export const SIDES: Side = {
  'N': {
    left: 'W',
    right: 'E'
  },
  'W': {
    left: 'S',
    right: 'N'
  },
  'S': {
    left: 'E',
    right: 'W'
  },
  'E': {
    left: 'N',
    right: 'S'
  }
};