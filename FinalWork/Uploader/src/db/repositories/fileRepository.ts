import { AppDataSource } from "../db-source";
import File from "../entities/File";

const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

export class FileRepository {
  protected repository = AppDataSource.getMongoRepository(File);

  async create(newFile: File) {
    return await this.repository.save(newFile);
  }

  async read(id: string): Promise<File> {
    const objectId = new ObjectId(id);
    const foundFile = await this.repository.findOneBy({
      _id: objectId,
    });

    if (foundFile) {
      return foundFile;
    } else {
      throw new Error(`Uploaded File with id:${id} not found`);
    }
  }

  async readByAccountId(accountId: string) {
    const files = await this.repository.find({
      where: {
        accountId: accountId,
      },
    });
    
    return files;
  }

  async readAll() {
    let files = await this.repository.find();
    return files ? files.map((file) => file as File) : undefined;
  }

  async update(file: File) {
    return await this.repository.save(file);
  }

  async delete(id: string) {
    const objectId = new ObjectId(id);
    const deletedFile = await this.repository.findOneAndDelete({
      _id: objectId,
    });

    if (deletedFile) {
      return deletedFile.value._id;
    } else {
      throw new Error(`Uploaded File with id:${id} not found`);
    }
  }
}
