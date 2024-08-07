import "dotenv/config";
import express from "express";
import cors from "cors";
import { AppDataSource } from './db/db-source';
import bodyParser from "body-parser";
import routes from "./api/routes/routes";
import { errorHandler } from "./middlewares/errorHandler";
import { receiveFromUploader } from "./services/messageQeueService";
import DailyUpdateService from "./services/dailyUpdateService";


const dailyUpdateService = new DailyUpdateService()
const PORT = process.env.PORT || 3004;

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.use(errorHandler);

dailyUpdateService.setScheduleUpdate()

receiveFromUploader();

AppDataSource.initialize();

app.listen(PORT, () => console.log(`Downloader listening on port ${PORT}`));