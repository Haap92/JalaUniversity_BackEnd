import { Request, Response } from "express";
import CreateGameBoard from '../../services/factories/createGameBoard';
import { GameRepository } from "../../domain/repository/gameRepository";
import { directions } from "../../services/factories/snakeDirectionConstant";
import SnakeMovementService from "../../services/snakeMovementService";
import CreateGameService from '../../services/createGameService';
import { container } from "../../inversify/config";
import SnakeEatsAndCollisionService from '../../services/snakeEatsAndCollisionService';
import SnakeAutoMovementService from '../../services/snakeAutoMovementService';


export default class GameController {
    
    static welcome(req: Request, res: Response){
        res.send("Welcome to my Snake Game");
    }

    static async prepareGame(req: Request, res: Response){

        const boardSize = parseFloat(req.params.size);
        const newGame = await CreateGameService.prepareGame(boardSize);

        res.send(newGame);

    }
    static async resetGame(req: Request, res: Response){

        const boardSize = parseFloat(req.params.size);
        const snakeId = parseFloat(req.params.id);
        const gameId = parseFloat(req.params.game);
        const foodId = parseFloat(req.params.food);
        const resetGame = await CreateGameService.resetTheGame(gameId, snakeId, foodId, boardSize);

        res.send(resetGame);

    }


    static async startGame(req: Request, res: Response){

        const boardSize = parseFloat(req.params.size);
        const snakeId = parseFloat(req.params.id);
        const gameId = parseFloat(req.params.game);
        const foodId = parseFloat(req.params.food);
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

            const snakeAte = await SnakeEatsAndCollisionService.didSnakeAteFood(snakeId, foodId, boardSize);

            const snakeLeft = await SnakeMovementService.moveTheSnakeLeft(boardSize, snakeId);
            const newGameBoardWithFoodAndSnakes = CreateGameBoard.createBoardWithFoodAndSnakes(gameBoardWithFood, snakeLeft);
            if(snakeAte) {
                await CreateGameService.updateTheBoard(gameId, boardSize, foodId);
                await SnakeEatsAndCollisionService.snakeEats(snakeId);           
            }
            res.send(newGameBoardWithFoodAndSnakes);
            

        }else if (direction === directions[1]) {

            const snakeAte = await SnakeEatsAndCollisionService.didSnakeAteFood(snakeId, foodId, boardSize);
            
            const snakeUp = await SnakeMovementService.moveTheSnakeUp(boardSize, snakeId);
            const newGameBoardWithFoodAndSnakes = CreateGameBoard.createBoardWithFoodAndSnakes(gameBoardWithFood, snakeUp);
            if(snakeAte == true) {
                await CreateGameService.updateTheBoard(gameId, boardSize, foodId);
                await SnakeEatsAndCollisionService.snakeEats(snakeId);              
            }
            res.send(newGameBoardWithFoodAndSnakes);
            
        }else if (direction === directions[2]) {

            const snakeAte = await SnakeEatsAndCollisionService.didSnakeAteFood(snakeId, foodId, boardSize);
 
            const snakeRight = await SnakeMovementService.moveTheSnakeRight(boardSize, snakeId);
            const newGameBoardWithFoodAndSnakes = CreateGameBoard.createBoardWithFoodAndSnakes(gameBoardWithFood, snakeRight);
            if(snakeAte == true) {
                await CreateGameService.updateTheBoard(gameId, boardSize, foodId); 
                await SnakeEatsAndCollisionService.snakeEats(snakeId);             
            }
            res.send(newGameBoardWithFoodAndSnakes);
            
        }else if (direction === directions[3]) {

            const snakeAte = await SnakeEatsAndCollisionService.didSnakeAteFood(snakeId, foodId, boardSize);

            const snakeDown = await SnakeMovementService.moveTheSnakeDown(boardSize, snakeId);
            const newGameBoardWithFoodAndSnakes = CreateGameBoard.createBoardWithFoodAndSnakes(gameBoardWithFood, snakeDown);
            if(snakeAte == true) {
                await CreateGameService.updateTheBoard(gameId, boardSize, foodId); 
                await SnakeEatsAndCollisionService.snakeEats(snakeId);  
            }
            res.send(newGameBoardWithFoodAndSnakes);
            
        }
        
    }
    
    static async autoMovement (req:Request, res:Response){

        const boardSize = parseFloat(req.params.size);
        const snakeId = parseFloat(req.params.id);
        const gameId = parseFloat(req.params.game);
        const foodId = parseFloat(req.params.food);
        const game = await SnakeAutoMovementService.runGameInLoop(gameId, snakeId, foodId, boardSize);
        res.send(game);
    }
}
