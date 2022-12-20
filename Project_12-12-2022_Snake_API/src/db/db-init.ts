import "reflect-metadata";
import { AppDataSource } from "./db-source";
import User from "./dbEntities/db-user";
import Board from "./dbEntities/db-board";
import Snake from "./dbEntities/db-snake";
import UserDataService from './dbServices/db-user-services';
import BoardDataService from "./dbServices/db-board-services";
import SnakeDataService from "./dbServices/db-snake-services";
import Food from "../domain/entities/food";
import FoodDataService from "./dbServices/db-food-services";
import Game from "../domain/entities/game";
import GameDataService from "./dbServices/db-game-services";


class Test {
    async initializeDB(){
        await AppDataSource.initialize();

        const user = new User();
        user.name = 'John';        

        const userDataAccess = new UserDataService;
        await userDataAccess.create(user);

        console.log(await userDataAccess.read(1));

        const board = new Board();
        board.gridX = 40;
        board.gridY = 40;        

        const boardDataAccess = new BoardDataService;
        await boardDataAccess.create(board);

        console.log(await boardDataAccess.read(1));

        const snake = new Snake();
        snake.axisX = 20;
        snake.axisY = 20; 
        snake.direction = 'RIGHT';
        snake.length = 1;
        snake.name = 'Player';
        snake.score = 0;    

        const snakeDataAccess = new SnakeDataService;
        await snakeDataAccess.create(snake);

        const food = new Food();
        food.axisX = 5;
        food.axisY = 16; 

        const foodDataAccess = new FoodDataService;
        await foodDataAccess.create(food);

        const game = new Game();
        game.status = 'Ready to Play';
        game.speed = 1;

        const gameDataAccess = new GameDataService;
        await gameDataAccess.create(game);


        console.log(await gameDataAccess.read(1));



    }
}

new Test().initializeDB();