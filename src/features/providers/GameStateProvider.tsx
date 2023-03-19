import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../../config";
import { GameState } from "../../types/GameState";
import {
  changePuyoPuyoColor,
  Direction,
  isPuyoPuyoSquareShape,
  makePuyoPuyo,
  movePuyoPuyo,
  rotatePuyoPuyo,
  updateFallingPuyo,
  updateFixedPuyos,
} from "../algorithms";

const fallingPuyoInterval = 1000;
const fixedPuyosInterval = 500;

interface GameStateContextValue {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
  startGame: () => void;
  resetGame: () => void;
  moveCurrentPuyo: (direction: Direction) => void;
  rotateCurrentPuyo: () => void;
}

const GameStateContext = createContext<GameStateContextValue | undefined>(
  undefined
);

export const useGameStateContext = () => {
  const context = useContext(GameStateContext);

  if (!context) {
    throw new Error(
      "useGameStateContext must be used within GameStateProvider"
    );
  }
  return context;
};

const initialGameState: GameState = {
  fixedBoard: Array.from({ length: BOARD_HEIGHT }, () =>
    Array(BOARD_WIDTH).fill(null)
  ),
  currentPuyoPuyo: makePuyoPuyo(1),
  nextPuyoPuyo: makePuyoPuyo(1),
  gameStatus: "notStarted",
  chainStep: "none",
  level: 1,
};

export const GameStateProvider: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<GameState>(initialGameState);

  const startGame = () => {
    setState((prevState) => ({
      ...prevState,
      gameStatus: "running",
    }));
  };

  const resetGame = () => {
    setState(initialGameState);
  };

  const moveCurrentPuyo = useCallback(
    (direction: Direction) => {
      setState((prevState) => {
        const newPuyoPuyo = movePuyoPuyo(
          prevState.currentPuyoPuyo,
          prevState.fixedBoard,
          direction
        );
        return { ...prevState, currentPuyoPuyo: newPuyoPuyo };
      });
    },
    [setState]
  );

  const rotateCurrentPuyo = useCallback(() => {
    setState((prevState) => {
      if (isPuyoPuyoSquareShape(prevState.currentPuyoPuyo)) {
        const newPuyoPuyo = changePuyoPuyoColor(
          prevState.currentPuyoPuyo,
          prevState.level
        );
        return { ...prevState, currentPuyoPuyo: newPuyoPuyo };
      }

      const newPuyoPuyo = rotatePuyoPuyo(
        prevState.currentPuyoPuyo,
        prevState.fixedBoard
      );
      return { ...prevState, currentPuyoPuyo: newPuyoPuyo };
    });
  }, []);

  useEffect(() => {
    if (state.gameStatus === "running") {
      const updateFallingPuyoTimer = setInterval(() => {
        setState((prevState) => updateFallingPuyo(prevState));
      }, fallingPuyoInterval);

      const updateFixedPuyosTimer = setInterval(() => {
        setState((prevState) => updateFixedPuyos(prevState));
      }, fixedPuyosInterval);

      return () => {
        clearInterval(updateFallingPuyoTimer);
        clearInterval(updateFixedPuyosTimer);
      };
    }
  }, [state.gameStatus]);

  return (
    <GameStateContext.Provider
      value={{
        state,
        setState,
        startGame,
        resetGame,
        moveCurrentPuyo,
        rotateCurrentPuyo,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};
