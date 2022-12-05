import { Container } from "inversify";
import { School, Student } from "./school";
import { SCHOOL, USER } from "./types";

const container = new Container();
container.bind(USER).to(Student);
container.bind(SCHOOL).to(School);

export { container }