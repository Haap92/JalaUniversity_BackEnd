import { AppDataSource } from "../config/db-source";
import UploadedFile from "../model/entities/UploadedFile";
import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError";
import { UploadedFileRepository } from "../model/repositories/uploadedFileRepository";
import { ObjectId } from "mongodb";

export default class UploadedFileService implements UploadedFileRepository {
  private readonly repository;
  constructor() {
    this.repository = AppDataSource.getMongoRepository(UploadedFile);
  }

  async create(uploadedFile: UploadedFile) {
    await this.repository.save(uploadedFile);
    return uploadedFile;
  }

  async read(id: string) {
    try {
      const objectId: ObjectId = new ObjectId(id);
      const uploadedFile = await this.repository.findOneBy({
        _id: objectId,
      });
      return uploadedFile;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        return new Error(`UploadedFile with id "${id}" not found`);
      }
      return error;
    }
  }

  async update(file: UploadedFile) {
    try {
      await this.repository.save(file);
    } catch (error) {
      return new Error(`Failed to update UploadedFile with id "${file.id}"`);
    }
  }

  async delete(id: string) {
    try {
      await this.repository.delete({ id });
    } catch (error) {
      return new Error(`Failed to delete UploadedFile with id "${id}"`);
    }
    return `UploadedFile with ${id} deleted`;
  }
}
