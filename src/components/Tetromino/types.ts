export type TetrominoType = 'I' | 'O' | 'L' | 'S' | 'Z' | 'T' | 'J';

export type Orientation = "N" | "W" | "S" | "E";

export type Side = {
  [O in Orientation]: Orientation
}