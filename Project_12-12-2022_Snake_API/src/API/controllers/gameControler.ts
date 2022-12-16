import { Request, Response } from "express";
import createBoard from "../../services/factories/createBoard";
import createFood from "../../services/factories/createFood";
import createSnake from "../../services/factories/createSnake";

export default class GameController {
    
    static welcome(req: Request, res: Response){
        res.send("Welcome to my Snake Game")
    }

    static startGame(req: Request, res: Response){
        const game = []
        const boardSize = parseFloat(req.params.size);
        const boardCreator = new createBoard();
        const board = boardCreator.createBoard(boardSize);
        const snakeCreator = new createSnake();
        const snake = snakeCreator.createSnake(boardSize);
        const foodCreator = new createFood();
        const food = foodCreator.createFood(boardSize);
        game.push(board, snake, food)
        res.send(game)
    }
}