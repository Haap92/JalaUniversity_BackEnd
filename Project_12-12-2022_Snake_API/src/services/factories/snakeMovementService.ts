import SnakeRepository from "../../domain/repository/snakeRepository";
import { container } from "../../inversify/config";
import { directions, minimunAxis } from "./snakeDirectionConstant";


export default class SnakeMovementService {

   static async moveTheSnakeLeft(boardSize: number, snakeId: number) {
        const snakeMovingLeft = directions[0];
        const snakeMovingRight = directions[2];
        const updateSnakeDirection = container.get<SnakeRepository>('SnakeService');
        const snake = await updateSnakeDirection.read(snakeId)
        snake.axisX === minimunAxis && snake.direction !== snakeMovingRight
            ? snake.axisX = boardSize 
            : snake.axisX--
        snake.direction = snakeMovingLeft
        await updateSnakeDirection.update(snake)
        return snake
    }

    static async moveTheSnakeUp(boardSize: number, snakeId: number) {
        const snakeMovingUp = directions[1];
        const snakeMovingDown = directions[3];
        const updateSnakeDirection = container.get<SnakeRepository>('SnakeService');
        const snake = await updateSnakeDirection.read(snakeId)
        snake.axisY === boardSize && snake.direction !== snakeMovingDown
            ? snake.axisY = minimunAxis
            : snake.axisY++
        snake.direction = snakeMovingUp
        await updateSnakeDirection.update(snake)
        return snake
    }

    static async moveTheSnakeRight(boardSize: number, snakeId: number) {
        const snakeMovingLeft = directions[0];
        const snakeMovingRight = directions[2];
        const updateSnakeDirection = container.get<SnakeRepository>('SnakeService');
        const snake = await updateSnakeDirection.read(snakeId)
        snake.axisX === boardSize && snake.direction !== snakeMovingLeft
            ? snake.axisX = minimunAxis
            : snake.axisX++
        snake.direction = snakeMovingRight
        await updateSnakeDirection.update(snake)
        return snake
    }

    static async moveTheSnakeDown(boardSize: number, snakeId: number) {
        const snakeMovingUp = directions[1];
        const snakeMovingDown = directions[3];
        const updateSnakeDirection = container.get<SnakeRepository>('SnakeService');
        const snake = await updateSnakeDirection.read(snakeId)
        snake.axisY > minimunAxis && snake.direction !== snakeMovingUp
            ? snake.axisY--
            : snake.axisY = boardSize 
        snake.direction = snakeMovingDown
        await updateSnakeDirection.update(snake)
        return snake
    }
}