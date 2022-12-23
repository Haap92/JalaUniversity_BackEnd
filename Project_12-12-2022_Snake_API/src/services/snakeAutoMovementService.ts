import { GameRepository } from "../domain/repository/gameRepository";
import { container } from "../inversify/config";
import CreateGameService from "./createGameService";
import CreateGameBoard from "./factories/createGameBoard";
import { directions } from "./factories/snakeDirectionConstant";
import SnakeEatsAndCollisionService from "./snakeEatsAndCollisionService";
import SnakeMovementService from "./snakeMovementService";
import { SnakeRepository } from "../domain/repository/snakeRepository";

export default class SnakeAutoMovementService {
  static async runGameInLoop(
    gameId: number,
    snakeId: number,
    foodId: number,
    boardSize: number
  ) {
    const newGamereader = container.get<GameRepository>("GameService");
    const game = await newGamereader.read(gameId);
    const speed = game.speed;

    const updateGame = async () => {
      await this.MovementLoop(gameId, snakeId, foodId, boardSize);
      const gameStatus = game.status;
      const gameEnd = "Ended";

      if (gameStatus === gameEnd) {
        clearInterval(gameLoopInterval);
      }
    };

    const gameLoopInterval = setInterval(updateGame, speed);
    return game;
  }

  static async MovementLoop(
    gameId: number,
    snakeId: number,
    foodId: number,
    boardSize: number
  ) {
    const gameStatus = "Playing";
    const gameSpeed = 1000;

    const newReadGame = container.get<GameRepository>("GameService");
    const game = await newReadGame.read(gameId);

    game.status = gameStatus;
    game.speed = gameSpeed;
    await newReadGame.update(game);

    const gameBoardWithFood = JSON.parse(game.gameBoard);
    const newReadSnake = container.get<SnakeRepository>("SnakeService");
    const snake = await newReadSnake.read(snakeId);

    // eslint-disable-next-line prefer-const
    let direction = snake.direction;

    if (direction === directions[0]) {
      const snakeAte = await SnakeEatsAndCollisionService.didSnakeAteFood(
        snakeId,
        foodId,
        boardSize
      );

      const snakeLeft = await SnakeMovementService.moveTheSnakeLeft(
        boardSize,
        snakeId
      );

      const newGameBoardWithFoodAndSnakes =
        CreateGameBoard.createBoardWithFoodAndSnakes(
          gameBoardWithFood,
          snakeLeft
        );
      await CreateGameBoard.createBoardWithFoodAndSnakeBody(
        newGameBoardWithFoodAndSnakes,
        snakeId
      );
      if (snakeAte) {
        await CreateGameService.updateTheBoard(gameId, boardSize, foodId);
        await SnakeEatsAndCollisionService.snakeEats(snakeId);
      }
    } else if (direction === directions[1]) {
      const snakeAte = await SnakeEatsAndCollisionService.didSnakeAteFood(
        snakeId,
        foodId,
        boardSize
      );

      const snakeUp = await SnakeMovementService.moveTheSnakeUp(
        boardSize,
        snakeId
      );
      const newGameBoardWithFoodAndSnakes =
        CreateGameBoard.createBoardWithFoodAndSnakes(
          gameBoardWithFood,
          snakeUp
        );
      await CreateGameBoard.createBoardWithFoodAndSnakeBody(
        newGameBoardWithFoodAndSnakes,
        snakeId
      );
      if (snakeAte == true) {
        await CreateGameService.updateTheBoard(gameId, boardSize, foodId);
        await SnakeEatsAndCollisionService.snakeEats(snakeId);
      }
    } else if (direction === directions[2]) {
      const snakeAte = await SnakeEatsAndCollisionService.didSnakeAteFood(
        snakeId,
        foodId,
        boardSize
      );

      const snakeRight = await SnakeMovementService.moveTheSnakeRight(
        boardSize,
        snakeId
      );
      const newGameBoardWithFoodAndSnakes =
        CreateGameBoard.createBoardWithFoodAndSnakes(
          gameBoardWithFood,
          snakeRight
        );
      await CreateGameBoard.createBoardWithFoodAndSnakeBody(
        newGameBoardWithFoodAndSnakes,
        snakeId
      );
      if (snakeAte == true) {
        await CreateGameService.updateTheBoard(gameId, boardSize, foodId);
        await SnakeEatsAndCollisionService.snakeEats(snakeId);
      }
    } else if (direction === directions[3]) {
      const snakeAte = await SnakeEatsAndCollisionService.didSnakeAteFood(
        snakeId,
        foodId,
        boardSize
      );

      const snakeDown = await SnakeMovementService.moveTheSnakeDown(
        boardSize,
        snakeId
      );
      const newGameBoardWithFoodAndSnakes =
        CreateGameBoard.createBoardWithFoodAndSnakes(
          gameBoardWithFood,
          snakeDown
        );
      await CreateGameBoard.createBoardWithFoodAndSnakeBody(
        newGameBoardWithFoodAndSnakes,
        snakeId
      );
      if (snakeAte == true) {
        await CreateGameService.updateTheBoard(gameId, boardSize, foodId);
        await SnakeEatsAndCollisionService.snakeEats(snakeId);
      }
    }

    return game;
  }
}
