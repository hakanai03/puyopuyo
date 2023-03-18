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
import { Puyo } from "../../types/Puyo";
import {
  cloneBoard,
  Direction,
  dropPuyosOnBoard,
  makePuyoPuyo,
  movePuyoPuyo,
  removeConnectedPuyos,
  rotatePuyoPuyo,
} from "../algorithms";

interface GameStateContextValue {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
  startGame: () => void;
  resetGame: () => void;
  moveCurrentPuyo: (direction: Direction) => void;
  rotateCurrentPuyo: () => void;
  updateBoardOnCollision: () => void;
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
  currentPuyoPuyo: makePuyoPuyo(),
  nextPuyoPuyo: makePuyoPuyo(),
  gameStatus: "notStarted",
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
      const newPuyoPuyo = rotatePuyoPuyo(
        prevState.currentPuyoPuyo,
        prevState.fixedBoard
      );
      return { ...prevState, currentPuyoPuyo: newPuyoPuyo };
    });
  }, [setState]);

  const updateBoardOnCollision = () => {
    setState((prevState) => {
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

        const droppedBoard = dropPuyosOnBoard(newBoard);
        const { updatedBoard, removedPuyos } =
          removeConnectedPuyos(droppedBoard);

        if (removedPuyos) {
          return {
            ...prevState,
            fixedBoard: updatedBoard,
            chainStep: "drop",
          };
        } else {
          return {
            ...prevState,
            fixedBoard: droppedBoard,
            currentPuyoPuyo: prevState.nextPuyoPuyo,
            nextPuyoPuyo: makePuyoPuyo(),
            chainStep: "none",
          };
        }
      }

      return {
        ...prevState,
        currentPuyoPuyo: newPuyoPuyo,
      };
    });
  };

  useEffect(() => {
    if (state.gameStatus === "running") {
      const intervalId = setInterval(() => {
        updateBoardOnCollision();
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [state.gameStatus, setState]);

  return (
    <GameStateContext.Provider
      value={{
        state,
        setState,
        startGame,
        resetGame,
        moveCurrentPuyo,
        rotateCurrentPuyo,
        updateBoardOnCollision,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};
