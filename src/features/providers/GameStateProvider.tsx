import React, { createContext, ReactNode, useContext, useState } from "react";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../../config";
import { GameState } from "../../types/GameState";
import {
  Direction,
  dropPuyosOnBoard,
  makePuyoPair,
  movePuyo,
  rotatePuyo,
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
  board: Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0)),
  fixedBoard: Array.from({ length: BOARD_HEIGHT }, () =>
    Array(BOARD_WIDTH).fill(null)
  ),
  currentPuyoPair: makePuyoPair(),
  nextPuyoPair: makePuyoPair(),
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

  const moveCurrentPuyo = (direction: Direction) => {
    setState((prevState) => ({
      ...prevState,
      currentPuyoPair: movePuyo(
        prevState.currentPuyoPair,
        prevState.fixedBoard,
        direction
      ),
    }));
  };

  const rotateCurrentPuyo = () => {
    setState((prevState) => ({
      ...prevState,
      currentPuyoPair: rotatePuyo(prevState.currentPuyoPair, prevState.board),
    }));
  };

  const updateBoardOnCollision = () => {
    setState((prevState) => {
      const newPuyoPair = movePuyo(
        prevState.currentPuyoPair,
        prevState.fixedBoard,
        "down"
      );

      // 衝突が発生した場合、ボードを更新し、新しいぷよペアを生成
      if (newPuyoPair === prevState.currentPuyoPair) {
        const newBoard = prevState.fixedBoard.map((row) => [...row]);
        newBoard[prevState.currentPuyoPair.main.y][
          prevState.currentPuyoPair.main.x
        ] = prevState.currentPuyoPair.main;
        newBoard[prevState.currentPuyoPair.sub.y][
          prevState.currentPuyoPair.sub.x
        ] = prevState.currentPuyoPair.sub;

        const droppedBoard = dropPuyosOnBoard(newBoard);

        return {
          ...prevState,
          fixedBoard: droppedBoard,
          currentPuyoPair: prevState.nextPuyoPair,
          nextPuyoPair: makePuyoPair(),
        };
      }

      return {
        ...prevState,
        currentPuyoPair: newPuyoPair,
      };
    });
  };

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
