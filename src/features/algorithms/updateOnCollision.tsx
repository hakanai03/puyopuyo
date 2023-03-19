import { GameState } from "../../types/GameState";
import { Puyo } from "../../types/Puyo";
import { dropPuyosOnBoard } from "./dropPuyosOnBoard";
import { makePuyoPuyo } from "./makePuyoPuyo";
import { movePuyoPuyo } from "./movePuyoPuyo";
import { removeConnectedPuyos } from "./removeConnectedPuyos";

const handleNoneStep = (prevState: GameState): GameState => {
  const newPuyoPuyo = movePuyoPuyo(
    prevState.currentPuyoPuyo,
    prevState.fixedBoard,
    "down"
  );

  if (newPuyoPuyo === prevState.currentPuyoPuyo) {
    const newBoard = prevState.fixedBoard.map((row) => [...row]);

    [
      newPuyoPuyo.topLeft,
      newPuyoPuyo.topRight,
      newPuyoPuyo.bottomLeft,
      newPuyoPuyo.bottomRight,
    ]
      .filter((puyo) => !puyo.isPlaceholder)
      .forEach((puyo) => {
        const p = puyo as Puyo;
        newBoard[p.y][p.x] = puyo;
      });

    return { ...prevState, fixedBoard: newBoard, chainStep: "drop" };
  } else {
    const clearedBoard = prevState.fixedBoard.map((row) => [...row]);
    [
      prevState.currentPuyoPuyo.topLeft,
      prevState.currentPuyoPuyo.topRight,
      prevState.currentPuyoPuyo.bottomLeft,
      prevState.currentPuyoPuyo.bottomRight,
    ]
      .filter((puyo) => !puyo.isPlaceholder)
      .forEach((puyo) => {
        const p = puyo as Puyo;
        clearedBoard[p.y][p.x] = undefined;
      });

    return {
      ...prevState,
      currentPuyoPuyo: newPuyoPuyo,
      fixedBoard: clearedBoard,
    };
  }
};

const handleDropStep = (prevState: GameState): GameState => {
  const droppedBoard = dropPuyosOnBoard(prevState.fixedBoard);
  if (droppedBoard !== prevState.fixedBoard) {
    return {
      ...prevState,
      fixedBoard: droppedBoard,
      chainStep: "remove",
    };
  }
  return prevState;
};

const handleRemoveStep = (prevState: GameState): GameState => {
  const { updatedBoard, removedPuyos } = removeConnectedPuyos(
    prevState.fixedBoard
  );
  if (removedPuyos) {
    return { ...prevState, fixedBoard: updatedBoard, chainStep: "drop" };
  } else {
    return {
      ...prevState,
      fixedBoard: updatedBoard,
      currentPuyoPuyo: prevState.nextPuyoPuyo,
      nextPuyoPuyo: makePuyoPuyo(prevState.level),
      chainStep: "none",
    };
  }
};

export const updateBoardOnCollision = (prevState: GameState): GameState => {
  const { chainStep } = prevState;

  if (chainStep === "none") {
    return handleNoneStep(prevState);
  }

  if (chainStep === "drop") {
    return handleDropStep(prevState);
  }

  if (chainStep === "remove") {
    return handleRemoveStep(prevState);
  }

  return prevState;
};
