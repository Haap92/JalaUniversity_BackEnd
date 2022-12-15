import { DataSource } from "typeorm";
import DBBoard from "./dbEntities/db-board";
import DBFood from "./dbEntities/db-Food";
import DBSnake from "./dbEntities/db-snake";
import DBUser from './dbEntities/db-user';

export const AppDataSource = new DataSource ({
    type: "sqlite",
    database: "databse.sqlite",
    synchronize: true,
    logging: false,
    entities: [DBUser, DBBoard, DBSnake, DBFood],
    migrations: [],
    subscribers: [],
})