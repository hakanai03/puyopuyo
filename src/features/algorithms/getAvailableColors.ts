export const getAvailableColors = (level: number): string[] => {
  const colors = ["red", "green", "blue", "yellow", "purple"];
  return colors.slice(0, 2 + level);
};

