import { AppDataSource } from "../db-source";
import UploadedFile from "../entities/UploadedFile";
import { ObjectId } from "mongodb";

export class UploadedFileRepository {
  protected repository = AppDataSource.getMongoRepository(UploadedFile);

  async create(newUploadedFile: UploadedFile) {
    return await this.repository.save(newUploadedFile);
  }

  async read(id: string): Promise<UploadedFile> {
    const objectId: ObjectId = new ObjectId(id);
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
    const { id } = uploadedFile;
    const objectId = new ObjectId(id);
  
    const updateResult = await this.repository.updateOne(
      { _id: objectId },
      { $set: uploadedFile }
    );
  
    if (updateResult.result.n === 0) {
      throw new Error(`Uploaded File with id:${id} not found`);
    }
  }


  async delete(id: string) {
    const objectId: ObjectId = new ObjectId(id);
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
