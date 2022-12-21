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

        const gameBoardWithFoodAndSnakes = CreateGameBoard.createBoardWithFoodAndSnakes(gameBoardWithFood, newSnake);

        const newGameBoard = gameBoardWithFoodAndSnakes.toString();

        const gameCreator = new CreateGame();
        const game = gameCreator.createGame(gameStatus, gameSpeed);
        game.gameBoard = newGameBoard;
        const newGameCreator = container.get<GameRepository>('GameService');
        const newGame = await newGameCreator.create(game);

        

        gameAndPrintedBoard.push(newGame);
        gameAndPrintedBoard.push(newBoard);
        gameAndPrintedBoard.push(newSnake);
       

        return gameAndPrintedBoard;

    }

    static async prepareTheBoard (boardSize: number){

        const gameStatus = 'Playing';
        const gameSpeed = 1;
        
        
        const boardCreator = new createBoard();
        const board = boardCreator.createBoard(boardSize);
        const newBoardCreator = container.get<BoardRepository>('BoardService');
        const newBoard = await newBoardCreator.create(board);

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

        return newGame;
    }

}