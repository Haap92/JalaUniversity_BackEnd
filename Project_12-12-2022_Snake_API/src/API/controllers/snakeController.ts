import { Request, Response } from "express";
import { AppDataSource } from "../../db/db-source";
import SnakeRepository from "../../domain/repository/SnakeRepository";
import createSnake from "../../services/factories/createSnake";
import { container } from "../../inversify/config";
import { directions } from "../../services/factories/snakeDirectionConstant";

export default class SnakeController {

    static createRandomSnake(req: Request, res:Response) {
        async function createTheSnake() {
            const boardSize = parseFloat(req.params.size);
            const snakeCreator = new createSnake();
            const snake = snakeCreator.createSnake(boardSize);
            await AppDataSource.initialize();
            const newSnakeCreator = container.get<SnakeRepository>('SnakeService');
            const newSnake = await newSnakeCreator.create(snake);
            res.send(newSnake);
            await AppDataSource.destroy()
        }
        createTheSnake();
    }

    static moveTheCreatedSnakeLeft(req: Request, res:Response) {
        async function moveTheSnakeLeft() {
            const snakeId = parseFloat(req.params.id)
            const snakeMovingLeft = directions[0];
            await AppDataSource.initialize();
            const updateSnakeDirection = container.get<SnakeRepository>('SnakeService');
            const updatedSnake = await updateSnakeDirection.read(snakeId)
            updatedSnake.axisX--
            updatedSnake.direction = snakeMovingLeft
            await updateSnakeDirection.update(updatedSnake)
            res.send(updatedSnake)
            await AppDataSource.destroy()
        }
        moveTheSnakeLeft()
    }

    static moveTheCreatedSnakeUp(req: Request, res:Response) {
        async function moveTheSnakeUp() {
            const snakeId = parseFloat(req.params.id)
            const snakeMovingUp = directions[1];
            await AppDataSource.initialize();
            const updateSnakeDirection = container.get<SnakeRepository>('SnakeService');
            const updatedSnake = await updateSnakeDirection.read(snakeId)
            updatedSnake.axisY++
            updatedSnake.direction = snakeMovingUp
            await updateSnakeDirection.update(updatedSnake)
            res.send(updatedSnake)
            await AppDataSource.destroy()
        }
        moveTheSnakeUp()
    }

    static moveTheCreatedSnakeRight(req: Request, res:Response) {
        async function moveTheSnakeRight() {
            const snakeId = parseFloat(req.params.id)
            const snakeMovingRight = directions[2];
            await AppDataSource.initialize();
            const updateSnakeDirection = container.get<SnakeRepository>('SnakeService');
            const updatedSnake = await updateSnakeDirection.read(snakeId)
            updatedSnake.axisX++
            updatedSnake.direction = snakeMovingRight
            await updateSnakeDirection.update(updatedSnake)
            res.send(updatedSnake)
            await AppDataSource.destroy()
        }
        moveTheSnakeRight()
    }

    static moveTheCreatedSnakeDown(req: Request, res:Response) {
        async function moveTheSnakeDown() {
            const snakeId = parseFloat(req.params.id)
            const snakeMovingDown = directions[3];
            await AppDataSource.initialize();
            const updateSnakeDirection = container.get<SnakeRepository>('SnakeService');
            const updatedSnake = await updateSnakeDirection.read(snakeId)
            updatedSnake.axisY--
            updatedSnake.direction = snakeMovingDown
            await updateSnakeDirection.update(updatedSnake)
            res.send(updatedSnake)
            await AppDataSource.destroy()
        }
        moveTheSnakeDown()
    }
}
