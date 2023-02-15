import File from "../db/entities/File";
import { FileRepository } from "../db/repositories/fileRepository";
import { DownloadFileValues, FileValues, status } from '../types';
import { HttpError } from "../middlewares/errorHandler";
import GoogleDriveAccountService from "./googleDriveAccountService";
import GoogleDriveAccount from "../db/entities/googleDriveAccount";
import GoogleDriveService from "./googleDriveService";
import { sendToDownload, sendToUpload } from "./messageQeueService";

export default class FileService {
  protected fileRepository: FileRepository;
  protected googleDriveAccountService: GoogleDriveAccountService;
  constructor() {
    this.fileRepository = new FileRepository();
    this.googleDriveAccountService = new GoogleDriveAccountService();
  }

  async create(file: File) {
    try {
      const createdFile = await this.fileRepository.create(file);
      const stringUploadFile = JSON.stringify(createdFile)
      sendToUpload(stringUploadFile)
      const succesfulCreate = {
        file: createdFile,
        message: `File will be uploaded soon`
      };
      return succesfulCreate;
    } catch (error) {
      throw new HttpError(400, "Bad request, file could not be created.");
    }
  }

  async read(id: string) {
    try {
      const file = await this.fileRepository.read(id);
      if(file){
        return file;
        }else {
          throw new HttpError(404, `File with id "${id}" not found`);
        }
    } catch (error) {
      throw new HttpError(404, `File with id "${id}" not found`);
    }
  }

  async readAll() {
    try {
      const files = await this.fileRepository.readAll();
      return files;
    } catch (error) {
      throw new HttpError(400, `Bad Request!! Files not found`);
    }
  }

  async update(id: string, updateFile: FileValues) {
    try {
      const readedFile = await this.read(id);
      if (
        readedFile &&
        (readedFile.status === "Pending" ||
          readedFile.status === "Replicating" ||
          readedFile.status === "Uploaded")
      ) {
        readedFile.filename =
          updateFile.filename === ""
            ? readedFile.filename
            : updateFile.filename;

        readedFile.originalname =
          updateFile.originalname === ""
            ? readedFile.originalname
            : updateFile.originalname;

        readedFile.size =
          updateFile.size === null ? readedFile.size : updateFile.size;

        readedFile.mimetype =
          updateFile.mimetype === ""
            ? readedFile.mimetype
            : updateFile.mimetype;

        readedFile.driveId =
          updateFile.driveId === "" ? readedFile.driveId : updateFile.driveId;

        readedFile.status =
          updateFile.status === "Pending"
            ? readedFile.status
            : updateFile.status;

        if (
          !["Pending", "Replicating", "Uploaded"].includes(readedFile.status)
        ) {
          throw new HttpError(
            400,
            `Failed to update File. The file status should be 'Pending', 'Replicating', or 'Uploaded'.`
          );
        }
        return await this.fileRepository.update(readedFile);
      }
    } catch (error) {
      throw new HttpError(
        404,
        `Failed to update File, the data provided for the update is incorrect`
      );
    }
  }

  async updateStatusReplicating(id: string) {
    try {
      const readedFile = await this.read(id);
      if (
        readedFile &&
        (readedFile.status === "Pending" ||
          readedFile.status === "Replicating" ||
          readedFile.status === "Uploaded")
      ) {
          readedFile.status ="Replicating"
        if (
          !["Pending", "Replicating", "Uploaded"].includes(readedFile.status)
        ) {
          throw new HttpError(
            400,
            `Failed to update File. The file status should be 'Pending', 'Replicating', or 'Uploaded'.`
          );
        }
        return await this.fileRepository.update(readedFile);
      }
    } catch (error) {
      throw new HttpError(
        404,
        `Failed to update File, the data provided for the update is incorrect`
      );
    }
  }

  async updateStatusUploaded(id: string) {
    try {
      const readedFile = await this.read(id);
      if (
        readedFile &&
        (readedFile.status === "Pending" ||
          readedFile.status === "Replicating" ||
          readedFile.status === "Uploaded")
      ) {
          readedFile.status = 'Uploaded'

        if (
          !["Pending", "Replicating", "Uploaded"].includes(readedFile.status)
        ) {
          throw new HttpError(
            400,
            `Failed to update File. The file status should be 'Pending', 'Replicating', or 'Uploaded'.`
          );
        }
        return await this.fileRepository.update(readedFile);
      }
    } catch (error) {
      throw new HttpError(
        404,
        `Failed to update File, the data provided for the update is incorrect`
      );
    }
  }

  async delete(id: string) {
    try {
      return await this.fileRepository.delete(id);
    } catch (error) {
      throw new HttpError(
        404,
        `Failed to Delete File, File with id: "${id}" not found`
      );
    }
  }

  async setupDriveUpload(file: File) {
    const googleDriveAccounts = await this.googleDriveAccountService.readAll();
    const fileDriveIds = [];
    const downloadFileData: DownloadFileValues[] = []
    this.updateStatusReplicating(file.id)
    for (const googleDriveAccount of googleDriveAccounts) {
      const newDownloadFileData = await this.uploadToDrive(googleDriveAccount, file);
      fileDriveIds.push(newDownloadFileData.driveId);
      downloadFileData.push(newDownloadFileData)
    }
    file.driveId = fileDriveIds.toString();
    await this.fileRepository.update(file);
    return downloadFileData;
  }

  async uploadToDrive(
    googleDriveAccount: GoogleDriveAccount,
    file: File ) {
    try {
      const googleDriveService = new GoogleDriveService(googleDriveAccount);
      const uploadResponse = await googleDriveService.uploadFileToDrive(file);
      const fileUrls = await googleDriveService.generateDriveFilePublicUrl(uploadResponse.id);
      const downloadFileData: DownloadFileValues = {
        uploaderId: file.id,
        driveId: uploadResponse.id,
        webViewLink: fileUrls.webViewLink,
        webContentLink: fileUrls.webContentLink,
        size: file.size,
        accountId: googleDriveAccount.id
      }
      this.updateStatusUploaded(file.id)
      const stringDownloadFile = JSON.stringify(downloadFileData)
      sendToDownload(stringDownloadFile)

      return downloadFileData
    } catch (error) {
      throw error;
    }
  }

  async setupDriveDelete(file: File) {
    const driveIds = file.driveId.split(",");
    const accounts = await this.googleDriveAccountService.readAll();
    driveIds.map(async (id, index) => {
      await this.deleteFileFromDrive(id, accounts[index]);
    });
  }

  async deleteFileFromDrive(
    driveId: string,
    googleDriveAccount: GoogleDriveAccount
  ) {
    try {
      let googleDriveService = new GoogleDriveService(googleDriveAccount);
      await googleDriveService.deleteFileFromDrive(driveId);
      googleDriveService = undefined;
    } catch (error) {
      throw error;
    }
  }
}
