import "reflect-metadata";
import { AppDataSource } from "./db-source";
import User from "./user/db-user";
import Board from "./board/db-board";
import Snake from "./snake/db-snake";
import UserDataService from './user/db-user-services';
import BoardDataService from "./board/db-board-services";
import SnakeDataService from "./snake/db-snake-services";


class Test {
    async initializeDB(){
        await AppDataSource.initialize();

        const user = new User();
        user.name = 'John';        

        const userDataAccess = new UserDataService;
        await userDataAccess.create(user);

        console.log(await userDataAccess.read(1));

        const board = new Board();
        board.size = [[40],[40]];        

        const boardDataAccess = new BoardDataService;
        await boardDataAccess.create(board);

        console.log(await boardDataAccess.read(1));

        const snake = new Snake();
        snake.position = [[20],[20]];        

        const snakeDataAccess = new SnakeDataService;
        await snakeDataAccess.create(snake);

        console.log(await snakeDataAccess.read(1));



    }
}

new Test().initializeDB();