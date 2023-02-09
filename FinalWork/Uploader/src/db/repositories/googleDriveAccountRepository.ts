import { AppDataSource } from "../db-source";
import GoogleDriveAccount from "../entities/googleDriveAccount";
import { ObjectId } from "mongodb";

export class GoogleDriveAccountRepository {
  protected repository = AppDataSource.getMongoRepository(GoogleDriveAccount);

  async create(newGoogleDriveAccount: GoogleDriveAccount) {
    return await this.repository.save(newGoogleDriveAccount);
  }

  async read(id: string): Promise<GoogleDriveAccount> {
    const objectId: ObjectId = new ObjectId(id);
    const foundGoogleDriveAccount = await this.repository.findOneBy({
      _id: objectId,
    });

    if (foundGoogleDriveAccount) {
      return foundGoogleDriveAccount;
    } else {
      throw new Error(`Google Drive Account with id:${id} not found`);
    }
  }

  async update(googleDriveAccount: GoogleDriveAccount) {
    const { id } = googleDriveAccount;
    const objectId = new ObjectId(id);
  
    const updateResult = await this.repository.updateOne(
      { _id: objectId },
      { $set: googleDriveAccount }
    );
  
    if (updateResult.result.n === 0) {
      throw new Error(`Google Drive Account with id:${id} not found`);
    }
  }

  async delete(id: string) {
    const objectId: ObjectId = new ObjectId(id);
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