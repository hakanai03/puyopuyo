import { BOARD_WIDTH } from "../../config";
import { Color } from "../../types/Color";
import { Puyo } from "../../types/Puyo";
import { PuyoPair } from "../../types/PuyoPair";

const colors: Color[] = ["red", "green", "blue", "yellow", "purple"];

export const makePuyoPair = (): PuyoPair => {
  const color1 = colors[Math.floor(Math.random() * colors.length)];
  const color2 = colors[Math.floor(Math.random() * colors.length)];

  const mainPuyo: Puyo = {
    x: Math.floor(BOARD_WIDTH / 2) - 1,
    y: 0,
    color: color1,
  };

  const shapeIndex = Math.floor(Math.random() * 3);

  const subPuyo: Puyo = (() => {
    if (shapeIndex === 0) {
      return {
        x: mainPuyo.x,
        y: mainPuyo.y + 1,
        color: color2,
      };
    } else if (shapeIndex === 1) {
      return {
        x: mainPuyo.x + 1,
        y: mainPuyo.y,
        color: color2,
      };
    } else {
      return {
        x: mainPuyo.x + 1,
        y: mainPuyo.y + 1,
        color: color2,
      };
    }
  })();

  return {
    main: mainPuyo,
    sub: subPuyo,
  };
};
