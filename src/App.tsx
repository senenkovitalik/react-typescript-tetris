import React, {useEffect, useState} from 'react';
import './App.css';
import Row from './components/row/Row';

type Matrix = number[][];

type Coordinate = {
  row: number;
  col: number
};

class Figure {
  coords: Coordinate[];

  constructor(coords: Coordinate[]) {
    this.coords = coords;
  }

  get coordinates(): Coordinate[] {
    return this.coords;
  }

  get bottomBorderCoords(): Coordinate[] {
    const groupMap = new Map();

    this.coords.forEach(({row, col}) => {
      if (groupMap.has(col)) {
        groupMap.set(col, [...groupMap.get(col), row])
      } else {
        groupMap.set(col, [row])
      }
    });

    const borderCoords: Coordinate[] = [];

    groupMap.forEach((rows, col) => {
      const lowestRow = rows.sort().reverse()[0];
      borderCoords.push({
        row: lowestRow,
        col: col
      });
    });

    return borderCoords;
  }

  moveDown(): void {
    this.coords = this.coords.map(({row, col}) => ({row: row + 1, col}));
  }
}

export default function App() {
  const NUM_ROWS = 20;
  const NUM_COLS = 10;
  const initialFigure = new Figure([
    {row: -2, col: 1},
    {row: -2, col: 2},
    {row: -2, col: 3},
    {row: -1, col: 3},
  ]);

  const [matrix, updateMatrix] = useState<Matrix>([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [0, 0, 1, 0, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 0, 1]
  ]);

  const [figure, setFigure] = useState<Figure>(initialFigure);

  // useEffect(() => {
  //   // const intervalID = setInterval(() => {
  //   moveFigureDown();
  //   // }, 1500);
  //
  //   // return () => clearInterval(intervalID);
  // });

  const moveFigureDown = () => {
    if (canMoveDown()) {
      const newMatrix = [...matrix];

      figure.coordinates.forEach(({row, col}) => {
        if (row >= 0 && row < NUM_ROWS) {
          newMatrix[row][col] = 0;
        }
      });

      figure.moveDown();

      figure.coordinates.forEach(({row, col}) => {
        if (row >= 0 && row < NUM_ROWS) {
          newMatrix[row][col] = 1;
        }
      });

      updateMatrix(newMatrix);
    }
  };

  const canMoveDown = (): boolean => {
    const nextBottomCoords: Coordinate[] = figure.bottomBorderCoords.map(({col, row}) => ({
      row: row + 1,
      col
    }));

    const nextMatrixValues = nextBottomCoords.map(({col, row}) => matrix[row < 0 ? 0 : row][col]);

    return !nextMatrixValues.includes(1);
  };

  return (
    <React.Fragment>
      <div className="playing-area">
        {matrix.map((row, i) => <Row key={i} data={row}/>)}
      </div>
      <button onClick={moveFigureDown}>Play</button>
    </React.Fragment>
  );
}
