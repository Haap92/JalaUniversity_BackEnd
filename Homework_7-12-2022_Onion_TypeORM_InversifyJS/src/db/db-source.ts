import { DataSource } from "typeorm";
import DBUser from './db-user';

export const AppDataSource = new DataSource ({
    type: "sqlite",
    database: "databse.sqlite",
    synchronize: true,
    logging: false,
    entities: [DBUser],
    migrations: [],
    subscribers: [],
})