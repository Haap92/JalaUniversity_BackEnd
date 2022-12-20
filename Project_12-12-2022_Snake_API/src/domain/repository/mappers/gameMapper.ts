import DBGame from "../../../db/dbEntities/db-game";
import Game from "../../entities/game";

export class GameMapper {
    static toDomain(raw: DBGame): Game{
        const game = new Game();
        game.id = raw.id
        game.boardId = raw.boardId
        game.snakeId = raw.snakeId
        return game;
    }
}