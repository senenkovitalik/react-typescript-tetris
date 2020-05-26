export default class Coordinate {
  private row: number;
  private col: number;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }

  get coordinates() {
    return {
      row: this.row,
      col: this.col
    };
  }

  public up(step: number = 1): Coordinate {
    this.row = this.row - step;

    return this;
  }

  public down(step: number = 1): Coordinate {
    this.row = this.row + step;

    return this;
  }

  public left(step: number = 1): Coordinate {
    this.col = this.col - step;

    return this;
  }

  public right(step: number = 1): Coordinate {
    this.col = this.col + step;

    return this;
  }
}