import "reflect-metadata";
import { DataSource } from "typeorm";
import GoogleDriveAccount from "./entities/googleDriveAccount";
import UploadedFile from "./entities/UploadedFile";


export const AppDataSource = new DataSource ({
    type: "mongodb",
    host: "127.0.0.1",
    port: 27017,
    database: "test",
    useUnifiedTopology: true,
    useNewUrlParser:true,
    synchronize: true,
    logging: false,
    entities: [GoogleDriveAccount, UploadedFile],
    migrations: [],
    subscribers: [],
});