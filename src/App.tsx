import React, {useEffect, useState} from 'react';
import './App.css';
import {Matrix, Coordinate} from './components/types';
import Tetromino from './components/Tetromino';
import {tetrominoTypes} from './components/Tetromino';
import Row from './components/row/Row';
import {getRandomInt} from './components/utils';

export default function App() {
  const NUM_ROWS = 20;
  const NUM_COLLS = 10;

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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]);

  const getRandomTetromino = (): Tetromino => {
    const randomNumber = getRandomInt(tetrominoTypes.length);
    const randomCol = getRandomInt(NUM_COLLS);

    return new Tetromino(tetrominoTypes[randomNumber], randomCol, NUM_COLLS);
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

    const isEnd = nextBottomCoords.map(({row}) => row === NUM_ROWS).find(x => x === true);

    if (isEnd) {
      return false;
    }

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
