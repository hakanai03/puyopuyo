import { Board } from "../../types/Board";
import { Puyo } from "../../types/Puyo";
import { PuyoPair } from "../../types/PuyoPair";
import { isPuyoColliding } from "./isPuyoColliding";

export type Direction = "left" | "right" | "down"

export const movePuyo = (
  puyoPair: PuyoPair,
  board: Board,
  direction: Direction
): PuyoPair => {
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

  const newMain: Puyo = {
    ...puyoPair.main,
    x: puyoPair.main.x + dx,
    y: puyoPair.main.y + dy,
  };
  const newSub: Puyo = {
    ...puyoPair.sub,
    x: puyoPair.sub.x + dx,
    y: puyoPair.sub.y + dy,
  };

  if (!isPuyoColliding(newMain, board) && !isPuyoColliding(newSub, board)) {
    return { main: newMain, sub: newSub };
  }

  return puyoPair;
};
