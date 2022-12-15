import Snake from "../../domain/entities/snake";
import SnakeRandomDirectionService  from "./snakeRandomDirectionService";
import RandomNumberService from "./randomNumberService";

export default class createSnake {
    createSnake(boardSize: number): Snake {
        const snake = new Snake
        const randomAxisX = new RandomNumberService().randomNumber(boardSize)
        const randomAxisY = new RandomNumberService().randomNumber(boardSize)
        const randomDirection = new SnakeRandomDirectionService ().snakeDirection()
        snake.axisX = randomAxisX
        snake.axisY = randomAxisY
        snake.direction = randomDirection
        return snake
    }
}