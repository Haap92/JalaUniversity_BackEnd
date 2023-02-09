import UploadedFile from "../db/entities/UploadedFile";
import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError";
import { UploadedFileRepository } from "../db/repositories/uploadedFileRepository";
import { UploadedFileValues } from "../types";

export default class UploadedFileService {
  protected uploadedFileRepository: UploadedFileRepository;
  constructor() {
    this.uploadedFileRepository = new UploadedFileRepository();
  }

  async create(uploadedFileValues: UploadedFileValues) {
    const uploadedFile = new UploadedFile();
    uploadedFile.name = uploadedFileValues.name;
    uploadedFile.size = uploadedFileValues.size;
    uploadedFile.driveId = uploadedFileValues.driveId;
    uploadedFile.status = uploadedFileValues.status;
    await this.uploadedFileRepository.create(uploadedFile);
    return uploadedFile;
  }

  async read(id: string) {
    try {
      const uploadedFile = await this.uploadedFileRepository.read(id);
      return uploadedFile;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        return new Error(`UploadedFile with id "${id}" not found`);
      }
      return error;
    }
  }

  async update(id: string, updateUploadedFile: UploadedFileValues) {
    try{
      const readedUploadedFile = await this.read(id);

      readedUploadedFile.name =
        updateUploadedFile.name === ""
          ? readedUploadedFile.name
          : updateUploadedFile.name;
      readedUploadedFile.size =
        updateUploadedFile.size === null
          ? readedUploadedFile.size
          : updateUploadedFile.size;
      readedUploadedFile.driveId =
        updateUploadedFile.driveId === ""
          ? readedUploadedFile.driveId
          : updateUploadedFile.driveId;
      readedUploadedFile.status =
        updateUploadedFile.status === ""
          ? readedUploadedFile.status
          : updateUploadedFile.status;
      return await this.uploadedFileRepository.update(readedUploadedFile);
    } catch (error) {
      return new Error(`Failed to update Google Drive Account with id "${id}"`);
    }
  }

  async delete(id: string) {
    return await this.uploadedFileRepository.delete(id);
  }
}
