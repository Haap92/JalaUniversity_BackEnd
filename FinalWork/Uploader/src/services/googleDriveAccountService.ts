import GoogleDriveAccount from "../db/entities/googleDriveAccount";
import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError";
import { GoogleDriveAccountRepository } from "../db/repositories/googleDriveAccountRepository";
import { GoogleDriveAccountValues } from "../types";


export default class GoogleDriveAccountService {
  protected googleDriveAccountRepository: GoogleDriveAccountRepository;
  constructor() {
    this.googleDriveAccountRepository = new GoogleDriveAccountRepository();
  }

  async create(googleDriveAccountValues: GoogleDriveAccountValues) {
    const googleDriveAccount = new GoogleDriveAccount();
    googleDriveAccount.email = googleDriveAccountValues.email;
    googleDriveAccount.googleDriveKey = googleDriveAccountValues.googleDriveKey;
    await this.googleDriveAccountRepository.create(googleDriveAccount);
    return googleDriveAccount;
  }

  async read(id: string) {
    try {
      const googleDriveAccount = await this.googleDriveAccountRepository.read(
        id
      );
      return googleDriveAccount;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        return new Error(`GoogleDriveAccount with id "${id}" not found`);
      }
      return error;
    }
  }

  async update(
    id: string,
    updateGoogleDriveAccountValues: GoogleDriveAccountValues
  ) {
    try {
      const readedGoogleDriveAccount = await this.read(id);  

      readedGoogleDriveAccount.email =
        updateGoogleDriveAccountValues.email === ""
          ? readedGoogleDriveAccount.email
          : updateGoogleDriveAccountValues.email;
      readedGoogleDriveAccount.googleDriveKey =
        updateGoogleDriveAccountValues.googleDriveKey === ""
          ? readedGoogleDriveAccount.googleDriveKey
          : updateGoogleDriveAccountValues.googleDriveKey;   
        
      return await this.googleDriveAccountRepository.update(
        readedGoogleDriveAccount
      );
    } catch (error) {
      return new Error(`Failed to update Google Drive Account with id "${id}"`);
    }
  }

  async delete(id: string) {
    return await this.googleDriveAccountRepository.delete(id);
  }
}
