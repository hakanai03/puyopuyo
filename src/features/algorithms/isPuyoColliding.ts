import { BOARD_HEIGHT, BOARD_WIDTH } from "../../config";
import { Board } from "../../types/Board";
import { Puyo } from "../../types/Puyo";

export const isPuyoColliding = (puyo: Puyo, board: Board): boolean => {
  const { x, y } = puyo;

  // Puyoがボードの外側にある場合は衝突
  if (x < 0 || x >= BOARD_WIDTH || y < 0 || y >= BOARD_HEIGHT) {
    return true;
  }

  // Puyoが他のPuyoと重なる場合は衝突
  return board[y][x] !== null;
};
