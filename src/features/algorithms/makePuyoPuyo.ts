import { BOARD_WIDTH } from "../../config";
import { Color } from "../../types/Color";
import { Puyo } from "../../types/Puyo";
import { PuyoPuyo } from "../../types/PuyoPuyo";

const colors: Color[] = ["red", "green", "blue", "yellow", "purple"];

export const makePuyoPuyo = (): PuyoPuyo => {
  const color1 = colors[Math.floor(Math.random() * colors.length)];
  const color2 = colors[Math.floor(Math.random() * colors.length)];

  const topLeftPuyo: Puyo = {
    x: Math.floor(BOARD_WIDTH / 2) - 1,
    y: 0,
    color: color1,
  };

  const shapeIndex = Math.floor(Math.random() * 5);

  let newPuyoPuyo: PuyoPuyo;

  switch (shapeIndex) {
    case 0: // 縦並び
      newPuyoPuyo = {
        topLeft: topLeftPuyo,
        bottomLeft: { x: topLeftPuyo.x, y: topLeftPuyo.y + 1, color: color2 },
      };
      break;
    case 1: // 縦並び(色違い)
      newPuyoPuyo = {
        topLeft: topLeftPuyo,
        bottomLeft: { x: topLeftPuyo.x, y: topLeftPuyo.y + 1, color: color2 },
      };
      break;
    case 2: // L字型
      newPuyoPuyo = {
        topLeft: topLeftPuyo,
        topRight: { x: topLeftPuyo.x + 1, y: topLeftPuyo.y, color: color2 },
        bottomLeft: { x: topLeftPuyo.x, y: topLeftPuyo.y + 1, color: color1 },
      };
      break;
    case 3: // L字型(色違い)
      newPuyoPuyo = {
        topLeft: topLeftPuyo,
        topRight: { x: topLeftPuyo.x + 1, y: topLeftPuyo.y, color: color2 },
        bottomLeft: { x: topLeftPuyo.x, y: topLeftPuyo.y + 1, color: color1 },
      };
      break;
    case 4: // 四角型
      newPuyoPuyo = {
        topLeft: topLeftPuyo,
        topRight: { x: topLeftPuyo.x + 1, y: topLeftPuyo.y, color: color1 },
        bottomLeft: { x: topLeftPuyo.x, y: topLeftPuyo.y + 1, color: color1 },
        bottomRight: {
          x: topLeftPuyo.x + 1,
          y: topLeftPuyo.y + 1,
          color: color1,
        },
      };
      break;
    default:
      newPuyoPuyo = {
        topLeft: topLeftPuyo,
        topRight: { x: topLeftPuyo.x + 1, y: topLeftPuyo.y, color: color2 },
      };
  }

  return newPuyoPuyo;
};
