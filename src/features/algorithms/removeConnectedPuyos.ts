import { Board } from "../../types/Board";
import { GameConfig } from "../../types/GameConfig";

type Coord = { x: number; y: number };

const getConnectedPuyos = (
  x: number,
  y: number,
  board: Board,
  config: GameConfig
): Coord[] => {
  const visited: boolean[][] = Array.from({ length: config.boardHeight }, () =>
    Array.from({ length: config.boardWidth }, () => false)
  );

  const dfs = (x: number, y: number): Coord[] => {
    if (x < 0 || x >= config.boardWidth || y < 0 || y >= config.boardHeight)
      return [];

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
        newX < config.boardWidth &&
        newY >= 0 &&
        newY < config.boardHeight &&
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

const isPuyoConnected = (
  x: number,
  y: number,
  board: Board,
  config: GameConfig
): boolean => {
  const connectedPuyos = getConnectedPuyos(x, y, board, config);
  return connectedPuyos.length >= 4;
};

export const removeConnectedPuyos = (
  board: Board,
  config: GameConfig
): { updatedBoard: Board; removedPuyos: boolean } => {
  const newBoard = board.map((row) => [...row]);
  let removedPuyos = false;

  for (let y = 0; y < config.boardHeight; y++) {
    for (let x = 0; x < config.boardWidth; x++) {
      const connectedPuyos = getConnectedPuyos(x, y, board, config);

      if (connectedPuyos.length >= 4) {
        removedPuyos = true;
        connectedPuyos.forEach((coord) => {
          newBoard[coord.y][coord.x] = null;
        });
      }
    }
  }

  return { updatedBoard: newBoard, removedPuyos };
};
