import React, {useEffect, useState} from 'react';
import './App.css';
import {Matrix} from './components/types';
import Tetromino from './components/Tetromino/Tetromino';
import TetrominoFactory from './components/Tetromino/TetrominoFactory';
import {TETROMINO_TYPES} from './components/Tetromino/constants';
import Row from './components/row/Row';
import {getRandomInt} from './components/utils';
import Coordinate from './components/Coordinate/Coordinate';

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
        moveDown();
        setActionPerformedState(false);
      } else {
        setTetromino(getRandomTetromino());
      }
    }, 700);

    return () => clearInterval(intervalID);
  });

  const moveDown = () => {
    const newMatrix = [...matrix];

    erasePrevCoords(newMatrix);

    tetromino.moveDown();

    fillNextCoords(newMatrix);

    updateMatrix(newMatrix);
  };

  const moveRight = () => {
    if (!isActionPerformed && canMoveRight()) {
      const newMatrix = [...matrix];

      erasePrevCoords(newMatrix);
      tetromino.moveRight();
      fillNextCoords(newMatrix);

      updateMatrix(newMatrix);
      setActionPerformedState(true);
    }
  };

  const moveLeft = () => {
    if (!isActionPerformed && canMoveLeft()) {
      const newMatrix = [...matrix];

      erasePrevCoords(newMatrix);

      tetromino.moveLeft();

      fillNextCoords(newMatrix);

      updateMatrix(newMatrix);
      setActionPerformedState(true);
    }
  };

  const rotate = () => {
    const newMatrix = [...matrix];

    erasePrevCoords(newMatrix);
    tetromino.rotate();
    fillNextCoords(newMatrix);

    updateMatrix(newMatrix);
  };

  const canMoveDown = (): boolean => {
    const nextCoordsPredicate = ({coordinates: {row, col}}: Coordinate) => new Coordinate(row, col).down();
    const nextBottomCoords: Coordinate[] = tetromino.bottomBorderCoords.map(nextCoordsPredicate);

    const isEnd = nextBottomCoords
      .map(({coordinates: {row}}) => row === NUM_ROWS)
      .includes(true);

    if (isEnd) {
      return false;
    }

    const nextValuesPredicate = ({coordinates: {col, row}}: Coordinate): number => matrix[row < 0 ? 0 : row][col];
    const nextMatrixValues = nextBottomCoords.map(nextValuesPredicate);

    return !nextMatrixValues.includes(1);
  };

  const canMoveLeft = (): boolean => {
    const nextCoordsPredicate = ({coordinates: {row, col}}: Coordinate) => new Coordinate(row, col).left();
    const nextLeftCoords: Coordinate[] = tetromino.leftBorderCoords.map(nextCoordsPredicate);

    const isEnd = nextLeftCoords
      .map(({coordinates: {col}}) => col === -1)
      .includes(true);

    if (isEnd) {
      return false;
    }

    const nextMatrixValues = nextLeftCoords.map(({coordinates: {col, row}}) => matrix[row][col]);

    return !nextMatrixValues.includes(1);
  };

  const canMoveRight = (): boolean => {
    const nextCoordsPredicate = ({coordinates: {row, col}}: Coordinate) => new Coordinate(row, col).right();
    const nextLeftCoords: Coordinate[] = tetromino.rightBorderCoords.map(nextCoordsPredicate);

    const isEnd = nextLeftCoords
      .map(({coordinates: {col}}) => col === NUM_COLS)
      .includes(true);

    if (isEnd) {
      return false;
    }

    const nextMatrixValues = nextLeftCoords.map(({coordinates: {row, col}}) => matrix[row][col]);

    return !nextMatrixValues.includes(1);
  };

  const erasePrevCoords = (newMatrix: Matrix) => {
    tetromino.coordinates.forEach(({coordinates: {row, col}}) => {
      if (row >= 0 && row < NUM_ROWS) {
        newMatrix[row][col] = 0;
      }
    });
  };

  const fillNextCoords = (newMatrix: Matrix) => {
    tetromino.coordinates.forEach(({coordinates: {row, col}}) => {
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
      <button onClick={moveLeft}>{'<'}</button>
      <button onClick={moveRight}>{'>'}</button>
      <button onClick={rotate}>{'rotate'}</button>
    </React.Fragment>
  );
}
