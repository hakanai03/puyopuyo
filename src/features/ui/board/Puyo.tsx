import React from "react";

interface PuyoProps {
  color: string;
  x: number;
  y: number;
  gridSize: number;
}

export const Puyo: React.FC<PuyoProps> = ({ color, x, y, gridSize }) => {
  const style: React.CSSProperties = {
    gridColumnStart: x + 1,
    gridColumnEnd: x + 2,
    gridRowStart: y + 1,
    gridRowEnd: y + 2,
    width: "100%",
    height: "100%",
    backgroundColor: color,
    borderRadius: "50%",
  };

  return <div style={style}></div>;
};
