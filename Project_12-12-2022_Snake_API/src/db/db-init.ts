import "reflect-metadata";
import { AppDataSource } from "./db-source";
import Board from "./dbEntities/db-board";
import Snake from "./dbEntities/db-snake";
import BoardDataService from "./dbServices/db-board-services";
import SnakeDataService from "./dbServices/db-snake-services";
import Food from "../domain/entities/food";
import FoodDataService from "./dbServices/db-food-services";
import Game from "../domain/entities/game";
import GameDataService from "./dbServices/db-game-services";


class Test {
    async initializeDB(){
        await AppDataSource.initialize();

        const board = new Board();
        board.gridX = 10;
        board.gridY = 10;        

        const boardDataAccess = new BoardDataService;
        await boardDataAccess.create(board);

        console.log(await boardDataAccess.read(1));

        const snake = new Snake();
        snake.axisX = 10;
        snake.axisY = 10; 
        snake.direction = 'RIGHT';
        snake.length = 1;
        snake.body = '[]';
        snake.name = 'Player';
        snake.score = 0;    

        const snakeDataAccess = new SnakeDataService;
        await snakeDataAccess.create(snake);

        const food = new Food();
        food.axisX = 5;
        food.axisY = 7; 

        const foodDataAccess = new FoodDataService;
        await foodDataAccess.create(food);

        const game = new Game();
        game.status = 'Ready to Play';
        game.speed = 1;
        game.gameBoard = ' ';

        const gameDataAccess = new GameDataService;
        await gameDataAccess.create(game);


        console.log(await gameDataAccess.read(1));



    }
}

new Test().initializeDB();