import DownloadFile from "../db/entities/downloadFile";
import DownloadFileRepository from "../db/repositories/downloadFileRepository";
import { HttpError } from "../middlewares/errorHandler";
import { DownloadFileValues } from "../types";

export default class DownloadFileService {
  protected downloadFileRepository: DownloadFileRepository;
  constructor() {
    this.downloadFileRepository = new DownloadFileRepository();
  }

  async create(downloadFile: DownloadFile) {
    try {
      const createdFile = await this.downloadFileRepository.create(
        downloadFile
      );
      const succesfulCreate = {
        file: createdFile
      };
      return succesfulCreate;
    } catch (error) {
      throw new HttpError(400, "Bad request, file could not be created.");
    }
  }

  async read(id: number) {
    try {
      const file = await this.downloadFileRepository.read(id);
      if (file) {
        return file;
      } else {
        throw new HttpError(404, `Download File with id "${id}" not found`);
      }
    } catch (error) {
      throw new HttpError(404, `Download File with id "${id}" not found`);
    }
  }

  async readAll() {
    try {
      const files = await this.downloadFileRepository.readAll();
      return files;
    } catch (error) {
      throw new HttpError(400, `Bad Request!! Download Files not found`);
    }
  }

  async readByUploaderId(uploaderId: string) {
    try {
      const file = await this.downloadFileRepository.readByUploaderId(
        uploaderId
      );
      if (file) {
        return file;
      } else {
        throw new HttpError(404, `Uploader with id "${uploaderId}" not found`);
      }
    } catch (error) {
      throw new HttpError(404, `Uploader with id "${uploaderId}" not found`);
    }
  }

  async update(id: number, updateDownloadFile: DownloadFileValues) {
    try {
      const readedDownloadFile = await this.read(id);
      if (readedDownloadFile) {
        readedDownloadFile.uploaderId =
          updateDownloadFile.uploaderId === ""
            ? readedDownloadFile.uploaderId
            : updateDownloadFile.uploaderId;

        readedDownloadFile.driveId =
          updateDownloadFile.driveId === ""
            ? readedDownloadFile.driveId
            : updateDownloadFile.driveId;

        readedDownloadFile.webViewLink =
          updateDownloadFile.webViewLink === ""
            ? readedDownloadFile.webViewLink
            : updateDownloadFile.webViewLink;

        readedDownloadFile.webContentLink =
          updateDownloadFile.webContentLink === ""
            ? readedDownloadFile.webContentLink
            : updateDownloadFile.webContentLink;

        readedDownloadFile.size =
          updateDownloadFile.size === null
            ? readedDownloadFile.size
            : updateDownloadFile.size;

        readedDownloadFile.accountId =
          updateDownloadFile.accountId === null
            ? readedDownloadFile.accountId
            : updateDownloadFile.accountId;

        return await this.downloadFileRepository.update(readedDownloadFile);
      }
    } catch (error) {
      throw new HttpError(
        404,
        `Failed to update Download File, the data provided for the update is incorrect`
      );
    }
  }

  async delete(id: number) {
    try {
      return await this.downloadFileRepository.delete(id);
    } catch (error) {
      throw new HttpError(
        404,
        `Failed to Delete the Download File, Download File with id: "${id}" not found`
      );
    }
  }
}
