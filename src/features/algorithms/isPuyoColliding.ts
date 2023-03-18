import { BOARD_HEIGHT, BOARD_WIDTH } from "../../config";
import { Board } from "../../types/Board";
import { Puyo } from "../../types/Puyo";

export const isPuyoColliding = (puyo: Puyo, board: Board): boolean => {
  // 座標がボードの範囲外であるかどうかを確認
  if (
    puyo.x < 0 ||
    puyo.x >= BOARD_WIDTH ||
    puyo.y < 0 ||
    puyo.y >= BOARD_HEIGHT
  ) {
    return true;
  }

  // 他のぷよとの衝突を確認
  const cell = board[puyo.y][puyo.x];
  if (cell) {
    return true;
  }

  return false;
};
