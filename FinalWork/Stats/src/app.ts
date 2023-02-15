import "dotenv/config";
import express from "express";
import cors from "cors";
import { statusListener } from './services/messageQeueService';

const PORT = process.env.PORT || 3006;

const app = express();
app.use(cors());

statusListener();

app.listen(PORT, () => console.log(`Stats listening on port ${PORT}`));