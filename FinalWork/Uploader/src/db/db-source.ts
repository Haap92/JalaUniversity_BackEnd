import "reflect-metadata";
import { DataSource } from "typeorm";
import User from "./dbEntities/user";

export const AppDataSource = new DataSource ({
    type: "mongodb",
    host: "127.0.0.1",
    port: 27017,
    database: "test",
    useUnifiedTopology: true,
    useNewUrlParser:true,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
});