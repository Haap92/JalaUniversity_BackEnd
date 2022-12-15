import Board from "../../domain/entities/board";

export default class createBoard {
    createBoard(size: number): Board  {
        const board = new Board;
        board.gridX = size;
        board.gridY = size;
        return board
    }
}