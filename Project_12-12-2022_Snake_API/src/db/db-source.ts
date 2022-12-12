import { DataSource } from "typeorm";
import DBBoard from "./board/db-board";
import DBSnake from "./snake/db-snake";
import DBUser from './user/db-user';

export const AppDataSource = new DataSource ({
    type: "sqlite",
    database: "databse.sqlite",
    synchronize: true,
    logging: false,
    entities: [DBUser, DBBoard, DBSnake],
    migrations: [],
    subscribers: [],
})