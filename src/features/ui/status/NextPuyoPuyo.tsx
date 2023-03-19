import React, { useEffect, useRef } from "react";
import { PuyoPuyo } from "../../../types/PuyoPuyo";
import { useGameStateContext } from "../../providers/GameStateProvider";
import { useResizeObserver } from "../../utils/useResizeObserver";
import { Puyo } from "../board/Puyo";

export const NextPuyoPuyo: React.FC = () => {
  const { state } = useGameStateContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const { nextPuyoPuyo } = state;

  const containerStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "repeat(2, 1fr)",
    gridGap: "2px",
    width: "100%",
  };

  const onResize = (width: number, height: number) => {
    if (containerRef.current) {
      containerRef.current.style.height = `${width}px`;
    }
  };
  useResizeObserver(containerRef, onResize);

  const puyos = [
    nextPuyoPuyo.topLeft,
    nextPuyoPuyo.topRight,
    nextPuyoPuyo.bottomLeft,
    nextPuyoPuyo.bottomRight,
  ];

  return (
    <div ref={containerRef} style={containerStyle}>
      {puyos.map((puyo, index) => (
        <Puyo
          key={`next-${index}`}
          color={puyo.color}
          x={index % 2}
          y={Math.floor(index / 2)}
          gridSize={2}
        />
      ))}
    </div>
  );
};
