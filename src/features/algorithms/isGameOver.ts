import { Board } from "../../types/Board";
import { GameConfig } from "../../types/GameConfig";

export const isGameOver = (fixedBoard: Board, config: GameConfig): boolean => {
  const middle = Math.floor(config.boardWidth / 2);
  return fixedBoard[0][middle - 1] !== null || fixedBoard[0][middle] !== null;
};
