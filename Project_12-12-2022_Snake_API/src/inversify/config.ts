import "reflect-metadata"
import { Container } from "inversify";
import UserDataService from "../db/dbServices/db-user-services";
import UserRepository from "../domain/repository/userRepository";
import UserService from "../services/userService";
import BoardDataService from "../db/dbServices/db-board-services";
import BoardRepository from "../domain/repository/boardRepository";
import BoardService from "../services/boardService";
import SnakeDataService from "../db/dbServices/db-snake-services";
import SnakeRepository from "../domain/repository/snakeRepository";
import SnakeService from "../services/snakeService";


const container = new Container();

container.bind<UserRepository>('UserService').to(UserService);
container.bind<UserRepository>('UserDataService').to(UserDataService);
container.bind<BoardRepository>('BoardService').to(BoardService);
container.bind<BoardRepository>('BoardDataService').to(BoardDataService);
container.bind<SnakeRepository>('SnakeService').to(SnakeService);
container.bind<SnakeRepository>('SnakeDataService').to(SnakeDataService);


export { container };