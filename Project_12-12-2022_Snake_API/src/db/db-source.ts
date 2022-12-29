import "reflect-metadata";
import { DataSource } from "typeorm";
import DBBoard from "./dbEntities/db-board";
import DBFood from "./dbEntities/db-Food";
import DBSnake from "./dbEntities/db-snake";
import DBGame from './dbEntities/db-game';

export const AppDataSource = new DataSource ({
    type: "mongodb",
    host: "127.0.0.1",
    port: 27017,
    database: "test",
    useUnifiedTopology: true,
    useNewUrlParser:true,
    synchronize: true,
    logging: ['query', 'error'],
    entities: [DBBoard, DBSnake, DBFood, DBGame],
    migrations: [],
    subscribers: [],
});