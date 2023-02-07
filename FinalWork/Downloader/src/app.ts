import "dotenv/config";
import express from "express";
import cors from "cors";
import { AppDataSource } from './db/db-source';
import User from "./db/dbEntities/user";

const PORT = process.env.PORT || 3004;

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send('Hello World');
});

AppDataSource.initialize().then(async () => {
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await AppDataSource.manager.save(user);
    console.log("Saved a new user with id: " + user.id);
    console.log("Loading users from the database...");
  
    const users = await AppDataSource.manager.find(User);
    console.log("Loaded users: ", users);
    app.get("/users", (req, res) => {
      res.send(users);
    });
  });

app.listen(PORT, () => console.log(`Downloader listening on port ${PORT}`));