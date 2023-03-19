import { Board } from "../../types/Board";
import { GameConfig } from "../../types/GameConfig";
import { Puyo } from "../../types/Puyo";
import { PuyoPuyo } from "../../types/PuyoPuyo";
import { isPuyoColliding } from "./isPuyoColliding";

export const rotatePuyoPuyo = (
  puyoPuyo: PuyoPuyo,
  board: Board,
  config: GameConfig
): PuyoPuyo => {
  const tryRotation = (angle: number): Puyo[] => {
    const topLeft = puyoPuyo.topLeft;
    const otherPuyos = [
      puyoPuyo.topRight,
      puyoPuyo.bottomLeft,
      puyoPuyo.bottomRight,
    ];

    return otherPuyos.map((puyo) => {
      const dx = puyo.x - topLeft.x;
      const dy = puyo.y - topLeft.y;
      const rad = (Math.PI / 180) * angle;
      const sin = Math.sin(rad);
      const cos = Math.cos(rad);

      return {
        ...puyo,
        x: Math.round(topLeft.x + dx * cos - dy * sin),
        y: Math.round(topLeft.y + dx * sin + dy * cos),
      };
    });
  };

  const testRotation = (angle: number): boolean => {
    const rotatedPuyos = tryRotation(angle);
    return rotatedPuyos.every((puyo) => !isPuyoColliding(puyo, board, config));
  };

  const anglesToTry = [90, 180, 270];

  for (const angle of anglesToTry) {
    if (testRotation(angle)) {
      const rotatedPuyos = tryRotation(angle);
      return {
        topLeft: puyoPuyo.topLeft,
        topRight: rotatedPuyos[0],
        bottomLeft: rotatedPuyos[1],
        bottomRight: rotatedPuyos[2],
      };
    }
  }

  return puyoPuyo;
};
