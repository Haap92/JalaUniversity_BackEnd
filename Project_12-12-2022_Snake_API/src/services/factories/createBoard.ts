import Board from "../../domain/entities/board";

export default class createBoard {
    createBoard(boardSize: number): Board  {
        const board = new Board;
        board.gridX = boardSize;
        board.gridY = boardSize;
        return board
    }
}