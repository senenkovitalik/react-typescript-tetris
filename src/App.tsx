import React, {useEffect, useState} from 'react';
import './App.css';
import {Matrix, Coordinate} from './components/types';
import Tetromino from './components/Tetromino/Tetromino';
import TetrominoFactory from './components/Tetromino/TetrominoFactory';
import {TETROMINO_TYPES} from './components/Tetromino/constants';
import Row from './components/row/Row';
import {getRandomInt} from './components/utils';

export default function App() {
  const NUM_ROWS = 20;
  const NUM_COLS = 10;

  const factory = new TetrominoFactory(NUM_COLS);

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
    const randomNumber = getRandomInt(TETROMINO_TYPES.length);
    const randomCol = getRandomInt(NUM_COLS);

    return factory.createTetromino(TETROMINO_TYPES[randomNumber], randomCol);
  };

  const [tetromino, setTetromino] = useState<Tetromino>(getRandomTetromino());
  const [isActionPerformed, setActionPerformedState] = useState(false);

  useEffect(() => {
    const intervalID = setInterval(() => {
      if (canMoveDown()) {
        moveTetrominoDown();
        setActionPerformedState(false);
      } else {
        setTetromino(getRandomTetromino());
      }
    }, 700);

    return () => clearInterval(intervalID);
  });

  const moveTetrominoDown = () => {
    const newMatrix = [...matrix];

    eraseTetrominoPrevCoords(newMatrix);

    tetromino.moveDown();

    fillTetrominoNextCoords(newMatrix);

    updateMatrix(newMatrix);
  };

  const moveTetrominoRight = () => {
    if (!isActionPerformed && canMoveRight()) {
      const newMatrix = [...matrix];

      eraseTetrominoPrevCoords(newMatrix);

      tetromino.moveRight();

      fillTetrominoNextCoords(newMatrix);

      updateMatrix(newMatrix);
      setActionPerformedState(true);
    }
  };

  const moveTetrominoLeft = () => {
    if (!isActionPerformed && canMoveLeft()) {
      const newMatrix = [...matrix];

      eraseTetrominoPrevCoords(newMatrix);

      tetromino.moveLeft();

      fillTetrominoNextCoords(newMatrix);

      updateMatrix(newMatrix);
      setActionPerformedState(true);
    }
  };

  const rotateRight = () => {
    tetromino.rotateRight()
  };

  const canMoveDown = (): boolean => {
    const nextBottomCoords: Coordinate[] = tetromino.bottomBorderCoords.map(({col, row}) => ({
      row: row + 1,
      col
    }));

    const isEnd = nextBottomCoords.map(({row}) => row === NUM_ROWS).includes(true);

    if (isEnd) {
      return false;
    }

    const nextMatrixValues = nextBottomCoords.map(({col, row}) => matrix[row < 0 ? 0 : row][col]);

    return !nextMatrixValues.includes(1);
  };

  const canMoveLeft = (): boolean => {
    const nextLeftCoords: Coordinate[] = tetromino.leftBorderCoords.map(({col, row}) => ({
      row,
      col: col - 1
    }));

    const isEnd = nextLeftCoords.map(({col}) => col === -1).includes(true);

    if (isEnd) {
      return false;
    }

    const nextMatrixValues = nextLeftCoords.map(({col, row}) => matrix[row][col]);

    return !nextMatrixValues.includes(1);
  };

  const canMoveRight = (): boolean => {
    const nextLeftCoords: Coordinate[] = tetromino.rightBorderCoords.map(({col, row}) => ({
      row,
      col: col + 1
    }));

    const isEnd = nextLeftCoords.map(({col}) => col === NUM_COLS).includes(true);

    if (isEnd) {
      return false;
    }

    const nextMatrixValues = nextLeftCoords.map(({col, row}) => matrix[row][col]);

    return !nextMatrixValues.includes(1);
  };

  const eraseTetrominoPrevCoords = (newMatrix: Matrix) => {
    tetromino.coordinates.forEach(({row, col}) => {
      if (row >= 0 && row < NUM_ROWS) {
        newMatrix[row][col] = 0;
      }
    });
  };

  const fillTetrominoNextCoords = (newMatrix: Matrix) => {
    tetromino.coordinates.forEach(({row, col}) => {
      if (row >= 0 && row < NUM_ROWS) {
        newMatrix[row][col] = 1;
      }
    });
  };

  return (
    <React.Fragment>
      <div className="playing-area">
        {matrix.map((row, i) => <Row key={i} data={row}/>)}
      </div>
      <button onClick={moveTetrominoLeft}>{'<'}</button>
      <button onClick={moveTetrominoRight}>{'>'}</button>
      <button onClick={rotateRight}>{'rotate >'}</button>
    </React.Fragment>
  );
}
