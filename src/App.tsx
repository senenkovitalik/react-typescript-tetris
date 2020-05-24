import React, {useEffect, useState} from 'react';
import './App.css';
import {Matrix, Coordinate} from './components/types';
import Tetromino from './components/Tetromino';
import {TetrominoType} from './components/Tetromino';
import Row from './components/row/Row';

export default function App() {
  const NUM_ROWS = 20;

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

  const getRandomTetromino = (): Tetromino => {
    const tetronimoTypes: TetrominoType[] = ["I", "O", "L", "S", "Z", "T", "J"];
    const randomNumber = Math.floor(Math.random() * Math.floor(tetronimoTypes.length));
    return new Tetromino(tetronimoTypes[randomNumber], 1);
  };

  const [figure, setFigure] = useState<Tetromino>(getRandomTetromino());

  useEffect(() => {
    const intervalID = setInterval(() => {
      if (canMoveDown()) {
        moveFigureDown();
      } else {
        setFigure(getRandomTetromino());
      }
    }, 1000);

    return () => clearInterval(intervalID);
  });

  const moveFigureDown = () => {
      const newMatrix = [...matrix];

      // fill prev coords
      figure.coordinates.forEach(({row, col}) => {
        if (row >= 0 && row < NUM_ROWS) {
          newMatrix[row][col] = 0;
        }
      });

      figure.moveDown();

      // fill next coords
      figure.coordinates.forEach(({row, col}) => {
        if (row >= 0 && row < NUM_ROWS) {
          newMatrix[row][col] = 1;
        }
      });

      updateMatrix(newMatrix);
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
