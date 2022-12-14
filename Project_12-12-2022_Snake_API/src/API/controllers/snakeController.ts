import { Request, Response } from "express";
import { SnakeRepository } from "../../domain/repository/SnakeRepository";
import createSnake from "../../services/factories/createSnake";
import { container } from "../../inversify/config";
import SnakeMovementService from "../../services/snakeMovementService";
import { directions } from '../../services/factories/snakeDirectionConstant';


export default class SnakeController {

    static createRandomSnake(req: Request, res:Response) {

        async function createTheSnake() {

            const size = parseFloat(req.params.size);

            const snakeCreator = new createSnake();
            const snake = snakeCreator.createSnake(size);
            const newSnakeCreator = container.get<SnakeRepository>('SnakeService');
            const newSnake = await newSnakeCreator.create(snake);

            res.send(newSnake);
        }
        createTheSnake();
    }

    static async moveTheCreatedSnakeLeft(req: Request, res:Response) {

            const boardSize = parseFloat(req.params.size);
            const snakeId = parseFloat(req.params.id);

            const snakeLeft = SnakeMovementService.moveTheSnakeLeft(boardSize, snakeId);
            res.send(await snakeLeft);
    }

    static async moveTheCreatedSnakeUp(req: Request, res:Response) {

            const boardSize = parseFloat(req.params.size);
            const snakeId = parseFloat(req.params.id);

            const snakeUp = SnakeMovementService.moveTheSnakeUp(boardSize, snakeId);
            res.send (await snakeUp);

    }

    static async moveTheCreatedSnakeRight(req: Request, res:Response) {

            const boardSize = parseFloat(req.params.size);
            const snakeId = parseFloat(req.params.id);

            const snakeRight = SnakeMovementService.moveTheSnakeRight(boardSize, snakeId);
            res.send (await snakeRight);
    }

    static async moveTheCreatedSnakeDown(req: Request, res:Response) {
        
            const boardSize = parseFloat(req.params.size);
            const snakeId = parseFloat(req.params.id);
            
            const snakeDown = SnakeMovementService.moveTheSnakeDown(boardSize, snakeId);
            res.send(await snakeDown);
    }

    static async moveTheSnakeByBody(req: Request, res:Response) {

        const { direction, boardSize, snakeId } = req.body;

        if (direction === directions[0]){
                const snakeLeft = SnakeMovementService.moveTheSnakeLeft(boardSize, snakeId);
                res.send(await snakeLeft);
        }else if (direction === directions[1]) {
                const snakeUp = SnakeMovementService.moveTheSnakeUp(boardSize, snakeId);
                res.send(await snakeUp);
        }else if (direction === directions[2]) {
                const snakeRight = SnakeMovementService.moveTheSnakeRight(boardSize, snakeId);
                res.send(await snakeRight);
        }else if (direction === directions[3]) {
                const snakeDown = SnakeMovementService.moveTheSnakeDown(boardSize, snakeId);
                res.send(await snakeDown);
        }
    }
}