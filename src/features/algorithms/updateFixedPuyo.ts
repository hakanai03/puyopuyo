import { GameConfig } from "../../types/GameConfig";
import { GameState } from "../../types/GameState";
import { dropPuyosOnBoard } from "./dropPuyosOnBoard";
import { makePuyoPuyo } from "./makePuyoPuyo";
import { removeConnectedPuyos } from "./removeConnectedPuyos";

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

const handleRemoveStep = (
  prevState: GameState,
  config: GameConfig
): GameState => {
  const { updatedBoard, removedPuyos } = removeConnectedPuyos(
    prevState.fixedBoard,
    config
  );
  if (removedPuyos) {
    return { ...prevState, fixedBoard: updatedBoard, chainStep: "drop" };
  } else {
    return {
      ...prevState,
      fixedBoard: updatedBoard,
      currentPuyoPuyo: prevState.nextPuyoPuyo,
      nextPuyoPuyo: makePuyoPuyo(config),
      chainStep: "none",
    };
  }
};

// 新しい関数: 確定したぷよの落下と連鎖処理
export const updateFixedPuyos = (
  prevState: GameState,
  config: GameConfig
): GameState => {
  if (prevState.chainStep === "drop") {
    return handleDropStep(prevState);
  }

  if (prevState.chainStep === "remove") {
    return handleRemoveStep(prevState, config);
  }

  return prevState;
};
