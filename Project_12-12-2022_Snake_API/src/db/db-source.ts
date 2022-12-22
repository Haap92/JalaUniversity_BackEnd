import { DataSource } from "typeorm";
import DBBoard from "./dbEntities/db-board";
import DBFood from "./dbEntities/db-Food";
import DBSnake from "./dbEntities/db-snake";
import DBGame from './dbEntities/db-game';

export const AppDataSource = new DataSource ({
    type: "sqlite",
    database: "databse.sqlite",
    synchronize: true,
    logging: false,
    entities: [DBBoard, DBSnake, DBFood, DBGame],
    migrations: [],
    subscribers: [],
});