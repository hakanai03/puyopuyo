import React from "react";
import { GameBoard } from "../features/ui/board/GameBoard";
import { KeyboardHandler } from "../features/ui/inputs/keyboardHandler";
import { Instructions } from "../features/ui/instructions/Instructions";
import { GameStatus } from "../features/ui/status/GameStatus";
import { NextPuyoPuyo } from "../features/ui/status/NextPuyoPuyo";
import { useGameConfig } from "../features/providers/GameConfigProvider";

export const PuyoPuyoGame: React.FC = () => {
  const { config } = useGameConfig();

  const containerStyle: React.CSSProperties = {
    display: "flex",
    width: "100%",
    maxWidth: "350px",
  };

  const leftContainerStyle: React.CSSProperties = {
    flex: config.boardWidth,
  };

  const rightContainerStyle: React.CSSProperties = {
    flex: 2,
    marginLeft: "16px",
  };

  return (
    <div style={containerStyle}>
      <div style={leftContainerStyle}>
        <KeyboardHandler />
        <GameBoard />
        <Instructions />
      </div>
      <div style={rightContainerStyle}>
        <GameStatus />
        <NextPuyoPuyo />
      </div>
    </div>
  );
};
