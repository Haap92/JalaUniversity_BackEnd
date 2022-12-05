import "reflect-metadata";
import { SchoolInteface } from "./interface";
import { container } from "./inversify.config";
import { SCHOOL } from "./types";

const school = container.get<SchoolInteface>(SCHOOL)

console.log(school.getStudent())