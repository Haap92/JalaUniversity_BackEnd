import "reflect-metadata";
import { container } from "./inversify/config";
import { UserRepository } from "./repository/userRepository";
import { USER } from "./types/types";

const users = container.get<UserRepository>(USER);

console.log(users.read(1));


