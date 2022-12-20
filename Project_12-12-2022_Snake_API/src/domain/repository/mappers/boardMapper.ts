import DBBoard from "../../../db/dbEntities/db-board";
import Board from "../../entities/board";

export class BoardMapper {
    static toDomain(raw: DBBoard): Board{
        const board = new Board();
        board.id = raw.id;
        board.gridX = raw.gridX;
        board.gridY = raw.gridY;
        return board;
    }
}