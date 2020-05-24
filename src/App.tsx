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

  const [tetromino, setTetromino] = useState<Tetromino>(getRandomTetromino());

  useEffect(() => {
    const intervalID = setInterval(() => {
      if (canMoveDown()) {
        moveTetrominoDown();
      } else {
        setTetromino(getRandomTetromino());
      }
    }, 1000);

    return () => clearInterval(intervalID);
  });

  const moveTetrominoDown = () => {
    const newMatrix = [...matrix];

    eraseTetronimoPrevCoords(newMatrix);

    tetromino.moveDown();

    fillTetronimoNextCoords(newMatrix);

    updateMatrix(newMatrix);
  };

  const moveTetrominoRight = () => {
    if (canMoveRight()) {
      const newMatrix = [...matrix];

      eraseTetronimoPrevCoords(newMatrix);

      tetromino.moveRight();

      fillTetronimoNextCoords(newMatrix);

      updateMatrix(newMatrix);
    }
  };

  const moveTetrominoLeft = () => {
    if (canMoveLeft()) {
      const newMatrix = [...matrix];

      eraseTetronimoPrevCoords(newMatrix);

      tetromino.moveLeft();

      fillTetronimoNextCoords(newMatrix);

      updateMatrix(newMatrix);
    }
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

    const isEnd = nextLeftCoords.map(({col}) => col === NUM_COLLS).includes(true);

    if (isEnd) {
      return false;
    }

    const nextMatrixValues = nextLeftCoords.map(({col, row}) => matrix[row][col]);

    return !nextMatrixValues.includes(1);
  };

  const eraseTetronimoPrevCoords = (newMatrix: Matrix) => {
    tetromino.coordinates.forEach(({row, col}) => {
      if (row >= 0 && row < NUM_ROWS) {
        newMatrix[row][col] = 0;
      }
    });
  };

  const fillTetronimoNextCoords = (newMatrix: Matrix) => {
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
    </React.Fragment>
  );
}
