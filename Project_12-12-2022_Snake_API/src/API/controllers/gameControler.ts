import { Request, Response } from "express";
import CreateGameBoard from "../../services/factories/createGameBoard";
import { GameRepository } from "../../domain/repository/gameRepository";
import { directions } from "../../services/factories/snakeDirectionConstant";
import SnakeMovementService from "../../services/snakeMovementService";
import CreateGameService from "../../services/createGameService";
import { container } from "../../inversify/config";
import SnakeEatsAndCollisionService from "../../services/snakeEatsAndCollisionService";
import SnakeAutoMovementService from "../../services/snakeAutoMovementService";

export default class GameController {
  static welcome(req: Request, res: Response) {
    res.send("Welcome to my Snake Game");
  }

  static async prepareGame(req: Request, res: Response) {
    const boardSize = parseFloat(req.params.size);
    const newGame = await CreateGameService.prepareGame(boardSize);

    res.send(newGame);
  }
  static async resetGame(req: Request, res: Response) {
    const boardSize = parseFloat(req.params.size);
    const snakeId = parseFloat(req.params.id);
    const gameId = parseFloat(req.params.game);
    const foodId = parseFloat(req.params.food);
    const resetGame = await CreateGameService.resetTheGame(
      gameId,
      snakeId,
      foodId,
      boardSize
    );

    res.send(resetGame);
  }

  static async startGame(req: Request, res: Response) {
    const boardSize = parseFloat(req.params.size);
    const snakeId = parseFloat(req.params.id);
    const gameId = parseFloat(req.params.game);
    const foodId = parseFloat(req.params.food);
    const { direction } = req.body;
    const gameStatus = "Playing";
    const gameSpeed = 1;

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

      const collision = await SnakeEatsAndCollisionService.didSnakeCollide(snakeId);

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
      if (snakeAte) {
        await CreateGameService.updateTheBoard(gameId, boardSize, foodId);
        await SnakeEatsAndCollisionService.snakeEats(snakeId);
      }
      if (collision){
        await CreateGameService.endingTheGame(gameId);
      }
      res.send(newGameBoardWithFoodAndSnakeBody);
    } else if (direction === directions[1]) {
      const snakeAte = await SnakeEatsAndCollisionService.didSnakeAteFood(
        snakeId,
        foodId,
        boardSize
      );

      const collision = await SnakeEatsAndCollisionService.didSnakeCollide(snakeId);

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
      if (snakeAte == true) {
        await CreateGameService.updateTheBoard(gameId, boardSize, foodId);
        await SnakeEatsAndCollisionService.snakeEats(snakeId);
      }
      if (collision){
        await CreateGameService.endingTheGame(gameId);
      }
      res.send(newGameBoardWithFoodAndSnakeBody);
    } else if (direction === directions[2]) {
      const snakeAte = await SnakeEatsAndCollisionService.didSnakeAteFood(
        snakeId,
        foodId,
        boardSize
      );

      const collision = await SnakeEatsAndCollisionService.didSnakeCollide(snakeId);

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
      if (snakeAte) {
        await CreateGameService.updateTheBoard(gameId, boardSize, foodId);
        await SnakeEatsAndCollisionService.snakeEats(snakeId);
      }
      if (collision){
        await CreateGameService.endingTheGame(gameId);
      }
      res.send(newGameBoardWithFoodAndSnakeBody);
      console.log(newGameBoardWithFoodAndSnakeBody);
    } else if (direction === directions[3]) {
      const snakeAte = await SnakeEatsAndCollisionService.didSnakeAteFood(
        snakeId,
        foodId,
        boardSize
      );

      const collision = await SnakeEatsAndCollisionService.didSnakeCollide(snakeId);

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
      if (snakeAte) {
        await CreateGameService.updateTheBoard(gameId, boardSize, foodId);
        await SnakeEatsAndCollisionService.snakeEats(snakeId);
      }
      if (collision){
        await CreateGameService.endingTheGame(gameId);
      }
      res.send(newGameBoardWithFoodAndSnakeBody);
    }
  }

  static async autoMovement(req: Request, res: Response) {
    const boardSize = parseFloat(req.params.size);
    const snakeId = parseFloat(req.params.id);
    const gameId = parseFloat(req.params.game);
    const foodId = parseFloat(req.params.food);
    const direction = req.body;
    await SnakeAutoMovementService.runGameInLoop(
      gameId,
      snakeId,
      foodId,
      boardSize,
      direction
    );
    res.send("Game Running");
  }

  static async showTheBoard(req: Request, res: Response) {
    const gameId = parseFloat(req.params.game);
    const game = await CreateGameService.showTheBoard(gameId);
  
    res.send(game);
  }

  static async endGame(req: Request, res: Response) {
    const gameId = parseFloat(req.params.game);
    await CreateGameService.endingTheGame(gameId);
    res.send("Game Ended");
  }
}
