import { HttpError } from "../middlewares/errorHandler";
import {  ObjectID, Db, MongoClient } from "mongodb";
import { GridFsStorage } from "multer-gridfs-storage";
import mongodb from "mongodb";
import multer from "multer";

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

const upload = multer({ storage: storage });

export { storage, upload };

export class GridFsService {
  private client: MongoClient;
  private db: Db;

  async getFileFromGridFS(filename: string) {
    this.client = await mongodb.MongoClient.connect("mongodb://0.0.0.0:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.db = this.client.db("file-uploader");
    const filesCollection = this.db.collection("fs.files");
    const chunksCollection = this.db.collection("fs.chunks");

    const file = await filesCollection.findOne({filename: filename});

    const chunks = await chunksCollection
      .find({ files_id: new ObjectID(file._id) })
      .sort({ n: 1 })
      .toArray();

    const fileBuffer = Buffer.concat(
      chunks.map((chunk: any) => Buffer.from(chunk.data.buffer))
    );
    if (fileBuffer) {
      return fileBuffer;
    } else {
      throw new HttpError(404, "File not found in GridFS");
    }
  }
}