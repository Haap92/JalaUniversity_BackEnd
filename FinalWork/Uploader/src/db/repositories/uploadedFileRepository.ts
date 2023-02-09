import { AppDataSource } from "../db-source";
import UploadedFile from "../entities/UploadedFile";

const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId

export class UploadedFileRepository {
  protected repository = AppDataSource.getMongoRepository(UploadedFile);

  async create(newUploadedFile: UploadedFile) {
    return await this.repository.save(newUploadedFile);
  }

  async read(id: string): Promise<UploadedFile> {
    const objectId = new ObjectId(id);
    const foundUploadedFile = await this.repository.findOneBy({
      _id: objectId,
    });

    if (foundUploadedFile) {
      return foundUploadedFile;
    } else {
      throw new Error(`Uploaded File with id:${id} not found`);
    }
  }

  async update(uploadedFile: UploadedFile) {
    return await this.repository.save(uploadedFile)
  }


  async delete(id: string) {
    const objectId = new ObjectId(id);
    const deletedUploadedFile = await this.repository.findOneAndDelete({
      _id: objectId,
    });

    if (deletedUploadedFile) {
      return deletedUploadedFile.value._id;
    } else {
      throw new Error(`Uploaded File with id:${id} not found`);
    }
  }
}
