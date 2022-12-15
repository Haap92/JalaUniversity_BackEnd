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
        snake.direction = 'RIGHT'      

        const snakeDataAccess = new SnakeDataService;
        await snakeDataAccess.create(snake);

        const food = new Food();
        food.axisX = 5;
        food.axisY = 16; 

        const foodDataAccess = new FoodDataService;
        await foodDataAccess.create(food);


        console.log(await foodDataAccess.read(1));



    }
}

new Test().initializeDB();