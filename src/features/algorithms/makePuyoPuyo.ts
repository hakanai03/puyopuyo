import { BOARD_WIDTH } from "../../config";
import { Color } from "../../types/Color";
import { Puyo } from "../../types/Puyo";
import { PuyoPuyo } from "../../types/PuyoPuyo";

const colors: Color[] = ["red", "green", "blue", "yellow", "purple"];

const createPuyo = (
  x: number,
  y: number,
  color: string,
  isPlaceholder: boolean
): Puyo => {
  return {
    x,
    y,
    color,
    isPlaceholder,
  };
};

export const makePuyoPuyo = (): PuyoPuyo => {
  const color1 = colors[Math.floor(Math.random() * colors.length)];
  const color2 = colors[Math.floor(Math.random() * colors.length)];

  const shapeIndex = Math.floor(Math.random() * 5);

  let newPuyoPuyo: PuyoPuyo;

  switch (shapeIndex) {
    case 0: // 縦並び
      newPuyoPuyo = {
        topLeft: createPuyo(Math.floor(BOARD_WIDTH / 2) - 1, 0, color1, false),
        bottomLeft: createPuyo(
          Math.floor(BOARD_WIDTH / 2) - 1,
          1,
          color2,
          false
        ),
        topRight: createPuyo(Math.floor(BOARD_WIDTH / 2), 0, "white", true),
        bottomRight: createPuyo(Math.floor(BOARD_WIDTH / 2), 1, "white", true),
      };
      break;
    case 1: // 縦並び(色違い)
      newPuyoPuyo = {
        topLeft: createPuyo(Math.floor(BOARD_WIDTH / 2) - 1, 0, color1, false),
        bottomLeft: createPuyo(
          Math.floor(BOARD_WIDTH / 2) - 1,
          1,
          color2,
          false
        ),
        topRight: createPuyo(Math.floor(BOARD_WIDTH / 2), 0, "white", true),
        bottomRight: createPuyo(Math.floor(BOARD_WIDTH / 2), 1, "white", true),
      };
      break;
    case 2: // L字型
      newPuyoPuyo = {
        topLeft: createPuyo(Math.floor(BOARD_WIDTH / 2) - 1, 0, color1, false),
        topRight: createPuyo(Math.floor(BOARD_WIDTH / 2), 0, color2, false),
        bottomLeft: createPuyo(
          Math.floor(BOARD_WIDTH / 2) - 1,
          1,
          color1,
          false
        ),
        bottomRight: createPuyo(Math.floor(BOARD_WIDTH / 2), 1, "white", true),
      };
      break;
    case 3: // L字型(色違い)
      newPuyoPuyo = {
        topLeft: createPuyo(Math.floor(BOARD_WIDTH / 2) - 1, 0, color1, false),
        topRight: createPuyo(Math.floor(BOARD_WIDTH / 2), 0, color2, false),

        bottomLeft: createPuyo(
          Math.floor(BOARD_WIDTH / 2) - 1,
          1,
          color1,
          false
        ),
        bottomRight: createPuyo(Math.floor(BOARD_WIDTH / 2), 1, "white", true),
      };
      break;
    case 4: // 四角型
      newPuyoPuyo = {
        topLeft: createPuyo(Math.floor(BOARD_WIDTH / 2) - 1, 0, color1, false),
        topRight: createPuyo(Math.floor(BOARD_WIDTH / 2), 0, color1, false),
        bottomLeft: createPuyo(
          Math.floor(BOARD_WIDTH / 2) - 1,
          1,
          color1,
          false
        ),
        bottomRight: createPuyo(Math.floor(BOARD_WIDTH / 2), 1, color1, false),
      };
      break;
    default:
      newPuyoPuyo = {
        topLeft: createPuyo(Math.floor(BOARD_WIDTH / 2) - 1, 0, color1, false),
        topRight: createPuyo(Math.floor(BOARD_WIDTH / 2), 0, color2, false),
        bottomLeft: createPuyo(
          Math.floor(BOARD_WIDTH / 2) - 1,
          1,
          "white",
          true
        ),
        bottomRight: createPuyo(Math.floor(BOARD_WIDTH / 2), 1, "white", true),
      };
  }

  return newPuyoPuyo;
};
