import FoodRepository from "../../domain/repository/FoodRepository";
import SnakeRepository from "../../domain/repository/snakeRepository";
import BoardRepository from "../../domain/repository/boardRepository";
import GameRepository from "../../domain/repository/gameRepository";
import { container } from "../../inversify/config";
import createBoard from "./createBoard";
import createFood from "./createFood";
import CreateGameBoard from "./createGameBoard";
import createSnake from "./createSnake";
import CreateGame from "./createGame";
import RandomNumberService from "./randomNumberService";


export default class CreateGameService {

    static async prepareGame (boardSize: number) {

        const gameStatus = 'Ready to Play';
        const gameSpeed = 1;
        const gameAndPrintedBoard = [];
        
        const boardCreator = new createBoard();
        const board = boardCreator.createBoard(boardSize);
        const newBoardCreator = container.get<BoardRepository>('BoardService');
        const newBoard = await newBoardCreator.create(board);

        const snakeCreator = new createSnake();
        const snake = snakeCreator.createSnake(boardSize);
        const newSnakeCreator = container.get<SnakeRepository>('SnakeService');
        const newSnake = await newSnakeCreator.create(snake);

        const foodCreator = new createFood();
        const food = foodCreator.createFood(boardSize);
        const newFoodCreator = container.get<FoodRepository>('FoodService');
        const newFood = await newFoodCreator.create(food);    
        
        const gameBoard = CreateGameBoard.createEmptyBoard(newBoard);

        const gameBoardWithFood = CreateGameBoard.createBoardWithFood(gameBoard, newFood);

        const newGameBoard = JSON.stringify(gameBoardWithFood);


        const gameCreator = new CreateGame();
        const game = gameCreator.createGame(gameStatus, gameSpeed);
        game.gameBoard = newGameBoard;

        const newGameCreator = container.get<GameRepository>('GameService');
        const newGame = await newGameCreator.create(game);

        

        gameAndPrintedBoard.push(newGame);
        gameAndPrintedBoard.push(newBoard);
        gameAndPrintedBoard.push(newSnake);
        gameAndPrintedBoard.push(newFood);
       

        return newGame;
    }

    static async cleanTheBoard (gameId: number, boardSize: number){

        const cleanTheBoard = container.get<GameRepository>('GameService');
        const readGame = await cleanTheBoard.read(gameId);

        const gameBoard = CreateGameBoard.createEmptyBoardBySize(boardSize);

        readGame.gameBoard = JSON.stringify(gameBoard);

        await cleanTheBoard.update(readGame);

        return readGame;

    }

    static async updateTheBoard (gameId: number,boardSize: number, foodId: number){

        const foodUpdater = container.get<FoodRepository>('FoodService');
        const food = await foodUpdater.read(foodId); 

        const randomX = new RandomNumberService().randomNumber;
        const randomY = new RandomNumberService().randomNumber;

        food.axisX = randomX(boardSize);
        food.axisY = randomY(boardSize);

        await foodUpdater.update(food);

        const newGameUpdater = container.get<GameRepository>('GameService');
        const game = await newGameUpdater.read(gameId);

        const gameBoard = CreateGameBoard.createEmptyBoardBySize(boardSize);

        const gameBoardWithFood = CreateGameBoard.createBoardWithFood(gameBoard, food);

        const newGameBoard = JSON.stringify(gameBoardWithFood);

        game.gameBoard = newGameBoard;

        await newGameUpdater.update(game);

        return game;
    }

}