import { GameBoard } from "../features/ui/board/GameBoard";
import { KeyboardHandler } from "../features/ui/inputs/keyboardHandler";
import { Instructions } from "../features/ui/instructions/Instructions";
import { GameStatus } from "../features/ui/status/GameStatus";

export const PuyoPuyoGame: React.FC = () => {
  return (
    <>
      <GameStatus />
      <KeyboardHandler />
      <GameBoard />
      <Instructions />
    </>
  );
};
