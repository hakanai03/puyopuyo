import {Board} from "../../types/Board";

export const dropPuyosOnBoard = (board: Board): Board => {
  let updatedBoard = board.map((row) => [...row]);
  let hasPuyosDropped = false;

  for (let y = updatedBoard.length - 1; y >= 0; y--) {
    for (let x = 0; x < updatedBoard[0].length; x++) {
      const puyo = updatedBoard[y][x];

      if (puyo && y < updatedBoard.length - 1 && !updatedBoard[y + 1][x]) {
        updatedBoard[y][x] = null;
        updatedBoard[y + 1][x] = puyo;
        hasPuyosDropped = true;
      }
    }
  }

  return hasPuyosDropped ? dropPuyosOnBoard(updatedBoard) : updatedBoard;
};

