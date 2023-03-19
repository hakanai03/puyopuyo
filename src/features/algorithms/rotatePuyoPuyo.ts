import { Board } from "../../types/Board";
import { GameConfig } from "../../types/GameConfig";
import { PuyoPuyo } from "../../types/PuyoPuyo";
import { isPuyoColliding } from "./isPuyoColliding";

export const rotatePuyoPuyo = (
  puyoPuyo: PuyoPuyo,
  board: Board,
  config: GameConfig
): PuyoPuyo => {
  const topLeft = puyoPuyo.topLeft;
  const topRight = puyoPuyo.topRight;
  const bottomLeft = puyoPuyo.bottomLeft;
  const bottomRight = puyoPuyo.bottomRight;

  const rotatedPuyos = [
    topLeft,
    {
      ...topRight,
      x: topLeft.x - (topRight.y - topLeft.y),
      y: topLeft.y + (topRight.x - topLeft.x),
    },
    {
      ...bottomLeft,
      x: topLeft.x - (bottomLeft.y - topLeft.y),
      y: topLeft.y + (bottomLeft.x - topLeft.x),
    },
    {
      ...bottomRight,
      x: topLeft.x - (bottomRight.y - topLeft.y),
      y: topLeft.y + (bottomRight.x - topLeft.x),
    },
  ];

  if (
    rotatedPuyos
      .filter((puyo) => !puyo.isPlaceholder)
      .every((puyo) => !isPuyoColliding(puyo, board, config))
  ) {
    return {
      topLeft: rotatedPuyos[0],
      topRight: rotatedPuyos[1],
      bottomLeft: rotatedPuyos[2],
      bottomRight: rotatedPuyos[3],
    };
  }

  return puyoPuyo;
};
