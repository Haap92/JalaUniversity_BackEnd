import { FoodRepository } from "../domain/repository/FoodRepository";
import { SnakeRepository } from "../domain/repository/snakeRepository";
import { container } from "../inversify/config";
import {
  directions,
  minimunAxis,
  node,
} from "./factories/snakeDirectionConstant";

export default class SnakeEatsAndCollisionService {
  static async didSnakeAteFood(
    snakeId: number,
    foodId: number,
    boardSize: number
  ) {
    const nextPosition = await this.snakeNextPosition(snakeId, boardSize);
    const readFoodPosition = container.get<FoodRepository>("FoodService");
    const food = await readFoodPosition.read(foodId);

    const axisX = food.axisX;
    const axisY = food.axisY;

    const foodPosition = [];
    foodPosition.push(axisX);
    foodPosition.push(axisY);

    const nextFoodPosition = JSON.stringify(foodPosition);

    if (nextPosition == nextFoodPosition) {
      return true;
    }
  }

  static async didSnakeCollide(snakeId: number): Promise<boolean> {
    const showSnakeBody = container.get<SnakeRepository>("SnakeService");
    const snake = await showSnakeBody.read(snakeId);
    const snakeBody = JSON.parse(snake.body);

    const positionX = snake.axisX;
    const positionY = snake.axisY;

    const collision = snakeBody.forEach((element: number[]) => {
      if (positionX == element[0] && positionY == element[1]) return true;
    });
    return false;
    
  }

  static async snakeEats(snakeId: number) {
    const updateSnakeScore = container.get<SnakeRepository>("SnakeService");
    const snake = await updateSnakeScore.read(snakeId);
    const bodyNodes = JSON.parse(snake.body);

    const newBodyNode = [];
    const axisX = snake.axisX;
    const axisY = snake.axisY;
    newBodyNode.push(axisX);
    newBodyNode.push(axisY);

    bodyNodes.push(newBodyNode);
    snake.length = snake.length + node;
    snake.body = JSON.stringify(bodyNodes);
    snake.score = snake.score + 10;
    await updateSnakeScore.update(snake);

    return snake;
  }

  static async snakeNextPosition(snakeId: number, boardSize: number) {
    const limit = boardSize - node;
    const snakeReader = container.get<SnakeRepository>("SnakeService");
    const snake = await snakeReader.read(snakeId);
    const snakePosition = [];

    if (snake.direction == directions[0]) {
      if (snake.axisX === minimunAxis) {
        snakePosition.push((snake.axisX = limit));
        snakePosition.push(snake.axisY);
      } else {
        snakePosition.push(snake.axisX - node);
        snakePosition.push(snake.axisY);
      }
      return JSON.stringify(snakePosition);
    } else if (snake.direction == directions[1]) {
      if (snake.axisY === limit) {
        snakePosition.push(snake.axisX);
        snakePosition.push((snake.axisY = minimunAxis));
      } else {
        snakePosition.push(snake.axisX);
        snakePosition.push(snake.axisY + node);
      }
      return JSON.stringify(snakePosition);
    } else if (snake.direction == directions[2]) {
      if (snake.axisX === limit) {
        snakePosition.push((snake.axisX = minimunAxis));
        snakePosition.push(snake.axisY);
      } else {
        snakePosition.push(snake.axisX + node);
        snakePosition.push(snake.axisY);
      }
      return JSON.stringify(snakePosition);
    } else if (snake.direction == directions[3]) {
      if (snake.axisY === minimunAxis) {
        snakePosition.push(snake.axisX);
        snakePosition.push((snake.axisY = limit));
      } else {
        snakePosition.push(snake.axisX);
        snakePosition.push(snake.axisY - node);
      }
      return JSON.stringify(snakePosition);
    }
  }
}
