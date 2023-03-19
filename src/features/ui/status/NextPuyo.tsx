import React from "react";
import { PuyoPuyo } from "../../../types/PuyoPuyo";
import { Puyo } from "../board/Puyo";

interface NextPuyoProps {
  nextPuyoPuyo: PuyoPuyo;
  gridSize: number;
}

export const NextPuyo: React.FC<NextPuyoProps> = ({
  nextPuyoPuyo,
  gridSize,
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(2, ${gridSize}px)`,
        gridTemplateRows: `repeat(2, ${gridSize}px)`,
        gridGap: "2px",
      }}
    >
      {[
        nextPuyoPuyo.topLeft,
        nextPuyoPuyo.topRight,
        nextPuyoPuyo.bottomLeft,
        nextPuyoPuyo.bottomRight,
      ].map((puyo, index) => (
        <Puyo
          key={`next-${index}`}
          color={puyo.color}
          x={puyo.x % 2}
          y={Math.floor(puyo.y / 2)}
          gridSize={gridSize}
        />
      ))}
    </div>
  );
};
