import { FoodRepository } from "../domain/repository/FoodRepository";
import { SnakeRepository } from "../domain/repository/snakeRepository";
import { BoardRepository } from "../domain/repository/boardRepository";
import { GameRepository } from "../domain/repository/gameRepository";
import { container } from "../inversify/config";
import createBoard from "./factories/createBoard";
import createFood from "./factories/createFood";
import CreateGameBoard from "./factories/createGameBoard";
import createSnake from "./factories/createSnake";
import CreateGame from "./factories/createGame";
import RandomNumberService from "./factories/randomNumberService";
import { status } from "../domain/types";

export default class CreateGameService {
  static async prepareGame(boardSize: number) {
    const gameStatus = "Ready to Play";
    const gameSpeed = 1;
    const gameAndPrintedBoard = [];

    const boardCreator = new createBoard();
    const board = boardCreator.createBoard(boardSize);
    const newBoardCreator = container.get<BoardRepository>("BoardService");
    const newBoard = await newBoardCreator.create(board);

    const snakeCreator = new createSnake();
    const snake = snakeCreator.createSnake(boardSize);
    const newSnakeCreator = container.get<SnakeRepository>("SnakeService");
    const newSnake = await newSnakeCreator.create(snake);

    const foodCreator = new createFood();
    const food = foodCreator.createFood(boardSize);
    const newFoodCreator = container.get<FoodRepository>("FoodService");
    const newFood = await newFoodCreator.create(food);

    const gameBoard = CreateGameBoard.createEmptyBoard(newBoard);

    const gameBoardWithFood = CreateGameBoard.createBoardWithFood(
      gameBoard,
      newFood
    );

    const newGameBoard = JSON.stringify(gameBoardWithFood);

    const gameCreator = new CreateGame();
    const game = gameCreator.createGame(gameStatus, gameSpeed);
    game.gameBoard = newGameBoard;

    const newGameCreator = container.get<GameRepository>("GameService");
    const newGame = await newGameCreator.create(game);

    gameAndPrintedBoard.push(newGame);
    gameAndPrintedBoard.push(newBoard);
    gameAndPrintedBoard.push(newSnake);
    gameAndPrintedBoard.push(newFood);

    return newGame;
  }

  static async cleanTheBoard(gameId: number, boardSize: number) {
    const cleanTheBoard = container.get<GameRepository>("GameService");
    const readGame = await cleanTheBoard.read(gameId);

    const gameBoard = CreateGameBoard.createEmptyBoardBySize(boardSize);

    readGame.gameBoard = JSON.stringify(gameBoard);

    await cleanTheBoard.update(readGame);

    return readGame;
  }

  static async updateTheBoard(
    gameId: number,
    boardSize: number,
    foodId: number
  ) {
    const foodUpdater = container.get<FoodRepository>("FoodService");
    const food = await foodUpdater.read(foodId);

    const randomX = new RandomNumberService().randomNumber;
    const randomY = new RandomNumberService().randomNumber;

    food.axisX = randomX(boardSize);
    food.axisY = randomY(boardSize);

    await foodUpdater.update(food);

    const newGameUpdater = container.get<GameRepository>("GameService");
    const game = await newGameUpdater.read(gameId);

    const gameBoard = CreateGameBoard.createEmptyBoardBySize(boardSize);

    const gameBoardWithFood = CreateGameBoard.createBoardWithFood(
      gameBoard,
      food
    );

    const newGameBoard = JSON.stringify(gameBoardWithFood);

    game.gameBoard = newGameBoard;

    await newGameUpdater.update(game);

    return game;
  }

  static async resetTheGame(
    gameId: number,
    snakeId: number,
    foodId: number,
    boardSize: number
  ) {
    const gameStatus = "Ready to Play";
    const gameSpeed = 1;
    const gameAndPrintedBoard = [];

    const boardCreator = new createBoard();
    const board = boardCreator.createBoard(boardSize);
    const newBoardCreator = container.get<BoardRepository>("BoardService");
    const newBoard = await newBoardCreator.create(board);

    const snakeUpdater = container.get<SnakeRepository>("SnakeService");
    const snake = await snakeUpdater.read(snakeId);

    const snakeAxisX = new RandomNumberService().randomNumber;
    const snakeAxisY = new RandomNumberService().randomNumber;

    snake.axisX = snakeAxisX(boardSize);
    snake.axisY = snakeAxisY(boardSize);

    await snakeUpdater.update(snake);

    const foodUpdater = container.get<FoodRepository>("FoodService");
    const food = await foodUpdater.read(foodId);

    const foodAxisX = new RandomNumberService().randomNumber;
    const foodAxisY = new RandomNumberService().randomNumber;

    food.axisX = foodAxisX(boardSize);
    food.axisY = foodAxisY(boardSize);

    await foodUpdater.update(food);

    const gameBoard = CreateGameBoard.createEmptyBoard(newBoard);

    const gameBoardWithFood = CreateGameBoard.createBoardWithFood(
      gameBoard,
      food
    );

    const newGameBoard = JSON.stringify(gameBoardWithFood);

    const newGameCreator = container.get<GameRepository>("GameService");
    const game = await newGameCreator.read(gameId);
    game.status = gameStatus;
    game.speed = gameSpeed;
    game.gameBoard = newGameBoard;
    const gameResets = await newGameCreator.update(game);

    gameAndPrintedBoard.push(gameResets);
    gameAndPrintedBoard.push(newBoard);
    gameAndPrintedBoard.push(snake);
    gameAndPrintedBoard.push(food);

    return gameResets;
  }

  static async showTheBoard(gameId: number) {
    const newGameReader = container.get<GameRepository>("GameService");
    const game = await newGameReader.read(gameId);
    const showingTheBoard = game.gameBoard;
    await newGameReader.update(game);
    const theBoard = JSON.parse(showingTheBoard);
    return theBoard;
  }

  static async endingTheGame(gameId: number){
    const newGameReader = await container.get<GameRepository>("GameService");
    const game = await newGameReader.read(gameId);
    const status: status = 'Ended';
    game.status = status;
    console.log(game.status);

    await newGameReader.update(game);

  }
}
