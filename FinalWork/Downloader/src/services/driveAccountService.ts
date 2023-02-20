import { DriveAccountRepository } from "../db/repositories/driveAccountRepository"
import DriveAccount from '../db/entities/driveAccount';



export default class DriveAccountService {
  private driveAccountRepository : DriveAccountRepository
  constructor () {
    this.driveAccountRepository = new DriveAccountRepository()
  }

  async updateOrCreateAccount (message: any) {
    const accountFromDb: DriveAccount | undefined = await this.getAccountById(message.id)
    const accounttoUpdate: DriveAccount = accountFromDb || new DriveAccount()

    accounttoUpdate.accountId = message.accountId
    accounttoUpdate.downloadsToday = message.downloadsToday
    accounttoUpdate.downloadsTotal = message.downloadsTotal
    accounttoUpdate.acumulatedSizeTotal = message.acumulatedSizeTotal
    accounttoUpdate.acumulatedSizeDay = message.acumulatedSizeDay
    accounttoUpdate.consecutiveDownloads = message.consecutiveDownloads

    return await this.driveAccountRepository.update(accounttoUpdate)
  }

  async getAllAccounts () {
    return await this.driveAccountRepository.readAll()
  }

  async getAccountById (id:number) {
    return await this.driveAccountRepository.read(id)
  }

  async getOptimizedAccount () {
    return await this.driveAccountRepository.findAccountWithSmallestDownloadToday()
  }

  async getAllAccountsExceptOne (accountId:string) {
    const allAccounts = await this.getAllAccounts()
    const filterAccounts = allAccounts.filter((account:any) => {
      return account.accountId !== accountId
    })
    return filterAccounts
  }

}
