import "reflect-metadata";
import { DataSource } from "typeorm";
import User from "./dbEntities/user";

// export const AppDataSource = new DataSource ({
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "test",
//     password: "test",
//     database: "test",
//     synchronize: true,
//     logging: false,
//     entities: [User],
//     subscribers: [],
//     migrations: [],
// });

export const AppDataSource = new DataSource ({
    type: "sqlite",
    database: "databse.sqlite",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})