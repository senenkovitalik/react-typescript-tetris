import React from "react";
import "./Row.css";
import Cell from '../cell/Cell';

type Props = {
  data: number[];
}

export default function Row({data}: Props) {
  return (
    <div className="playing-area__row">
      {data.map((val, i) => <Cell key={i} data={val} />)}
    </div>
  );
}
