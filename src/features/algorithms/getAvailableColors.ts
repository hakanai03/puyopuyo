import { Color } from "../../types/Color";

export const colors: Color[] = ["red", "green", "blue", "yellow", "purple"];

export const getAvailableColors = (level: number): Color[] => {
  return colors.slice(0, 2 + level);
};
