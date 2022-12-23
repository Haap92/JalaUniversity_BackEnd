import CreateGameBoard from "../../src/services/factories/createGameBoard";
import { boardMock } from "../board/__mocks__/boardMock";

test('Create an Empty Board with String[][] type', async()=>{
  const gameBoard = CreateGameBoard.createEmptyBoard(boardMock);
  expect(gameBoard).toBeTruthy();
});