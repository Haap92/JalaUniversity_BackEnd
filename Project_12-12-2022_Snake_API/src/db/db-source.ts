import { DataSource } from "typeorm";
import DBBoard from "./dbEntities/db-board";
import DBFood from "./dbEntities/db-Food";
import DBSnake from "./dbEntities/db-snake";
import DBUser from './dbEntities/db-user';
import DBGame from './dbEntities/db-game';
import DBSnakeBody from "./dbEntities/db-snake-body";

export const AppDataSource = new DataSource ({
    type: "sqlite",
    database: "databse.sqlite",
    synchronize: true,
    logging: false,
    entities: [DBUser, DBBoard, DBSnake, DBFood, DBSnakeBody, DBGame],
    migrations: [],
    subscribers: [],
});