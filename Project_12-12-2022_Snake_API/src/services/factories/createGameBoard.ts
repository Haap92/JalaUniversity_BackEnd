import Snake from "../../domain/entities/Snake";
import Food from "../../domain/entities/food";
import Board from "../../domain/entities/board";
import { SnakeRepository } from "../../domain/repository/snakeRepository";
import { container } from "../../inversify/config";
export default class CreateGameBoard {
  static createEmptyBoard(board: Board) {
    const size = board.gridX;

    const emptyBoard = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => "_")
    );

    return emptyBoard;
  }

  static createEmptyBoardBySize(boardSize: number) {
    const emptyBoard = Array.from({ length: boardSize }, () =>
      Array.from({ length: boardSize }, () => "_")
    );

    return emptyBoard;
  }

  static createBoardWithFood(emptyBoard: string[][], food: Food) {
    const boardWithFood = emptyBoard;
    const positionX = food.axisX;
    const positionY = food.axisY;
    boardWithFood[positionX][positionY] = "F";

    return boardWithFood;
  }

  static createBoardWithFoodAndSnakes(boardWithFood: string[][], snake: Snake) {
    const boardWithFoodAndSnakes = boardWithFood;
    const positionX = snake.axisX;
    const positionY = snake.axisY;
    boardWithFoodAndSnakes[positionX][positionY] = "S";

    return boardWithFoodAndSnakes;
  }

  static async createBoardWithFoodAndSnakeBody(
    boardWithFoodAndSnakes: string[][],
    snakeId: number
  ) {
    const boardWithFoodAndSnakeBody = boardWithFoodAndSnakes;
    const showSnakeBody = container.get<SnakeRepository>("SnakeService");
    const snake = await showSnakeBody.read(snakeId);
    const snakeBody = JSON.parse(snake.body);

    snakeBody.forEach((element: number[]) => {
      const positionX = element[0];
      const positionY = element[1];
      boardWithFoodAndSnakes[positionX][positionY] = "B";
    });

    return boardWithFoodAndSnakeBody;
  }
}
