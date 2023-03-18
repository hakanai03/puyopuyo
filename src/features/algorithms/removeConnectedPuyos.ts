import { BOARD_HEIGHT, BOARD_WIDTH } from "../../config";
import { Board } from "../../types/Board";

type Coord = { x: number; y: number };

const getConnectedPuyos = (x: number, y: number, board: Board): Coord[] => {
  const visited: boolean[][] = Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => false)
  );

  const dfs = (x: number, y: number): Coord[] => {
    if (x < 0 || x >= BOARD_WIDTH || y < 0 || y >= BOARD_HEIGHT) return [];

    if (visited[y][x]) return [];

    visited[y][x] = true;

    const currentColor = board[y][x]?.color;

    if (!currentColor) return [];

    const directions = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ];

    let connectedCoords: Coord[] = [{ x, y }];

    for (const dir of directions) {
      const newX = x + dir.x;
      const newY = y + dir.y;

      if (
        newX >= 0 &&
        newX < BOARD_WIDTH &&
        newY >= 0 &&
        newY < BOARD_HEIGHT &&
        !visited[newY][newX] &&
        board[newY][newX]?.color === currentColor
      ) {
        connectedCoords = connectedCoords.concat(dfs(newX, newY));
      }
    }

    return connectedCoords;
  };

  return dfs(x, y);
};

const isPuyoConnected = (x: number, y: number, board: Board): boolean => {
  const connectedPuyos = getConnectedPuyos(x, y, board);
  return connectedPuyos.length >= 4;
};

export const removeConnectedPuyos = (
  board: Board
): { updatedBoard: Board; removedPuyos: boolean } => {
  const newBoard = board.map((row) => [...row]);
  let removedPuyos = false;

  for (let y = 0; y < BOARD_HEIGHT; y++) {
    for (let x = 0; x < BOARD_WIDTH; x++) {
      const connectedPuyos = getConnectedPuyos(x, y, board);

      if (connectedPuyos.length >= 4) {
        removedPuyos = true;
        connectedPuyos.forEach((coord) => {
          newBoard[coord.y][coord.x] = undefined;
        });
      }
    }
  }

  return { updatedBoard: newBoard, removedPuyos };
};
