import { Board } from "../../types/Board";

export const cloneBoard = (board: Board): Board => {
  return board.map((row) => [...row]);
};
