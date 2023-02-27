import File from "../db/entities/File";
import { FileRepository } from "../db/repositories/fileRepository";
import { DownloadFileValues, FileValues, status } from '../types';
import { HttpError } from "../middlewares/errorHandler";
import GoogleDriveAccountService from "./googleDriveAccountService";
import GoogleDriveAccount from "../db/entities/googleDriveAccount";
import GoogleDriveService from "./googleDriveService";
import { deleteOnDownload, sendToDeleteAccount, sendToDownload, sendToUpload } from "./messageQeueService";
import DriveFileService from "./driveFileService";
import { GridFsService } from './gridFsService';

export default class FileService {
  protected fileRepository: FileRepository;
  protected googleDriveAccountService: GoogleDriveAccountService;
  protected driveFileService: DriveFileService;
  protected gridFsService: GridFsService;
  constructor() {
    this.fileRepository = new FileRepository();
    this.googleDriveAccountService = new GoogleDriveAccountService();
    this.driveFileService = new DriveFileService();
    this.gridFsService = new GridFsService();
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

  async readByAccountId(accountId: string) {
    try {
      const files = await this.fileRepository.readByAccountId(accountId);
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
      this.setupDriveDelete(id)
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
    const fileToUpdate: FileValues = {
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      driveId: fileDriveIds.toString(),
      status: 'Uploaded'
    }
    await this.update(file.id, fileToUpdate);
    return downloadFileData;
  }

  async uploadToDrive(
    googleDriveAccount: GoogleDriveAccount,
    file: File ) {
    try {
      const googleDriveService = new GoogleDriveService(googleDriveAccount);
      const fileFromMongo = await this.gridFsService.getFileFromGridFS(file.filename)
      const uploadResponse = await googleDriveService.uploadFileToDrive(file, fileFromMongo);
      const fileUrls = await googleDriveService.generateDriveFilePublicUrl(uploadResponse.id);
      const downloadFileData: DownloadFileValues = {
        uploaderId: file.id,
        driveId: uploadResponse.id,
        name: file.filename,
        webViewLink: fileUrls.webViewLink,
        webContentLink: fileUrls.webContentLink,
        size: file.size,
        accountId: googleDriveAccount.id
      }
      const stringDownloadFile = JSON.stringify(downloadFileData);
      this.driveFileService.create(downloadFileData)
      sendToDownload(stringDownloadFile);

      return downloadFileData
    } catch (error) {
      throw error;
    }
  }

  async setupDriveDelete(id: string) {
    const googleDriveAccounts = await this.googleDriveAccountService.readAll();
    for (const googleDriveAccount of googleDriveAccounts) {
      const driveFile = await this.driveFileService.readByUploaderIdAndAccountId(id, googleDriveAccount.id);
      
      await this.deleteFileFromDrive(driveFile.driveId, googleDriveAccount);
      
      await deleteOnDownload(JSON.stringify(driveFile));
      await this.driveFileService.delete(driveFile.id);
    };
  }

  async deleteFileFromDrive(
    driveId: string,
    googleDriveAccount: GoogleDriveAccount
  ) {
    try {
      const googleDriveService = new GoogleDriveService(googleDriveAccount);
      await googleDriveService.deleteFileFromDrive(driveId);
    } catch (error) {
      throw error;
    }
  }

  async setupNewAccountDriveUpload(googleDriveAccount: GoogleDriveAccount) {
    const files = await this.readAll();
    const downloadFileData: DownloadFileValues[] = []
    for (const file of files) {
      const newDownloadFileData = await this.uploadToDrive(googleDriveAccount, file);
      const driveIds = file.driveId.split(",");
      driveIds.push(newDownloadFileData.driveId);
      
      const fileToUpdate: FileValues = {
        filename: file.filename,
        originalname: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        driveId: driveIds.toString(),
        status: 'Uploaded'
      }

      await this.update(file.id, fileToUpdate);
      downloadFileData.push(newDownloadFileData)
    }
    return downloadFileData
  }

  async setupAccountDriveFilesDelete(accountId: string) {
    const driveAccount = await this.googleDriveAccountService.read(accountId)

    const files = await this.driveFileService.readByAccountId(accountId);
    for (const file of files) {
      const driveFile = await this.driveFileService.readByUploaderIdAndAccountId(file.uploaderId, accountId);
      const account = await this.googleDriveAccountService.read(accountId)   
      
      const fileToUpdate = await this.read(file.uploaderId);
      const driveIdArray = fileToUpdate.driveId.split(',');
      
      const driveIdIndex = driveIdArray.indexOf(driveFile.driveId);
      if (driveIdIndex !== -1) {
        driveIdArray.splice(driveIdIndex, 1);
      }
      
      fileToUpdate.driveId = driveIdArray.join(','); 
      await this.fileRepository.update(fileToUpdate);
     
      await this.deleteFileFromDrive(driveFile.driveId, account);
      
      await deleteOnDownload(JSON.stringify(driveFile));
      await this.driveFileService.delete(driveFile.id);
    };
    const accountToDelete = JSON.stringify(driveAccount)
    sendToDeleteAccount(accountToDelete)
  }
}
