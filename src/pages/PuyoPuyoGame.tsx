import React from "react";
import { GameBoard } from "../features/ui/board/GameBoard";
import { KeyboardHandler } from "../features/ui/inputs/keyboardHandler";
import { Instructions } from "../features/ui/instructions/Instructions";
import { GameStatus } from "../features/ui/status/GameStatus";
import { NextPuyoPuyo } from "../features/ui/status/NextPuyoPuyo";

export const PuyoPuyoGame: React.FC = () => {
  return (
    <div style={{ display: "flex" }}>
      <div>
        <KeyboardHandler />
        <GameBoard />
        <Instructions />
      </div>
      <div style={{ marginLeft: "16px" }}>
        <GameStatus />
        <NextPuyoPuyo />
      </div>
    </div>
  );
};
