import {Board} from "../../types/Board";
import {Puyo} from "../../types/Puyo";
import {PuyoPair} from "../../types/PuyoPair";
import {isPuyoColliding} from "./isPuyoColliding";

export const rotatePuyo = (puyoPair: PuyoPair, board: Board): PuyoPair => {
  const mainPuyo = puyoPair.main;
  const subPuyo = puyoPair.sub;
  const dx = subPuyo.x - mainPuyo.x;
  const dy = subPuyo.y - mainPuyo.y;

  const newSubPuyo: Puyo = {
    x: mainPuyo.x - dy,
    y: mainPuyo.y + dx,
    color: subPuyo.color,
  };

  // 回転後に衝突が発生しないかチェック
  if (!isPuyoColliding(newSubPuyo, board)) {
    return {
      main: mainPuyo,
      sub: newSubPuyo,
    };
  }

  // 衝突がある場合、回転をキャンセル
  return puyoPair;
};


