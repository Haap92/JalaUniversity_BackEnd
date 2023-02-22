import { AppDataSource } from "../db-source";
import DriveFile from "../entities/driveFile";

const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

export class DriveFileRepository {
  protected repository = AppDataSource.getMongoRepository(DriveFile);

  async create(newDriveFile: DriveFile) {
    return await this.repository.save(newDriveFile);
  }

  async read(id: string): Promise<DriveFile> {
    const objectId = new ObjectId(id);
    const foundFile = await this.repository.findOneBy({
      _id: objectId,
    });

    if (foundFile) {
      return foundFile;
    } else {
      throw new Error(`Uploaded File with id:${id} not found`);
    }
  }

  async readAll() {
    let files = await this.repository.find();
    return files ? files.map((file) => file as DriveFile) : undefined;
  }

  async readByDriveIdAndAccountId (driveId: string, accountId: string) {
    console.log(accountId, driveId)
    const FileAccountFound = await this.repository.findOneBy({
        driveId,
        accountId
    })

    if (FileAccountFound) {
      return FileAccountFound
    } else {
      return undefined
    }
  }

  async readByUploaderIdAndAccountId (uploaderId: string, accountId: string) {
    console.log(accountId, uploaderId)
    const FileAccountFound = await this.repository.findOneBy({
        uploaderId,
        accountId
    })

    if (FileAccountFound) {
      return FileAccountFound
    } else {
      return undefined
    }
  }

  async update(driveFile: DriveFile) {
    return await this.repository.save(driveFile);
  }

  async delete(id: string) {
    const objectId = new ObjectId(id);
    const deletedFile = await this.repository.findOneAndDelete({
      _id: objectId,
    });

    if (deletedFile) {
      return deletedFile.value._id;
    } else {
      throw new Error(`Uploaded File with id:${id} not found`);
    }
  }
}
