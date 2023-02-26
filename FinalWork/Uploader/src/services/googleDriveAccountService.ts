import GoogleDriveAccount from "../db/entities/googleDriveAccount";
import { GoogleDriveAccountRepository } from "../db/repositories/googleDriveAccountRepository";
import { GoogleDriveAccountValues } from "../types";
import { HttpError } from "../middlewares/errorHandler";
import { deleteAccountOnDownload, sendAccountToDownload, sendToCreateAccount } from "./messageQeueService";
import FileService from './fileService';

export default class GoogleDriveAccountService {
  private googleDriveAccountRepository: GoogleDriveAccountRepository;
  constructor() {
    this.googleDriveAccountRepository = new GoogleDriveAccountRepository();
  }

  async create(googleDriveAccountValues: GoogleDriveAccountValues) {
    try {
      const googleDriveAccount = new GoogleDriveAccount();
      googleDriveAccount.email = googleDriveAccountValues.email;
      googleDriveAccount.clientID = googleDriveAccountValues.clientID;
      googleDriveAccount.clientSecret = googleDriveAccountValues.clientSecret;
      googleDriveAccount.redirectUri = googleDriveAccountValues.redirectUri;
      googleDriveAccount.refreshToken = googleDriveAccountValues.refreshToken;
      const newGoogleDriveAccount = await this.googleDriveAccountRepository.create(googleDriveAccount);
      const stringUploadAccount = JSON.stringify(newGoogleDriveAccount);
      await sendAccountToDownload(stringUploadAccount);
      sendToCreateAccount(stringUploadAccount);
      const succesfulCreate = {
        Account: newGoogleDriveAccount,
        message: `Files will be uploaded soon to the new created Account`
      };
      return succesfulCreate;
    } catch (error) {
      throw new HttpError(
        400,
        "Bad request, Google Drive Account could not be created."
      );
    }
  }

  async read(id: string) {
    try {
      const googleDriveAccount = await this.googleDriveAccountRepository.read(
        id
      );
      return googleDriveAccount;
    } catch (error) {
      throw new HttpError(404, `GoogleDriveAccount with id "${id}" not found`);
    }
  }

  async readAll() {
    try {
      const googleDriveAccounts = await this.googleDriveAccountRepository.readAll();
      return googleDriveAccounts;
    } catch (error) {
      throw new HttpError(400, `Bad Request!! Google Drive Accounts not found`);
    }
  }

  async update(
    id: string,
    updateGoogleDriveAccountValues: GoogleDriveAccountValues
  ) {
    try {
      const readedGoogleDriveAccount = await this.read(id);
      if (readedGoogleDriveAccount) {
        readedGoogleDriveAccount.email =
          updateGoogleDriveAccountValues.email === ""
            ? readedGoogleDriveAccount.email
            : updateGoogleDriveAccountValues.email;

        readedGoogleDriveAccount.clientID =
          updateGoogleDriveAccountValues.clientID === ""
            ? readedGoogleDriveAccount.clientID
            : updateGoogleDriveAccountValues.clientID;

        readedGoogleDriveAccount.clientSecret =
          updateGoogleDriveAccountValues.clientSecret === ""
            ? readedGoogleDriveAccount.clientSecret
            : updateGoogleDriveAccountValues.clientSecret;

        readedGoogleDriveAccount.redirectUri =
          updateGoogleDriveAccountValues.redirectUri === ""
            ? readedGoogleDriveAccount.redirectUri
            : updateGoogleDriveAccountValues.redirectUri;

        readedGoogleDriveAccount.refreshToken =
          updateGoogleDriveAccountValues.refreshToken === ""
            ? readedGoogleDriveAccount.refreshToken
            : updateGoogleDriveAccountValues.refreshToken;
      }
      return await this.googleDriveAccountRepository.update(
        readedGoogleDriveAccount
      );
    } catch (error) {
      throw new HttpError(
        404,
        `Failed to update Google Drive Account, Account with id: "${id}" not found`
      );
    }
  }

  async delete(id: string) {
    try {
      const accountToDelete = await this.read(id);
      const deleteAccount = JSON.stringify(accountToDelete);
      const fileService = new FileService();
      deleteAccountOnDownload(deleteAccount)
      fileService.setupAccountDriveFilesDelete(id);
      const deleting = {
        message: `Account with id: "${id}" deletion its being proccessed`
      } 
      return deleting;
    } catch (error) {
      throw new HttpError(
        404,
        `Failed to delete Google Drive Account, Account with id: "${id}" not found`
      );
    }
  }

  async hardDelete(id: string) {
    await this.googleDriveAccountRepository.delete(id);
  }
}
