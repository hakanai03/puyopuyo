import { GameStatus } from "./GameStatus";
import { Board } from "./Board";
import { PuyoPair } from "./PuyoPair";

export interface GameState {
  board: Board; // 場所が確定していないぷよ
  fixedBoard: Board; // 場所が確定したぷよ
  currentPuyoPair: PuyoPair; // 現在落下中のぷよ
  nextPuyoPair: PuyoPair; // 次に落下予定のぷよ
  gameStatus: GameStatus;
}
