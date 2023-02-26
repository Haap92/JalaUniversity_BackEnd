import DriveFile from "../db/entities/driveFile";
import { DriveFileRepository } from "../db/repositories/driveFileRepository";
import { HttpError } from "../middlewares/errorHandler";
import { DownloadFileValues } from "../types";

export default class DriveFileService {
  protected driveFileRepository: DriveFileRepository;
  constructor() {
    this.driveFileRepository = new DriveFileRepository();
  }

  async create(newDriveFileValues: DownloadFileValues) {
    try {
      const newDriveFile = new DriveFile();
      newDriveFile.uploaderId = newDriveFileValues.uploaderId;
      newDriveFile.driveId = newDriveFileValues.driveId;
      newDriveFile.name = newDriveFileValues.name;
      newDriveFile.webViewLink = newDriveFileValues.webViewLink;
      newDriveFile.webContentLink = newDriveFileValues.webContentLink;
      newDriveFile.size = newDriveFileValues.size;
      newDriveFile.accountId = newDriveFileValues.accountId;
      await this.driveFileRepository.create(newDriveFile);
      return newDriveFile;
    } catch (error) {
      throw new HttpError(400, "Bad request, Drive File could not be created.");
    }
  }

  async readByAccountId(accountId: string) {
    try {
      const files = await this.driveFileRepository.readByAccountId(accountId);
      return files;
    } catch (error) {
      throw new HttpError(400, `Bad Request!! Files not found`);
    }
  }

  async readByUploaderIdAndAccountId(uploaderId: string, accountId: string) {
    try {
      const file = await this.driveFileRepository.readByUploaderIdAndAccountId(
        uploaderId,
        accountId
      );
      if (file) {
        return file;
      } else {
        throw new HttpError(
          404,
          `Drive File id "${uploaderId}" with account id "${accountId}" not found`
        );
      }
    } catch (error) {
      throw new HttpError(
        404,
        `Drive File id "${uploaderId}" with account id "${accountId}" not found`
      );
    }
  }

  async delete(id: string) {
    try {
      const file = await this.driveFileRepository.read(
        id
      );
      if (file) {
        await this.driveFileRepository.delete(
          id
        );
      } else {
        throw new HttpError(
          404,
          `Drive File id "${id}" not found`
        );
      }
    } catch (error) {
      throw new HttpError(
        404,
        `Drive File id "${id}" not found`
      );
    }
  }
}
