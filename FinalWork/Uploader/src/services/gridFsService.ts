import { NextFunction, Response, Request } from 'express';
import { HttpError } from "../middlewares/errorHandler";
import { Collection, Db, MongoClient } from "mongodb";
import { GridFsStorage } from "multer-gridfs-storage";
import FileController from "../api/controllers/fileController";
import multer from "multer";
import fs from "fs";

const diskStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/");
  },
  filename: function (req, file, callback) {
    const date = new Date();
    callback(null, `${date.getTime()}_${file.originalname}`);
  },
});

const storage = new GridFsStorage({
  url: "mongodb://0.0.0.0:27017/file-uploader",
  options: { useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve) => {
      const filename = `${new Date().getTime()}_${file.originalname}`;
      resolve(filename);
    });
  },
});

const upload = multer({ storage: diskStorage });

function handleFileUpload(req: Request, res: Response, next: NextFunction) {
  const { file } = req;
  const stream = fs.createReadStream(file.path);
  storage
    .fromStream(stream, req, file)
    .then(() => {
      FileController.create(req, res, next);
    })
    .catch((error) => {
      throw new HttpError(500, "Files upload failed");
    });
}

export { diskStorage, storage, upload, handleFileUpload };

export class GridFsService {
  private client: MongoClient;
  private db: Db;
  private collection: Collection;
  private chunks: Collection;

  constructor() {
    this.startDb();
  }

  async startDb() {
    this.client = new MongoClient("mongodb://0.0.0.0:27017/");
    await this.client.connect((err) => {
      if (err) {
        throw new HttpError(500, "Mongo connection error");
      }
    });
  
    if (!this.client.isConnected()) {
      throw new HttpError(500, "MongoDB client is not connected");
    }
  
    this.db = this.client.db("file-uploader");
    this.collection = this.db.collection("fs.files");
    this.chunks = this.db.collection("fs.chunks");
  }

  async getFile(fileName: string) {
    let r = this.collection.find({ filename: fileName }).toArray(function (err, docs) {
        if (err) {
          throw new HttpError(500, "Mongodb error");
        }
        if (!docs || docs.length === 0) {
          throw new HttpError(400, "File not found on mongodb");
        } else {
          let res = this.getFileContent(docs);
        }
      });
  }

  async getFileContent(docs: any[]) {
    let res = this.chunks
      .find({ files_id: docs[0]._id })
      .sort({ n: 1 })
      .toArray(function (err, chunks) {
        if (err) {
          throw new HttpError(
            500,
            "Downlaod error. Error retrieving file content"
          );
        }
        if (!chunks || chunks.length === 0) {
          throw new HttpError(500, "File content not found");
        }

        let fileData = [];
        for (let i = 0; i < chunks.length; i++) {
          fileData.push(chunks[i].data.toString("base64"));
        }
        let finalFile = "data:" + docs[0].contentType + ";base64," + fileData.join("");
        return finalFile;
      });
    return res;
  }
}