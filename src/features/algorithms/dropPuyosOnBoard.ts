import { Board } from "../../types/Board";
import { cloneBoard } from "./cloneBoard";

export const dropPuyosOnBoard = (board: Board): Board => {
  let newBoard = cloneBoard(board);
  let didPuyosDrop = true;

  while (didPuyosDrop) {
    didPuyosDrop = false;
    for (let y = newBoard.length - 2; y >= 0; y--) {
      for (let x = 0; x < newBoard[y].length; x++) {
        const puyo = newBoard[y][x];
        if (puyo && !newBoard[y + 1][x]) {
          newBoard[y + 1][x] = puyo;
          newBoard[y][x] = undefined;
          didPuyosDrop = true;
        }
      }
    }
  }

  return newBoard;
};
