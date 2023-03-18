import { Board } from "../../types/Board";
import { Puyo } from "../../types/Puyo";
import { PuyoPuyo } from "../../types/PuyoPuyo";
import { isPuyoColliding } from "./isPuyoColliding";

export type Direction = "left" | "right" | "down";

export const movePuyoPuyo = (
  puyoPuyo: PuyoPuyo,
  board: Board,
  direction: Direction
): PuyoPuyo => {
  let dx = 0;
  let dy = 0;

  switch (direction) {
    case "left":
      dx = -1;
      break;
    case "right":
      dx = 1;
      break;
    case "down":
      dy = 1;
      break;
  }

  const movePuyo = (puyo: Puyo): Puyo => {
    const newX = puyo.x + dx;
    const newY = puyo.y + dy;
    return { ...puyo, x: newX, y: newY };
  };

  const newTopLeft = movePuyo(puyoPuyo.topLeft);
  const newTopRight = movePuyo(puyoPuyo.topRight);
  const newBottomLeft = movePuyo(puyoPuyo.bottomLeft);
  const newBottomRight = movePuyo(puyoPuyo.bottomRight);

  const newPuyos = [newTopLeft, newTopRight, newBottomLeft, newBottomRight];

  if (newPuyos.every((newPuyo) => !isPuyoColliding(newPuyo, board))) {
    return {
      topLeft: newTopLeft,
      topRight: newTopRight,
      bottomLeft: newBottomLeft,
      bottomRight: newBottomRight,
    };
  }

  return puyoPuyo;
};
