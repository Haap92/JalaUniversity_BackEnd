import { Container } from "inversify";
import { UserService } from "../services/userService";
import { USER } from "../types/types";

const container = new Container();
container.bind(USER).to(UserService);

export { container };