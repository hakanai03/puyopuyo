import { PuyoPuyo } from "../../types/PuyoPuyo";

export const isPuyoPuyoSquareShape = (puyoPuyo: PuyoPuyo): boolean => {
  return (
    !puyoPuyo.topLeft.isPlaceholder &&
    !puyoPuyo.topRight.isPlaceholder &&
    !puyoPuyo.bottomLeft.isPlaceholder &&
    !puyoPuyo.bottomRight.isPlaceholder
  );
};
