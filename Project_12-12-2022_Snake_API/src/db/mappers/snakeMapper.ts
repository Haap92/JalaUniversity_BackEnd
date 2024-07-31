import DBSnake from "../dbEntities/db-snake";
import Snake from "../../domain/entities/Snake";


export class SnakeMapper {
    static toDomain(raw: DBSnake): Snake{
        const snake = new Snake();
        snake.id = raw.id;
        snake.axisX = raw.axisX;
        snake.axisY = raw.axisY;
        snake.direction = raw.direction;
        snake.length = raw.length;
        snake.body = raw.body;
        snake.name = raw.name;
        snake.score = raw.score;
        return snake;
    }
}