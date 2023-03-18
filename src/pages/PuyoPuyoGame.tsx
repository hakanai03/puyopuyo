import { useEffect } from "react";
import { useGameStateContext } from "../features/providers/GameStateProvider";
import { GameBoard } from "../features/ui/board/GameBoard";
import { KeyboardHandler } from "../features/ui/inputs/keyboardHandler";
import { Instructions } from "../features/ui/instructions/Instructions";
import { GameStatus } from "../features/ui/status/GameStatus";

export const PuyoPuyoGame: React.FC = () => {
  const { state, setState, updateBoardOnCollision } = useGameStateContext();

  useEffect(() => {
    if (state.gameStatus === "running") {
      const intervalId = setInterval(() => {
        updateBoardOnCollision();
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [state.board, state.gameStatus, setState]);

  return (
    <>
      <GameStatus />
      <KeyboardHandler />
      <GameBoard />
      <Instructions />
    </>
  );
};
