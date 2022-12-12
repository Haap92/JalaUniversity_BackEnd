import { Container } from "inversify";
import UserDataService from "../db/user/db-user-services";
import UserRepository from "../repository/userRepository";
import UserService from "../services/userService";
import BoardDataService from "../db/board/db-board-services";
import BoardRepository from "../repository/boardRepository";
import BoardService from "../services/boardService";
import SnakeDataService from "../db/snake/db-snake-services";
import SnakeRepository from "../repository/snakeRepository";
import SnakeService from "../services/snakeService";


const container = new Container();

container.bind<UserRepository>('UserService').to(UserService);
container.bind<UserRepository>('UserDataService').to(UserDataService);
container.bind<BoardRepository>('BoardService').to(BoardService);
container.bind<BoardRepository>('BoardDataService').to(BoardDataService);
container.bind<SnakeRepository>('BoardService').to(SnakeService);
container.bind<SnakeRepository>('BoardDataService').to(SnakeDataService);


export { container };