import { Router } from "express";
import GameController from "../controllers/gameControler";
import BoardController from "../controllers/boardController";
import SnakeController from "../controllers/snakeController";
import SnakeEatsController from "../controllers/snakeEatsController";


export const routes = Router();

routes.get('/', GameController.welcome);
routes.get('/create/board/:size', BoardController.createBySize);
routes.get('/board/:size', BoardController.printBoard);
routes.get('/create/snake/:size', SnakeController.createRandomSnake);
routes.get('/board/:size/moveSnake/:id/Left', SnakeController.moveTheCreatedSnakeLeft);
routes.get('/board/:size/moveSnake/:id/Up', SnakeController.moveTheCreatedSnakeUp);
routes.get('/board/:size/moveSnake/:id/Right', SnakeController.moveTheCreatedSnakeRight);
routes.get('/board/:size/moveSnake/:id/Down', SnakeController.moveTheCreatedSnakeDown);
routes.get('/moveSnake', SnakeController.moveTheSnakeByBody);

routes.get('/game/:size', GameController.prepareGame);

routes.get('/snakeEatsLeft', SnakeEatsController.snakeAteLeft);
