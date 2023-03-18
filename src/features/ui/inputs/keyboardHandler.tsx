import { useEffect } from "react";
import { useGameStateContext } from "../../providers/GameStateProvider";

export const KeyboardHandler: React.FC = () => {
  const { state, startGame, resetGame, moveCurrentPuyo, rotateCurrentPuyo } =
    useGameStateContext();

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
        moveCurrentPuyo("left");
        break;
      case "ArrowRight":
        moveCurrentPuyo("right");
        break;
      case "ArrowDown":
        moveCurrentPuyo("down");
        break;
      case "z":
        rotateCurrentPuyo();
        break;
      case "s":
        if (
          state.gameStatus === "notStarted" ||
          state.gameStatus === "paused"
        ) {
          startGame();
        } else {
          moveCurrentPuyo("down");
        }
        break;
      case "Escape":
        resetGame();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
};
