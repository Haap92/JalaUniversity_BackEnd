import "reflect-metadata";
import "dotenv/config";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./db/db-source";
import routes from "./api/routes/routes";
import bodyParser from "body-parser";
import { errorHandler } from './middlewares/errorHandler';
import { receiveToUpload } from "./services/messageQeueService";

const PORT = process.env.PORT || 3002;

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.use(errorHandler);

receiveToUpload()

AppDataSource.initialize()

app.listen(PORT, () => console.log(`Uploader listening on port ${PORT}`));
