import React from "react";
import { Board } from "../../../types/Board";
import { Puyo } from "../../../types/Puyo";
import { PuyoPuyo } from "../../../types/PuyoPuyo";
import { useGameStateContext } from "../../providers/GameStateProvider";

const renderCell = (
  x: number,
  y: number,
  fixedBoard: Board,
  currentPuyoPuyo: PuyoPuyo
): string => {
  const puyoAt = (puyo?: Puyo): boolean => {
    if (!puyo) return false;
    return puyo.x === x && puyo.y === y;
  };

  if (currentPuyoPuyo.topLeft && puyoAt(currentPuyoPuyo.topLeft))
    return currentPuyoPuyo.topLeft.color;
  if (currentPuyoPuyo.topRight && puyoAt(currentPuyoPuyo.topRight))
    return currentPuyoPuyo.topRight.color;
  if (currentPuyoPuyo.bottomLeft && puyoAt(currentPuyoPuyo.bottomLeft))
    return currentPuyoPuyo.bottomLeft.color;
  if (currentPuyoPuyo.bottomRight && puyoAt(currentPuyoPuyo.bottomRight))
    return currentPuyoPuyo.bottomRight.color;

  const puyo = fixedBoard[y][x];
  return puyo ? puyo.color : "white";
};

export const GameBoard: React.FC = () => {
  const { state } = useGameStateContext();

  const containerStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${state.fixedBoard[0].length}, 1fr)`,
    gridTemplateRows: `repeat(${state.fixedBoard.length}, 1fr)`,
    gridGap: "2px",
    width: "50%",
    outline: "none",
  };

  const puyoContainerStyle: React.CSSProperties = {
    width: "100%",
    paddingTop: "100%",
    position: "relative",
    borderRadius: "50%",
  };

  return (
    <div style={containerStyle}>
      {state.fixedBoard.map((_, rowIndex) =>
        state.fixedBoard[rowIndex].map((_, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            style={{
              ...puyoContainerStyle,
              backgroundColor: renderCell(
                colIndex,
                rowIndex,
                state.fixedBoard,
                state.currentPuyoPuyo
              ),
            }}
          ></div>
        ))
      )}
    </div>
  );
};
