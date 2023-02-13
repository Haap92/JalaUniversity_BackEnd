import { AppDataSource } from "../db-source";
import GoogleDriveAccount from "../entities/googleDriveAccount";
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

export class GoogleDriveAccountRepository {
  protected repository = AppDataSource.getMongoRepository(GoogleDriveAccount);

  async create(newGoogleDriveAccount: GoogleDriveAccount) {
    return await this.repository.save(newGoogleDriveAccount);
  }

  async read(id: string): Promise<GoogleDriveAccount> {
    const objectId = new ObjectId(id);
    const foundGoogleDriveAccount = await this.repository.findOneBy({
      _id: objectId,
    });

    if (foundGoogleDriveAccount) {
      return foundGoogleDriveAccount;
    } else {
      throw new Error(`Google Drive Account with id:${id} not found`);
    }
  }

  async readAll() {
    const repository = AppDataSource.getMongoRepository(GoogleDriveAccount);
    let googleDriveAccounts = await repository.find();
    return googleDriveAccounts ? googleDriveAccounts.map((googleDriveAccount) => googleDriveAccount as GoogleDriveAccount) : undefined;
  }

  async update(googleDriveAccount: GoogleDriveAccount) {
    return await this.repository.save(googleDriveAccount);
  }

  async delete(id: string) {
    const objectId = new ObjectId(id);
    const deletedGoogleDriveAccount = await this.repository.findOneAndDelete({
      _id: objectId,
    });

    if (deletedGoogleDriveAccount) {
      return deletedGoogleDriveAccount.value._id;
    } else {
      throw new Error(`Google Drive Account with id:${id} not found`);
    }
  }
}
