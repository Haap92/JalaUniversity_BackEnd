import "dotenv/config";
import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 3006;

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send('Hello World');
  });

app.listen(PORT, () => console.log(`Stats listening on port ${PORT}`));