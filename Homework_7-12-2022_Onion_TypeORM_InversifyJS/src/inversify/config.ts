import { Container } from "inversify";
import UserDataService from "../db/db-services";
import UserRepository from "../repository/userRepository";
import UserService from "../services/userService";

const container = new Container();

container.bind<UserRepository>('UserService').to(UserService);
container.bind<UserRepository>('UserDataService').to(UserDataService);

export { container };