import DBBoard from "../../db/board/db-board";
import Board from "../../entities/board";

export class BoardMapper {
    static toDomain(raw: DBBoard): Board{
        const board = new Board();
        board.id = raw.id
        board.size = raw.size
        return board;
    }
}