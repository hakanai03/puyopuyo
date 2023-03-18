import React from "react";
import { Board } from "../../../types/Board";
import { PuyoPair } from "../../../types/PuyoPair";
import { useGameStateContext } from "../../providers/GameStateProvider";

const renderCell = (
  x: number,
  y: number,
  fixedBoard: Board,
  currentPuyoPair: PuyoPair
): string => {
  if (
    (currentPuyoPair.main.x === x && currentPuyoPair.main.y === y) ||
    (currentPuyoPair.sub.x === x && currentPuyoPair.sub.y === y)
  ) {
    return "red";
  }

  const puyo = fixedBoard[y][x];
  return puyo ? puyo.color : "white";
};

export const GameBoard: React.FC = () => {
  const { state } = useGameStateContext();

  const containerStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${state.board[0].length}, 1fr)`,
    gridTemplateRows: `repeat(${state.board.length}, 1fr)`,
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
      {state.board.map((_, rowIndex) =>
        state.board[rowIndex].map((_, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            style={{
              ...puyoContainerStyle,
              backgroundColor: renderCell(
                colIndex,
                rowIndex,
                state.fixedBoard,
                state.currentPuyoPair
              ),
            }}
          ></div>
        ))
      )}
    </div>
  );
};
