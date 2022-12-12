import "reflect-metadata";
import { container } from "./inversify/config";
import UserRepository from "./repository/userRepository";
import BoardRepository from './repository/snakeRepository';
import SnakeRepository from './repository/snakeRepository';

const users = container.get<UserRepository>('UserService');
const board = container.get<BoardRepository>('BoardService');
const snake = container.get<SnakeRepository>('SnakeService');

console.log(users.read(1));
console.log(board.read(1));
console.log(snake.read(1));