import React, { useEffect, useRef } from "react";
import { Board } from "../../../types/Board";
import { useGameConfig } from "../../providers/GameConfigProvider";
import { useGameStateContext } from "../../providers/GameStateProvider";
import { Puyo } from "./Puyo";

const renderFixedPuyo = (
  x: number,
  y: number,
  fixedBoard: Board
): string | null => {
  const puyo = fixedBoard[y][x];
  return puyo ? puyo.color : null;
};

export const GameBoard: React.FC = () => {
  const { config } = useGameConfig();
  const { state } = useGameStateContext();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        containerRef.current.style.height = `${
          (width / state.fixedBoard[0].length) * state.fixedBoard.length
        }px`;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [state.fixedBoard]);

  const containerStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${state.fixedBoard[0].length}, 1fr)`,
    gridTemplateRows: `repeat(${state.fixedBoard.length}, 1fr)`,
    gridGap: "2px",
    width: "100%",
    outline: "none",
  };

  const gridSize = state.fixedBoard[0].length;

  console.log(state.fixedBoard);

  return (
    <div ref={containerRef} style={containerStyle}>
      {state.fixedBoard.map((_, rowIndex) =>
        state.fixedBoard[rowIndex].map((_, colIndex) => {
          const color = renderFixedPuyo(colIndex, rowIndex, state.fixedBoard);
          return (
            color && (
              <Puyo
                color={color}
                x={colIndex}
                y={rowIndex}
                gridSize={gridSize}
              />
            )
          );
        })
      )}

      {state.chainStep === "none" &&
        [
          state.currentPuyoPuyo.topLeft,
          state.currentPuyoPuyo.topRight,
          state.currentPuyoPuyo.bottomLeft,
          state.currentPuyoPuyo.bottomRight,
        ]
          .filter((puyo) => !puyo.isPlaceholder)
          .map((puyo, index) => (
            <Puyo
              key={`current-${index}`}
              color={puyo.color}
              x={puyo.x}
              y={puyo.y}
              gridSize={gridSize}
            />
          ))}
    </div>
  );
};
