import DBSnake from "../../../db/dbEntities/db-snake";
import Snake from "../../entities/snake";

export class SnakeMapper {
    static toDomain(raw: DBSnake): Snake{
        const snake = new Snake();
        snake.id = raw.id;
        snake.axisX = raw.axisX;
        snake.axisY = raw.axisY;
        return snake;
    }
}