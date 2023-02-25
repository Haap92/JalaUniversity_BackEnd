import "reflect-metadata";
import { DataSource } from "typeorm";
import DownloadFile from "./entities/downloadFile";
import DriveAccount from './entities/driveAccount';
import FileReport from "./entities/fileReport";

export const AppDataSource = new DataSource ({
    type: "sqlite",
    database: "databse.sqlite",
    synchronize: true,
    logging: false,
    entities: [DownloadFile, DriveAccount, FileReport],
    migrations: [],
    subscribers: [],
})