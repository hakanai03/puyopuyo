import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Board } from "../../types/Board";
import { GameConfig } from "../../types/GameConfig";
import { GameState } from "../../types/GameState";
import {
  changePuyoPuyoColor,
  Direction,
  isGameOver,
  isPuyoPuyoSquareShape,
  makePuyoPuyo,
  movePuyoPuyo,
  rotatePuyoPuyo,
  updateFallingPuyo,
  updateFixedPuyos,
} from "../algorithms";
import { useGameConfig } from "./GameConfigProvider";

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

const makeBoard = (config: GameConfig): Board => {
  return Array.from({ length: config.boardHeight }, () =>
    Array(config.boardWidth).fill(null)
  );
};

export const GameStateProvider: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const { config } = useGameConfig();
  const initialGameState = useMemo(
    () =>
      ({
        fixedBoard: makeBoard(config),
        currentPuyoPuyo: makePuyoPuyo(config),
        nextPuyoPuyo: makePuyoPuyo(config),
        gameStatus: "notStarted",
        chainStep: "none",
        level: 1,
        score: 0,
      } as GameState),
    []
  );
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
          direction,
          config
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
        prevState.fixedBoard,
        config
      );
      return { ...prevState, currentPuyoPuyo: newPuyoPuyo };
    });
  }, []);

  useEffect(() => {
    if (state.gameStatus === "running") {
      const updateFallingPuyoTimer = setInterval(() => {
        setState((prevState) => updateFallingPuyo(prevState, config));
      }, fallingPuyoInterval);

      const updateFixedPuyosTimer = setInterval(() => {
        setState((prevState) => updateFixedPuyos(prevState, config));
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
