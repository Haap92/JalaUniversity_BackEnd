import DBGame from "../../../db/dbEntities/db-game";
import Game from "../../entities/game";

export class GameMapper {
    static toDomain(raw: DBGame): Game{
        const game = new Game();
        game.id = raw.id;
        game.status = raw.status;
        game.speed = raw.speed;
        game.gameBoard = raw.gameBoard;
        game.food = raw.food;
        return game;
    }
}