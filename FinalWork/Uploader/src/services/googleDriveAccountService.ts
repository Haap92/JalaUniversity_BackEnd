import { AppDataSource } from "../config/db-source";
import GoogleDriveAccount from "../model/entities/googleDriveAccount";
import { EntityNotFoundError } from "typeorm/error/EntityNotFoundError";
import { GoogleDriveAccountRepository } from "../model/repositories/googleDriveAccountRepository";
import { ObjectId } from "mongodb";

export default class GoogleDriveAccountService
  implements GoogleDriveAccountRepository
{
  private readonly repository;
  constructor() {
    this.repository = AppDataSource.getMongoRepository(GoogleDriveAccount);
  }

  async create(googleDriveAccount: GoogleDriveAccount) {
    await this.repository.save(googleDriveAccount);
    return googleDriveAccount;
  }

  async read(id: string) {
    try {
      const objectId: ObjectId = new ObjectId(id);
      const googleDriveAccount = await this.repository.findOneBy({
        _id: objectId,
      });
      return googleDriveAccount;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        return new Error(`GoogleDriveAccount with id "${id}" not found`);
      }
      return error;
    }
  }

  async update(googleDriveAccount: GoogleDriveAccount) {
    try {
      await this.repository.save(googleDriveAccount);
    } catch (error) {
      return new Error(
        `Failed to update GoogleDriveAccount with id "${googleDriveAccount.id}"`
      );
    }
  }

  async delete(id: string) {
    try {
      await this.repository.delete({ id });
    } catch (error) {
      return new Error(`Failed to delete GoogleDriveAccount with id "${id}"`);
    }
    return `GoogleDriveAccount with ${id} deleted`;
  }
}
