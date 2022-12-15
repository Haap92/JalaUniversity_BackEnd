import { Router } from "express";
import GameController from "../controllers/gameControler";
import BoardController from "../controllers/boardController";
import SnakeController from "../controllers/snakeController";


export const routes = Router();

routes.get('/', GameController.welcome);
routes.get('/create/board/:size', BoardController.createBySize);
routes.get('/create/snake/:size', SnakeController.createRandomSnake);
routes.get('/moveSnake/:id/Left', SnakeController.moveTheCreatedSnakeLeft);
routes.get('/moveSnake/:id/Up', SnakeController.moveTheCreatedSnakeUp);
routes.get('/moveSnake/:id/Right', SnakeController.moveTheCreatedSnakeRight);
routes.get('/moveSnake/:id/Down', SnakeController.moveTheCreatedSnakeDown);
routes.get('/board/:size', BoardController.printBoard);