import Board from "../domain/entities/board";

export default class createBoard {
    createBoard(number: number): Board  {
        const board = new Board;
        board.gridX = number;
        board.gridY = number;
        return board
    }
}