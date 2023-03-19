import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { GameConfig } from "../../types/GameConfig";
import { getAvailableColors } from "../algorithms";

const DEFAULT_GAME_LEVEL = 1;

const defaultConfig: GameConfig = {
  boardWidth: 6,
  boardHeight: 12,
  level: DEFAULT_GAME_LEVEL,
  gameSpeed: 1000,
  colors: getAvailableColors(DEFAULT_GAME_LEVEL),
};

interface GameConfigContextValue {
  config: GameConfig;
  setConfig: React.Dispatch<React.SetStateAction<GameConfig>>;
}

const GameConfigContext = createContext<GameConfigContextValue | undefined>(
  undefined
);

export const GameConfigProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [config, setConfig] = useState(defaultConfig);

  useEffect(() => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      colors: getAvailableColors(prevConfig.level),
    }));
  }, [config.level]);

  return (
    <GameConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </GameConfigContext.Provider>
  );
};

export const useGameConfig = () => {
  const context = useContext(GameConfigContext);

  if (!context) {
    throw new Error("useGameConfig must be used within GameConfigProvider");
  }
  return context;
};
