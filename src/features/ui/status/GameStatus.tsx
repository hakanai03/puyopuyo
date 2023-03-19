import React from "react";
import {useGameStateContext} from "../../providers/GameStateProvider";

export const GameStatus: React.FC = () => {
  const { state } = useGameStateContext();

  const gameStatusStyle: React.CSSProperties = {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "10px",
    borderRadius: "5px",
  };

  return (
    <div style={gameStatusStyle}>
      {state.gameStatus}
      <div>Score: {state.score}</div> {/* スコア表示を追加 */}
    </div>
  );
};

