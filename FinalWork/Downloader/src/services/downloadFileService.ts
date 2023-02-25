import DownloadFile from "../db/entities/downloadFile";
import DownloadFileRepository from "../db/repositories/downloadFileRepository";
import { HttpError } from "../middlewares/errorHandler";
import {
  AccountStatsValues,
  DownloadFileValues,
  FileReportValues,
  NewFileReportValues,
} from "../types";
import DriveAccountService from "./driveAccountService";
import DriveAccount from "../db/entities/driveAccount";
import { sendAccountToStatus, sendFileToStatus } from "./messageQeueService";
import FileReportService from "./fileReportService";
import FileReport from "../db/entities/fileReport";

export default class DownloadFileService {
  protected downloadFileRepository: DownloadFileRepository;
  protected driveAccountService: DriveAccountService;
  protected fileReportService: FileReportService;
  constructor() {
    this.downloadFileRepository = new DownloadFileRepository();
    this.driveAccountService = new DriveAccountService();
    this.fileReportService = new FileReportService();
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
      const file =
        await this.downloadFileRepository.readByUploaderIdAndAccountId(
          uploaderId,
          accountId
        );
      if (file) {
        return file;
      } else {
        throw new HttpError(
          404,
          `File id "${uploaderId}" with account id "${accountId}" not found`
        );
      }
    } catch (error) {
      throw new HttpError(
        404,
        `File id "${uploaderId}" with account id "${accountId}" not found`
      );
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

  async deleteByUploaderAndAccountId(uploaderId: string, accountId: string) {
    try {
      const file =
        await this.downloadFileRepository.readByUploaderIdAndAccountId(
            uploaderId,
            accountId
        );
      if (file) {
         await this.downloadFileRepository.deleteByUploaderAndAccountId(uploaderId, accountId)
      }
    } catch (error) {
      throw new HttpError(
        404,
        `Failed to Delete the Download Files, Download Files with id: "${uploaderId}" not found`
      );
    }
  }

  async getWebLinks(uploaderId: string) {
    const driveAccount = await this.driveAccountService.getOptimizedAccount();
    const fileToDownload =
      await this.downloadFileRepository.readByUploaderIdAndAccountId(
        uploaderId,
        driveAccount.accountId
      );

    if (driveAccount && fileToDownload) {
      driveAccount.consecutiveDownloads += 1;
      const accountToStats: AccountStatsValues = {
        id: driveAccount.id,
        accountId: driveAccount.accountId,
        downloadsTotal: driveAccount.downloadsTotal,
        downloadsToday: driveAccount.downloadsToday,
        acumulatedSizeTotal: driveAccount.acumulatedSizeTotal,
        acumulatedSizeDay: driveAccount.acumulatedSizeDay,
        filesize: fileToDownload.size,
      };
      await sendAccountToStatus(JSON.stringify(accountToStats));
      const uploaderIdFile = fileToDownload.uploaderId;
      try {
        const fileToStats = await this.fileReportService.readByUploaderId(
          uploaderIdFile
        );
        const newFileToStats: FileReportValues = {
          id: fileToStats.id,
          uploaderId: fileToStats.uploaderId,
          downloadsTotal: fileToStats.downloadsTotal,
          downloadsToday: fileToStats.downloadsToday,
          acumulatedSizeTotal: fileToStats.acumulatedSizeTotal,
          acumulatedSizeDay: fileToStats.acumulatedSizeDay,
          size: fileToDownload.size
        }
        await sendFileToStatus(JSON.stringify(newFileToStats));
      } catch (error) {
        const newFileToStats2: NewFileReportValues = {
          uploaderId: fileToDownload.uploaderId,
          downloadsTotal: 0,
          downloadsToday: 0,
          acumulatedSizeTotal: 0,
          acumulatedSizeDay: 0,
          size: fileToDownload.size
        };       
        await sendFileToStatus(JSON.stringify(newFileToStats2));
      }

      await this.driveAccountService.updateOrCreateAccountByAccountId(
        driveAccount
      );
      const filterAccounts =
        await this.driveAccountService.getAllAccountsExceptOne(
          driveAccount.accountId
        );

      filterAccounts.forEach((account: DriveAccount) => {
        account.consecutiveDownloads = 0;
        this.driveAccountService.updateOrCreateAccountByAccountId(account);
      });

      return {
        "File name": fileToDownload.name,
        "Download link": fileToDownload.webContentLink,
        "View link": fileToDownload.webViewLink,
      };
    }
    return {
      "file ": "not found",
    };
  }
}
