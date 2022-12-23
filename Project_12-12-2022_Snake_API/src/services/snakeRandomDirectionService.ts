import RandomNumberService from "./factories/randomNumberService";
import { directions } from "./factories/snakeDirectionConstant";

export default class SnakeRandomDirectionService {
  snakeDirection() {
    const randomDirection = new RandomNumberService().randomNumber;
    const directionSnake = directions[randomDirection(3)];
    const spawnDirectionOfSnake = directionSnake.toString();

    return spawnDirectionOfSnake;
  }
}
