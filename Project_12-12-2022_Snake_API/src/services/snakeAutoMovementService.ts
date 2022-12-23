import { GameRepository } from "../domain/repository/gameRepository";
import { container } from "../inversify/config";
import CreateGameService from "./createGameService";
import CreateGameBoard from "./factories/createGameBoard";
import { directions } from './factories/snakeDirectionConstant';
import SnakeEatsAndCollisionService from "./snakeEatsAndCollisionService";
import SnakeMovementService from "./snakeMovementService";
import { direction } from '../domain/types';

export default class SnakeAutoMovementService {
  static async runGameInLoop(
    gameId: number,
    snakeId: number,
    foodId: number,
    boardSize: number,
    direction: direction
  ) {
    const newGamereader = container.get<GameRepository>("GameService");
    const game = await newGamereader.read(gameId);
    const speed = game.speed;
    const status = game.status;

    const updateGame = async () => {
      const gameStatus = game.status;
      console.log(gameStatus);
      console.log(status);

      const gameEnd = "Ended";

      if (gameStatus == gameEnd) {
        clearInterval(gameLoopInterval);
      }
      await this.MovementLoop(gameId, snakeId, foodId, boardSize, direction);
    };

    const gameLoopInterval = setInterval(updateGame, speed);
    return game;
  }

  static async MovementLoop(
    gameId: number,
    snakeId: number,
    foodId: number,
    boardSize: number, 
    direction: direction
  ) {
    const gameStatus = "Playing";
    const gameSpeed = 1000;

    const newReadGame = container.get<GameRepository>("GameService");
    const game = await newReadGame.read(gameId);

    game.status = gameStatus;
    game.speed = gameSpeed;
    await newReadGame.update(game);
    const gameBoardWithFood = JSON.parse(game.gameBoard);
    

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
      const newGameBoardWithFoodAndSnakeBody =
        await CreateGameBoard.createBoardWithFoodAndSnakeBody(
          newGameBoardWithFoodAndSnakes,
          snakeId
        );
      const boardToSave = JSON.stringify(newGameBoardWithFoodAndSnakeBody);
      game.gameBoard = boardToSave;
      await newReadGame.update(game);
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
      const newGameBoardWithFoodAndSnakeBody =
        await CreateGameBoard.createBoardWithFoodAndSnakeBody(
          newGameBoardWithFoodAndSnakes,
          snakeId
        );
      const boardToSave = JSON.stringify(newGameBoardWithFoodAndSnakeBody);
      game.gameBoard = boardToSave;
      await newReadGame.update(game);
      if (snakeAte) {
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
      const newGameBoardWithFoodAndSnakeBody =
        await CreateGameBoard.createBoardWithFoodAndSnakeBody(
          newGameBoardWithFoodAndSnakes,
          snakeId
        );
      const boardToSave = JSON.stringify(newGameBoardWithFoodAndSnakeBody);
      game.gameBoard = boardToSave;
      await newReadGame.update(game);
      if (snakeAte) {
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
      const newGameBoardWithFoodAndSnakeBody =
        await CreateGameBoard.createBoardWithFoodAndSnakeBody(
          newGameBoardWithFoodAndSnakes,
          snakeId
        );
      const boardToSave = JSON.stringify(newGameBoardWithFoodAndSnakeBody);
      game.gameBoard = boardToSave;
      await newReadGame.update(game);
      if (snakeAte) {
        await CreateGameService.updateTheBoard(gameId, boardSize, foodId);
        await SnakeEatsAndCollisionService.snakeEats(snakeId);
      }
    }

    return game;
  }
}
