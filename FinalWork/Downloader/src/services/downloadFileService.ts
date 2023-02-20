import DownloadFile from "../db/entities/downloadFile";
import DownloadFileRepository from "../db/repositories/downloadFileRepository";
import { HttpError } from "../middlewares/errorHandler";
import { DownloadFileValues } from "../types";
import DriveAccountService from './driveAccountService';
import DriveAccount from '../db/entities/driveAccount';


export default class DownloadFileService {
  protected downloadFileRepository: DownloadFileRepository;
  protected driveAccountService: DriveAccountService
  constructor() {
    this.downloadFileRepository = new DownloadFileRepository();
    this.driveAccountService = new DriveAccountService();
  }

  async create(downloadFile: DownloadFile) {
    try {
      const createdFile = await this.downloadFileRepository.create(
        downloadFile
      );
      const succesfulCreate = {
        file: createdFile,
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

  async readByUploaderIdAndAccountId(uploaderId: string, accountId: string) {
    try {
      const file = await this.downloadFileRepository.readByUploaderIdAndAccountId(
        uploaderId,
        accountId
      );
      if (file) {
        return file;
      } else {
        throw new HttpError(404, `File id "${uploaderId}" with account id "${accountId}" not found`);
      }
    } catch (error) {
      throw new HttpError(404, `File id "${uploaderId}" with account id "${accountId}" not found`);
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

  async getWebLinks (uploaderId: string) {
    const driveAccount = await this.driveAccountService.getOptimizedAccount()
    const fileToDownload = await this.downloadFileRepository.readByUploaderIdAndAccountId(uploaderId, driveAccount.accountId)

    if (driveAccount && fileToDownload) {
      driveAccount.downloadsTotal += 1
      driveAccount.downloadsToday += 1
      driveAccount.acumulatedSizeTotal += fileToDownload.size
      driveAccount.acumulatedSizeDay += fileToDownload.size
      driveAccount.consecutiveDownloads += 1

      fileToDownload.downloadsToday += 1
      fileToDownload.downloadsTotal += 1

      await this.driveAccountService.updateOrCreateAccount(driveAccount)
      const updatedFile = await this.downloadFileRepository.update(fileToDownload)
      const filterAccounts = await this.driveAccountService.getAllAccountsExceptOne(driveAccount.accountId)

      filterAccounts.forEach((account: DriveAccount) => {
        account.consecutiveDownloads = 0
        this.driveAccountService.updateOrCreateAccount(account)
      })

      return {
        'File name': updatedFile.name,
        'Download link': updatedFile.webContentLink,
        'View link': updatedFile.webViewLink
      }
    }
    return {
      'file ': 'not found'
    }
  }
}
