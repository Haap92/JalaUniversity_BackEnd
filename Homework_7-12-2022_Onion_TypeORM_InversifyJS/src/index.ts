import "reflect-metadata";
import { container } from "./inversify/config";
import UserRepository from "./repository/userRepository";

const users = container.get<UserRepository>('UserService');

console.log(users.read(1));