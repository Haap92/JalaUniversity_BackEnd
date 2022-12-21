import { Request, Response } from "express";
import CreateGameBoard from '../../services/factories/createGameBoard';
import GameRepository from "../../domain/repository/gameRepository";
import { directions } from "../../services/factories/snakeDirectionConstant";
import SnakeMovementService from "../../services/factories/snakeMovementService";
import CreateGameService from "../../services/factories/createGameService";
import { container } from "../../inversify/config";


export default class GameController {
    
    static welcome(req: Request, res: Response){
        res.send("Welcome to my Snake Game");
    }

    static async prepareGame(req: Request, res: Response){

        const boardSize = parseFloat(req.params.size);
        const newGame = await CreateGameService.prepareGame(boardSize);

        res.send(newGame);

    }

    static async startGame(req: Request, res: Response){

        const boardSize = parseFloat(req.params.size);
        const snakeId = parseFloat(req.params.size);
        const gameId = parseFloat(req.params.game);
        const { direction } = req.body;
        const gameStatus = 'Playing';
        const gameSpeed = 1;

        const newReadGame = container.get<GameRepository>('GameService');
        const game = await newReadGame.read(gameId);

        game.status = gameStatus;
        game.speed = gameSpeed;
        await newReadGame.update(game);

        const gameBoardWithFood = JSON.parse(game.gameBoard);
        

        if (direction === directions[0]){

            const snakeLeft = await SnakeMovementService.moveTheSnakeLeft(boardSize, snakeId);
            const newGameBoardWithFoodAndSnakes = CreateGameBoard.createBoardWithFoodAndSnakes(gameBoardWithFood, snakeLeft);

            res.send(newGameBoardWithFoodAndSnakes);

        }else if (direction === directions[1]) {

            const snakeUp = await SnakeMovementService.moveTheSnakeUp(boardSize, snakeId);
            const newGameBoardWithFoodAndSnakes = CreateGameBoard.createBoardWithFoodAndSnakes(gameBoardWithFood, snakeUp);

            res.send(newGameBoardWithFoodAndSnakes);

        }else if (direction === directions[2]) {
                
            const snakeRight = await SnakeMovementService.moveTheSnakeRight(boardSize, snakeId);
            const newGameBoardWithFoodAndSnakes = CreateGameBoard.createBoardWithFoodAndSnakes(gameBoardWithFood, snakeRight);

            res.send(newGameBoardWithFoodAndSnakes);

        }else if (direction === directions[3]) {

            const snakeDown = await SnakeMovementService.moveTheSnakeDown(boardSize, snakeId);
            const newGameBoardWithFoodAndSnakes = CreateGameBoard.createBoardWithFoodAndSnakes(gameBoardWithFood, snakeDown);

            res.send(newGameBoardWithFoodAndSnakes);
        }

    }
}