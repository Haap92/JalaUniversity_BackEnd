import "reflect-metadata";
import { container } from "./inversify/config";
import UserRepository from "./domain/repository/userRepository";
import BoardRepository from './domain/repository/snakeRepository';
import SnakeRepository from './domain/repository/snakeRepository';
import { AppDataSource } from "./db/db-source";
import BoardDataService from "./db/dbServices/db-board-services";
import SnakeDataService from "./db/dbServices/db-snake-services";
import UserDataService from "./db/dbServices/db-user-services";
import Board from "./domain/entities/board";
import Snake from "./domain/entities/snake";
import User from "./domain/entities/user";

const users = container.get<UserRepository>('UserService');
const boards = container.get<BoardRepository>('BoardService');
const snakes = container.get<SnakeRepository>('SnakeService');


class Test {
    async initializeDB(){
        await AppDataSource.initialize();

        const user = new User();
        user.name = 'John';        

        const userDataAccess = new UserDataService;
        await userDataAccess.create(user);


        const board = new Board();
        board.gridX = 40;
        board.gridY = 40;        

        const boardDataAccess = new BoardDataService;
        await boardDataAccess.create(board);

        const snake = new Snake();
        snake.axisX = 20;
        snake.axisY = 20;       

        const snakeDataAccess = new SnakeDataService;
        await snakeDataAccess.create(snake);

        console.log(await users.read(2));
        console.log(await boards.read(2));
        console.log(await snakes.read(2));

    }
}

new Test().initializeDB();
