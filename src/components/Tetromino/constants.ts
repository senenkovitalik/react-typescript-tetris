import {Side, TetrominoType} from './types';

export const TETROMINO_TYPES: TetrominoType[] = ["I", "O", "L", "S", "Z", "T", "J"];

export const SIDES: Side = {
  'N': 'E',
  'W': 'N',
  'S': 'W',
  'E': 'S'
};