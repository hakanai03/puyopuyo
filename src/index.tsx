import React from "react";
import ReactDOM from "react-dom/client";
import { GameStateProvider } from "./features/providers/GameStateProvider";
import { PuyoPuyoGame } from "./pages/PuyoPuyoGame";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GameStateProvider>
      <PuyoPuyoGame />
    </GameStateProvider>
  </React.StrictMode>
);
