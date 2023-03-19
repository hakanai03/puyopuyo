import { GameStatus } from "./GameStatus";
import { Board } from "./Board";
import { PuyoPuyo } from "./PuyoPuyo";

export interface GameState {
  fixedBoard: Board; // 場所が確定したぷよ
  currentPuyoPuyo: PuyoPuyo; // 現在落下中のぷよ
  nextPuyoPuyo: PuyoPuyo; // 次に落下予定のぷよ
  gameStatus: GameStatus;
  chainStep: "none" | "drop" | "remove";
  level: number
  score: number
}
