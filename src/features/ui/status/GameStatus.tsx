import React from "react";
import { useGameStateContext } from "../../providers/GameStateProvider";

export const GameStatus: React.FC = () => {
  const { state } = useGameStateContext();

  const gameStatusStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "10px",
    borderRadius: "5px",
    fontSize: "1.5em",
  };

  return <div style={gameStatusStyle}>{state.gameStatus}</div>;
};
