import { Color } from "./Color";

export type GameConfig = {
  boardWidth: number;
  boardHeight: number;
  level: number;
  gameSpeed: number;
  colors: Color[];
};
