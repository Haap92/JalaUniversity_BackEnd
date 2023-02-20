import "reflect-metadata";
import { DataSource } from "typeorm";
import DownloadFile from "./entities/downloadFile";
import DriveAccount from './entities/driveAccount';

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
    entities: [DownloadFile, DriveAccount],
    migrations: [],
    subscribers: [],
})