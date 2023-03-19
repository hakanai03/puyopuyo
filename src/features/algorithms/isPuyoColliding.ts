import { Board } from "../../types/Board";
import { GameConfig } from "../../types/GameConfig";
import { Puyo } from "../../types/Puyo";

export const isPuyoColliding = (
  puyo: Puyo,
  board: Board,
  config: GameConfig
): boolean => {
  // isPlaceholderがtrueの場合、衝突しないと判断
  if (puyo.isPlaceholder) {
    return false;
  }

  // 座標がボードの範囲外であるかどうかを確認
  if (
    puyo.x < 0 ||
    puyo.x >= config.boardWidth ||
    puyo.y < 0 ||
    puyo.y >= config.boardHeight
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
