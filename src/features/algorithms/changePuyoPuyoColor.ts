import { PuyoPuyo } from "../../types/PuyoPuyo";
import { getAvailableColors } from "./getAvailableColors";

export const changePuyoPuyoColor = (
  puyoPuyo: PuyoPuyo,
  level: number
): PuyoPuyo => {
  if (
    puyoPuyo.topLeft.isPlaceholder ||
    puyoPuyo.topRight.isPlaceholder ||
    puyoPuyo.bottomLeft.isPlaceholder ||
    puyoPuyo.bottomRight.isPlaceholder
  ) {
    return puyoPuyo;
  }

  const availableColors = getAvailableColors(level);
  const newPuyoPuyo: PuyoPuyo = { ...puyoPuyo };

  (["topLeft", "topRight", "bottomLeft", "bottomRight"] as const).forEach(
    (position) => {
      const currentColorIndex = availableColors.indexOf(
        newPuyoPuyo[position].color
      );
      const newColorIndex = (currentColorIndex + 1) % availableColors.length;
      newPuyoPuyo[position] = {
        ...newPuyoPuyo[position],
        color: availableColors[newColorIndex],
      };
    }
  );

  return newPuyoPuyo;
};

