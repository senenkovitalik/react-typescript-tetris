import React from 'react';
import './Cell.css';

type Props = {
  data: number;
}

export default function Cell({data}: Props) {
  const occupied = data === 1 ? 'playing-area__cell_occupied' : null;
  return (
    <div className={`playing-area__cell ${occupied}`} />
  );
}