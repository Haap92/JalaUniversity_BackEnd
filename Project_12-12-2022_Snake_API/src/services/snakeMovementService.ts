import { SnakeRepository } from "../domain/repository/snakeRepository";
import { container } from "../inversify/config";
import {
  directions,
  minimunAxis,
  node,
} from "./factories/snakeDirectionConstant";

export default class SnakeMovementService {
  static async moveTheSnakeLeft(boardSize: number, snakeId: number) {
    const snakeMovingLeft = directions[0];
    const limit = boardSize - node;
    const updateSnakeDirection = container.get<SnakeRepository>("SnakeService");
    const snake = await updateSnakeDirection.read(snakeId);
    snake.direction = snakeMovingLeft;
    await updateSnakeDirection.update(snake);

    if (snake.axisX === minimunAxis) {
      snake.axisX = limit;
      await updateSnakeDirection.update(snake);
    } else {
      snake.axisX--;
      await updateSnakeDirection.update(snake);
    }
    this.snakeBodyUpdates(snakeId);
    return snake;
  }

  static async moveTheSnakeUp(boardSize: number, snakeId: number) {
    const snakeMovingUp = directions[1];
    const limit = boardSize - 1;
    const updateSnakeDirection = container.get<SnakeRepository>("SnakeService");
    const snake = await updateSnakeDirection.read(snakeId);
    snake.direction = snakeMovingUp;
    await updateSnakeDirection.update(snake);

    if (snake.axisY === limit) {
      snake.axisY = minimunAxis;
      await updateSnakeDirection.update(snake);
    } else {
      snake.axisY++;
      await updateSnakeDirection.update(snake);
    }
    this.snakeBodyUpdates(snakeId);
    return snake;
  }

  static async moveTheSnakeRight(boardSize: number, snakeId: number) {
    const snakeMovingRight = directions[2];
    const limit = boardSize - 1;
    const updateSnakeDirection = container.get<SnakeRepository>("SnakeService");
    const snake = await updateSnakeDirection.read(snakeId);
    snake.direction = snakeMovingRight;
    await updateSnakeDirection.update(snake);

    if (snake.axisX === limit) {
      snake.axisX = minimunAxis;
      await updateSnakeDirection.update(snake);
    } else {
      snake.axisX++;
      await updateSnakeDirection.update(snake);
    }
    this.snakeBodyUpdates(snakeId);
    return snake;
  }

  static async moveTheSnakeDown(boardSize: number, snakeId: number) {
    const snakeMovingDown = directions[3];
    const limit = boardSize - 1;
    const updateSnakeDirection = container.get<SnakeRepository>("SnakeService");
    const snake = await updateSnakeDirection.read(snakeId);
    snake.direction = snakeMovingDown;

    if (snake.axisY === minimunAxis) {
      snake.axisY = limit;
      await updateSnakeDirection.update(snake);
    } else {
      snake.axisY--;
      await updateSnakeDirection.update(snake);
    }
    this.snakeBodyUpdates(snakeId);
    return snake;
  }

  static async snakeBodyUpdates(snakeId: number) {
    const updateSnakeDirection = container.get<SnakeRepository>("SnakeService");
    const snake = await updateSnakeDirection.read(snakeId);

    const snakeBody = JSON.parse(snake.body);
    const snakeHead = [];
    snake.axisX;
    snake.axisY;
    snakeHead.push(snake.axisX);
    snakeHead.push(snake.axisY);

    let oldPosition = snakeHead;

    let i = 0;

    for (i = 0; i < snakeBody.length; i++) {
      const newPosition = snakeBody[i];
      snakeBody[i] = oldPosition;
      oldPosition = newPosition;
    }
    const newSnakeBody = JSON.stringify(snakeBody);
    snake.body = newSnakeBody;
    await updateSnakeDirection.update(snake);
  }
}
