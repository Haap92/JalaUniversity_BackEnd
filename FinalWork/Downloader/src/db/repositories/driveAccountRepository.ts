import { AppDataSource } from "../db-source"
import DriveAccount from "../entities/driveAccount"


export class DriveAccountRepository {
  protected repository = AppDataSource.getRepository(DriveAccount)

  async create (newDriveAccount: DriveAccount) {
    await this.repository.insert(newDriveAccount)
    return newDriveAccount
  }

  async read (id: number) {
    const foundAccount = await this.repository.findOneBy({ id })

    if (foundAccount) {
      return foundAccount
    } 
  }

  async readAll () {
    const allAccounts = await this.repository.find()

    if (allAccounts) {
      return allAccounts
    }
  }

  async update (updateDriveAccount: DriveAccount) {
    const response = await this.repository.save(updateDriveAccount)
    return response
  }

  async delete (id: number) {
    const deleteAccount = await this.repository.delete({ id })

    if (deleteAccount) {
      return deleteAccount
    }
  }

  async findAccountWithSmallestDownloadToday () {
    const response = await this.repository.createQueryBuilder('account')
      .where('account.consecutiveDownloads <= :consecutiveDownloads', { consecutiveDownloads: 5 })
      .orderBy('account.acumulatedSizeDay', 'ASC')
      .getOne()

    if (response) {
      return response
    }
  }
}
