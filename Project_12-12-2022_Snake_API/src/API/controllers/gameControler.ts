import { Request, Response } from "express";
import CreateGameBoard from '../../services/factories/createGameBoard';
import GameRepository from "../../domain/repository/gameRepository";
import { directions } from "../../services/factories/snakeDirectionConstant";
import SnakeMovementService from "../../services/factories/snakeMovementService";
import CreateGameService from '../../services/factories/createGameService';
import { container } from "../../inversify/config";
import SnakeRepository from "../../domain/repository/snakeRepository";
import FoodRepository from "../../domain/repository/foodRepository";
import SnakeEatsFood from '../../services/factories/snakeEatsFood';


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
        const snakeId = parseFloat(req.params.id);
        const gameId = parseFloat(req.params.game);
        const foodId = parseFloat(req.params.food);
        const { direction } = req.body;
        const gameStatus = 'Playing';
        const gameSpeed = 1;

        const newReadFood = container.get<FoodRepository>('FoodService');
        const food = await newReadFood.read(foodId);

        console.log(food);
        

        const newReadSnake = container.get<SnakeRepository>('SnakeService');
        const snake = await newReadSnake.read(snakeId);

        console.log(snake);
        

        const newReadGame = container.get<GameRepository>('GameService');
        const game = await newReadGame.read(gameId);

        game.status = gameStatus;
        game.speed = gameSpeed;
        await newReadGame.update(game);

        const gameBoardWithFood = JSON.parse(game.gameBoard);

        if (direction === directions[0]){

            const snakeAte = await SnakeEatsFood.didSnakeAteFood(snakeId, foodId);

            const snakeLeft = await SnakeMovementService.moveTheSnakeLeft(boardSize, snakeId);
            const newGameBoardWithFoodAndSnakes = CreateGameBoard.createBoardWithFoodAndSnakes(gameBoardWithFood, snakeLeft);
            if(snakeAte == true) {
                await CreateGameService.updateTheBoard(gameId, boardSize, foodId);            
            }
            res.send(newGameBoardWithFoodAndSnakes);
            

        }else if (direction === directions[1]) {

            const snakeAte = await SnakeEatsFood.didSnakeAteFood(snakeId, foodId);
            
            const snakeUp = await SnakeMovementService.moveTheSnakeUp(boardSize, snakeId);
            const newGameBoardWithFoodAndSnakes = CreateGameBoard.createBoardWithFoodAndSnakes(gameBoardWithFood, snakeUp);
            if(snakeAte == true) {
                await CreateGameService.updateTheBoard(gameId, boardSize, foodId);            
            }
            res.send(newGameBoardWithFoodAndSnakes);
            
        }else if (direction === directions[2]) {

            const snakeAte = await SnakeEatsFood.didSnakeAteFood(snakeId, foodId);
 
            const snakeRight = await SnakeMovementService.moveTheSnakeRight(boardSize, snakeId);
            const newGameBoardWithFoodAndSnakes = CreateGameBoard.createBoardWithFoodAndSnakes(gameBoardWithFood, snakeRight);
            if(snakeAte == true) {
                await CreateGameService.updateTheBoard(gameId, boardSize, foodId);            
            }
            res.send(newGameBoardWithFoodAndSnakes);
            
        }else if (direction === directions[3]) {

            const snakeAte = await SnakeEatsFood.didSnakeAteFood(snakeId, foodId);

            const snakeDown = await SnakeMovementService.moveTheSnakeDown(boardSize, snakeId);
            const newGameBoardWithFoodAndSnakes = CreateGameBoard.createBoardWithFoodAndSnakes(gameBoardWithFood, snakeDown);
            if(snakeAte == true) {
                await CreateGameService.updateTheBoard(gameId, boardSize, foodId);            
            }
            res.send(newGameBoardWithFoodAndSnakes);
            
        }

    }
}