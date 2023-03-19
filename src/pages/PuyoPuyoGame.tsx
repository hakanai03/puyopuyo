import React from "react";
import { useGameStateContext } from "../features/providers/GameStateProvider";
import { GameBoard } from "../features/ui/board/GameBoard";
import { KeyboardHandler } from "../features/ui/inputs/keyboardHandler";
import { Instructions } from "../features/ui/instructions/Instructions";
import { GameStatus } from "../features/ui/status/GameStatus";
import { NextPuyo } from "../features/ui/status/NextPuyo";

export const PuyoPuyoGame: React.FC = () => {
  const { state } = useGameStateContext();

  return (
    <>
      <GameStatus />
      <KeyboardHandler />
      <div style={{ display: "flex" }}>
        <GameBoard />
        <div style={{ marginLeft: "1rem" }}>
          <NextPuyo
            nextPuyoPuyo={state.nextPuyoPuyo}
            gridSize={state.fixedBoard[0].length}
          />
          <div style={{ marginTop: "1rem", fontSize: "1.5rem" }}>
            スコア: {state.score}
          </div>
        </div>
      </div>
      <Instructions />
    </>
  );
};
