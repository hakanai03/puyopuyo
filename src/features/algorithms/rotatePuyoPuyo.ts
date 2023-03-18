import { Board } from "../../types/Board";
import { Puyo } from "../../types/Puyo";
import { PuyoPuyo } from "../../types/PuyoPuyo";
import { isPuyoColliding } from "./isPuyoColliding";

const rotateMatrix = (
  matrix: (Puyo | undefined)[][]
): (Puyo | undefined)[][] => {
  // 入力マトリックスの行と列を入れ替えます
  const transposedMatrix: (Puyo | undefined)[][] = [
    [matrix[0][0], matrix[1][0]],
    [matrix[0][1], matrix[1][1]],
  ];

  // 各行を逆にして回転させたマトリックスを返します
  return transposedMatrix.map((row) => row.reverse());
};

export const rotatePuyoPuyo = (puyoPuyo: PuyoPuyo, board: Board): PuyoPuyo => {
  const matrix: (Puyo | undefined)[][] = [
    [puyoPuyo.topLeft, puyoPuyo.topRight],
    [puyoPuyo.bottomLeft, puyoPuyo.bottomRight],
  ];

  const rotatedMatrix = rotateMatrix(matrix);

  const offsetX = puyoPuyo.topLeft?.x ?? 0;
  const offsetY = puyoPuyo.topLeft?.y ?? 0;

  const rotatedPuyos: PuyoPuyo = {
    topLeft: rotatedMatrix[0][0]
      ? { ...rotatedMatrix[0][0], x: offsetX, y: offsetY }
      : undefined,
    topRight: rotatedMatrix[0][1]
      ? { ...rotatedMatrix[0][1], x: offsetX + 1, y: offsetY }
      : undefined,
    bottomLeft: rotatedMatrix[1][0]
      ? { ...rotatedMatrix[1][0], x: offsetX, y: offsetY + 1 }
      : undefined,
    bottomRight: rotatedMatrix[1][1]
      ? { ...rotatedMatrix[1][1], x: offsetX + 1, y: offsetY + 1 }
      : undefined,
  };

  if (
    Object.values(rotatedPuyos)
      .filter((puyo) => puyo !== undefined)
      .every((puyo) => !isPuyoColliding(puyo as Puyo, board))
  ) {
    return rotatedPuyos;
  }

  return puyoPuyo;
};
