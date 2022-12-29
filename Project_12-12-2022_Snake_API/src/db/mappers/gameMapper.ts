import DBGame from "../dbEntities/db-game";
import Game from "../../domain/entities/game";

export class GameMapper {
    static toDomain(raw: DBGame): Game{
        const game = new Game();
        game.id = raw.id;
        game.status = raw.status;
        game.speed = raw.speed;
        game.gameBoard = raw.gameBoard;
        return game;
    }
}