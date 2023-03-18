import React from "react";

export const Instructions: React.FC = () => {
  const instructionsStyle: React.CSSProperties = {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "1.2em",
  };

  return (
    <div style={instructionsStyle}>
      <p>操作方法:</p>
      <p>左右矢印: 移動</p>
      <p>下矢印: 速く落とす</p>
      <p>z: 回転</p>
      <p>s: 開始 / 一時停止</p>
      <p>Esc: ゲームリセット</p>
    </div>
  );
};
