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

  async readActiveAccounts() {
    const allActiveAccounts = await this.repository.find({
      where: {
        activeAccount: 'yes'
      }
    })
  
    if (allActiveAccounts) {
      return allActiveAccounts
    }
  }

  async readByAccountId(accountId: string) {
    const readedAccountId = await this.repository.findOne({ where: { accountId: accountId } });
    if (readedAccountId){
    return readedAccountId
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
      .where('account.consecutiveDownloads <= :consecutiveDownloads', { consecutiveDownloads: 4 })
      .andWhere('account.activeAccount = :activeAccount', { activeAccount: 'yes' })
      .orderBy('account.acumulatedSizeDay', 'ASC')
      .getOne()
  
    if (response) {
      return response
    }
  }

  async dailyUpdate () {
    await this.repository.update({}, { downloadsToday: 0, acumulatedSizeDay: 0 })
  }
}
