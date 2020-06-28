import React, {useEffect, useState} from 'react';
import './App.css';
import Tetromino from './components/Tetromino/Tetromino';
import TetrominoFactory from './components/Tetromino/TetrominoFactory';
import {TETROMINO_TYPES} from './components/Tetromino/constants';
import Row from './components/row/Row';
import {getRandomInt} from './components/utils';
import Matrix from "./components/Matrix/Matrix";

const ROWS = 20;
const COLS = 10;

const factory = new TetrominoFactory(COLS);
const matrix = new Matrix(ROWS, COLS);

export default function App({count}: { count: number }) {
  const [matrixBody, updateMatrixBody] = useState<number[][]>(matrix.body);

  const getRandomTetromino = (): Tetromino => {
    const randomNumber = getRandomInt(TETROMINO_TYPES.length);
    const randomCol = getRandomInt(COLS);

    return factory.createTetromino(TETROMINO_TYPES[randomNumber], randomCol);
  };

  const [tetromino, setTetromino] = useState<Tetromino>(getRandomTetromino());

  const moveRight = () => {
    if (matrix.canMove(tetromino, "RIGHT")) {
      matrix.clearCoordinates(tetromino.coordinates);
      tetromino.moveRight();
      matrix.fillCoordinates(tetromino.coordinates);
      updateMatrixBody(matrix.body);
    }
  };

  const moveLeft = () => {
    if (matrix.canMove(tetromino, "LEFT")) {
      matrix.clearCoordinates(tetromino.coordinates);
      tetromino.moveLeft();
      matrix.fillCoordinates(tetromino.coordinates);
      updateMatrixBody(matrix.body);
    }
  };

  const moveDown = () => {
    if (matrix.canMove(tetromino, "DOWN")) {
      matrix.clearCoordinates(tetromino.coordinates);
      tetromino.moveDown();
      matrix.fillCoordinates(tetromino.coordinates);
      updateMatrixBody(matrix.body);
    }
  }

  const rotate = () => {
    matrix.clearCoordinates(tetromino.coordinates);
    tetromino.rotate();
    matrix.fillCoordinates(tetromino.coordinates);
    updateMatrixBody(matrix.body);
  };

  const moveDownImmediately = () => {
    matrix.clearCoordinates(tetromino.coordinates);

    while (matrix.canMove(tetromino, "DOWN")) {
      tetromino.moveDown();
    }

    matrix.fillCoordinates(tetromino.coordinates);
    updateMatrixBody(matrix.body);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    // 65, 37 - left
    // 68, 39 - right
    // 87, 38 - rotate
    // 83, 40 - down
    // 13 - move down immediately

    switch (event.keyCode) {
      case 65:
      case 37:
        moveLeft();
        break;
      case 68:
      case 39:
        moveRight();
        break;
      case 87:
      case 38:
        rotate();
        break;
      case 83:
      case 40:
        moveDown();
        break;
      case 13:
        moveDownImmediately();
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, false);

    return () => document.removeEventListener("keydown", handleKeyPress, false);
  });

  useEffect(() => {
    if (matrix.canMove(tetromino, "DOWN")) {
      moveDown();
    } else {
      setTetromino(getRandomTetromino());
    }
  }, [count]);

  return (
    <React.Fragment>
      <div className="playing-area">
        {matrixBody.map((row, i) => <Row key={i} data={row}/>)}
      </div>
      <button onClick={moveLeft}>{'<'}</button>
      <button onClick={moveRight}>{'>'}</button>
      <button onClick={rotate}>{'rotate'}</button>
      <button onClick={moveDownImmediately}>{'v'}</button>
    </React.Fragment>
  );
}
