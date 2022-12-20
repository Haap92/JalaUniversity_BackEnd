import { Request, Response } from "express";
import BoardRepository from "../../domain/repository/boardRepository";
import FoodRepository from "../../domain/repository/FoodRepository";
import SnakeRepository from "../../domain/repository/snakeRepository";
import GameRepository from "../../domain/repository/gameRepository";
import { container } from "../../inversify/config";
import createBoard from "../../services/factories/createBoard";
import createFood from "../../services/factories/createFood";
import CreateGameBoard from "../../services/factories/createGameBoard";
import createSnake from "../../services/factories/createSnake";
import CreateGame from '../../services/factories/createGame';
import { directions } from "../../services/factories/snakeDirectionConstant";
import SnakeMovementService from "../../services/factories/snakeMovementService";

export default class GameController {
    
    static welcome(req: Request, res: Response){
        res.send("Welcome to my Snake Game");
    }

    static async prepareGame(req: Request, res: Response){

        const boardSize = parseFloat(req.params.size);
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

        const gameCreator = new CreateGame();
        const game = gameCreator.createGame(gameStatus, gameSpeed);
        const newGameCreator = container.get<GameRepository>('GameService');
        const newGame = await newGameCreator.create(game);
        
       
        const gameBoard = CreateGameBoard.createEmptyBoard(newBoard);

        const gameBoardWithFood = CreateGameBoard.createBoardWithFood(gameBoard, newFood);

        const gameBoardWithFoodAndSnakes = CreateGameBoard.createBoardWithFoodAndSnakes(gameBoardWithFood, newSnake);

        gameAndPrintedBoard.push(newGame);
        gameAndPrintedBoard.push(gameBoardWithFoodAndSnakes);

        res.send(gameAndPrintedBoard);

    }

    static async startGame(req: Request, res: Response){

        const boardSize = parseFloat(req.params.size);
        const gameStatus = 'Playing';
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
        const snakeId = newSnake.id;

        const foodCreator = new createFood();
        const food = foodCreator.createFood(boardSize);
        const newFoodCreator = container.get<FoodRepository>('FoodService');
        const newFood = await newFoodCreator.create(food);

        const gameCreator = new CreateGame();
        const game = gameCreator.createGame(gameStatus, gameSpeed);
        const newGameCreator = container.get<GameRepository>('GameService');
        const newGame = await newGameCreator.create(game);
        
       
        const gameBoard = CreateGameBoard.createEmptyBoard(newBoard);

        const gameBoardWithFood = CreateGameBoard.createBoardWithFood(gameBoard, newFood);

        const gameBoardWithFoodAndSnakes = CreateGameBoard.createBoardWithFoodAndSnakes(gameBoardWithFood, newSnake);

        gameAndPrintedBoard.push(newGame);
        gameAndPrintedBoard.push(gameBoardWithFoodAndSnakes);

        const { direction } = req.body;

        if (direction === directions[0]){

            const newGameAndPrintedBoard = [];
            const snakeLeft = await SnakeMovementService.moveTheSnakeLeft(boardSize, snakeId);
            const newGameBoardWithFoodAndSnakes = CreateGameBoard.createBoardWithFoodAndSnakes(gameBoardWithFood, snakeLeft);
            newGameAndPrintedBoard.push(newGameBoardWithFoodAndSnakes);

            res.send(newGameAndPrintedBoard);

        }else if (direction === directions[1]) {

            const newGameAndPrintedBoard = [];
            const snakeUp = await SnakeMovementService.moveTheSnakeUp(boardSize, snakeId);
            const newGameBoardWithFoodAndSnakes = CreateGameBoard.createBoardWithFoodAndSnakes(gameBoardWithFood, snakeUp);
            newGameAndPrintedBoard.push(newGameBoardWithFoodAndSnakes);

            res.send(newGameAndPrintedBoard);

        }else if (direction === directions[2]) {
                
            const newGameAndPrintedBoard = [];
            const snakeRight = await SnakeMovementService.moveTheSnakeRight(boardSize, snakeId);
            const newGameBoardWithFoodAndSnakes = CreateGameBoard.createBoardWithFoodAndSnakes(gameBoardWithFood, snakeRight);
            newGameAndPrintedBoard.push(newGameBoardWithFoodAndSnakes);

            res.send(newGameAndPrintedBoard);

        }else if (direction === directions[3]) {

            const newGameAndPrintedBoard = [];
            const snakeDown = await SnakeMovementService.moveTheSnakeDown(boardSize, snakeId);
            const newGameBoardWithFoodAndSnakes = CreateGameBoard.createBoardWithFoodAndSnakes(gameBoardWithFood, snakeDown);
            newGameAndPrintedBoard.push(newGameBoardWithFoodAndSnakes);

            res.send(newGameAndPrintedBoard);
        }

        res.send(gameAndPrintedBoard);
    }
}