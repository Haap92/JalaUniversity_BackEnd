import { Router } from "express";
import { AppDataSource } from "../../db/db-source";
import createBoard from '../../factories/createBoard';
import { container } from "../../inversify/config";
import BoardRepository from "../../domain/repository/boardRepository";
import SnakeRepository from "../../domain/repository/snakeRepository";
import createSnake from "../../factories/createSnake";
//import BoardController from "../controllers/boardController";

export const routes = Router();

routes.get('/', (req, res) => {
    res.send('Welcome to my Snake Game');
});

//routes.get('/create/:size', BoardController.createBySize);

routes.get('/create/:size', (req, res) => {
    async function createTheBoard() {
        const input = parseFloat(req.params.size);
        const boardCreator = new createBoard();
        const board = boardCreator.createBoard(input);
        await AppDataSource.initialize();
        const newBoardCreator = container.get<BoardRepository>('BoardService');
        const newBoard = await newBoardCreator.create(board);
        res.send(newBoard);
        await AppDataSource.destroy()
    }
    createTheBoard();
});

routes.get('/snake', (req, res) => {
    async function createTheSnake() {
        const snakeCreator = new createSnake();
        const snake = snakeCreator.createSnake();
        await AppDataSource.initialize();
        const newSnakeCreator = container.get<SnakeRepository>('SnakeService');
        const newSnake = await newSnakeCreator.create(snake);
        res.send(newSnake);
        await AppDataSource.destroy()
    }
    createTheSnake();
})