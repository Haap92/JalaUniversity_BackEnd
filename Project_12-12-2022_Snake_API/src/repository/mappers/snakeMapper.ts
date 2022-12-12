import DBSnake from "../../db/snake/db-snake";
import Snake from "../../entities/snake";

export class SnakeMapper {
    static toDomain(raw: DBSnake): Snake{
        const snake = new Snake();
        snake.id = raw.id
        snake.position = raw.position
        return snake;
    }
}