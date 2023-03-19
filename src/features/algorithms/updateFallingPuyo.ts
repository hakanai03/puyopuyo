import { GameConfig } from "../../types/GameConfig";
import { GameState } from "../../types/GameState";
import { Puyo } from "../../types/Puyo";
import { movePuyoPuyo } from "./movePuyoPuyo";

const handleNoneStep = (
  prevState: GameState,
  config: GameConfig
): GameState => {
  const newPuyoPuyo = movePuyoPuyo(
    prevState.currentPuyoPuyo,
    prevState.fixedBoard,
    "down",
    config
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
        clearedBoard[p.y][p.x] = null;
      });

    return {
      ...prevState,
      currentPuyoPuyo: newPuyoPuyo,
      fixedBoard: clearedBoard,
    };
  }
};

export const updateFallingPuyo = (
  prevState: GameState,
  config: GameConfig
): GameState => {
  if (prevState.chainStep === "none") {
    return handleNoneStep(prevState, config);
  }
  return prevState;
};
