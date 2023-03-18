import { Board } from "../../types/Board";
import { Puyo } from "../../types/Puyo";
import { PuyoPuyo } from "../../types/PuyoPuyo";
import { isPuyoColliding } from "./isPuyoColliding";

export const rotatePuyoPuyo = (puyoPuyo: PuyoPuyo, board: Board): PuyoPuyo => {
  const puyos = [
    puyoPuyo.topLeft,
    puyoPuyo.topRight,
    puyoPuyo.bottomLeft,
    puyoPuyo.bottomRight,
  ].filter((puyo) => puyo !== undefined) as Puyo[];

  const puyosIn2x2 = [
    puyos.find(
      (puyo) => puyo.x === puyoPuyo.topLeft?.x && puyo.y === puyoPuyo.topLeft.y
    ),
    puyos.find(
      (puyo) =>
        puyo.x === puyoPuyo.topRight?.x && puyo.y === puyoPuyo.topRight?.y
    ),
    puyos.find(
      (puyo) =>
        puyo.x === puyoPuyo.bottomLeft?.x && puyo.y === puyoPuyo.bottomLeft?.y
    ),
    puyos.find(
      (puyo) =>
        puyo.x === puyoPuyo.bottomRight?.x && puyo.y === puyoPuyo.bottomRight?.y
    ),
  ];

  const rotatedPuyos = [
    puyosIn2x2[0],
    puyosIn2x2[1] ?? puyosIn2x2[0],
    puyosIn2x2[2] ?? puyosIn2x2[0],
    puyosIn2x2[3] ?? puyosIn2x2[0],
  ];

  if (
    rotatedPuyos
      .filter((puyo) => puyo !== undefined)
      .every((puyo) => !isPuyoColliding(puyo as Puyo, board))
  ) {
    return {
      topLeft: rotatedPuyos[0],
      topRight:
        rotatedPuyos[1] === rotatedPuyos[0] ? undefined : rotatedPuyos[1],
      bottomLeft:
        rotatedPuyos[2] === rotatedPuyos[0] ? undefined : rotatedPuyos[2],
      bottomRight:
        rotatedPuyos[3] === rotatedPuyos[0] ? undefined : rotatedPuyos[3],
    };
  }

  return puyoPuyo;
};
