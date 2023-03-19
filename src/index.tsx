import React from "react";
import ReactDOM from "react-dom/client";
import { GameConfigProvider } from "./features/providers/GameConfigProvider";
import { GameStateProvider } from "./features/providers/GameStateProvider";
import { PuyoPuyoGame } from "./pages/PuyoPuyoGame";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GameConfigProvider>
      <GameStateProvider>
        <PuyoPuyoGame />
      </GameStateProvider>
    </GameConfigProvider>
  </React.StrictMode>
);
