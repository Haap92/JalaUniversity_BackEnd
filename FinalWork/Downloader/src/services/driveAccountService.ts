import { DriveAccountRepository } from "../db/repositories/driveAccountRepository"
import DriveAccount from '../db/entities/driveAccount';
import { HttpError } from "../middlewares/errorHandler";



export default class DriveAccountService {
  private driveAccountRepository : DriveAccountRepository
  constructor () {
    this.driveAccountRepository = new DriveAccountRepository()
  }

  async updateOrCreateAccountByAccountId (message: any) {
    const accountFromDb: DriveAccount | undefined = await this.read(message.id)
    const accounttoUpdate: DriveAccount = accountFromDb || new DriveAccount()

    accounttoUpdate.accountId = message.accountId
    accounttoUpdate.downloadsToday = message.downloadsToday
    accounttoUpdate.downloadsTotal = message.downloadsTotal
    accounttoUpdate.acumulatedSizeTotal = message.acumulatedSizeTotal
    accounttoUpdate.acumulatedSizeDay = message.acumulatedSizeDay
    accounttoUpdate.consecutiveDownloads = message.consecutiveDownloads

    return await this.driveAccountRepository.update(accounttoUpdate)
  }

  async readAll () {
    return await this.driveAccountRepository.readAll()
  }

  async read(id:number) {
    return await this.driveAccountRepository.read(id)
  }

  async readByAccountId(accountId: string) {
    try {
      const account = await this.driveAccountRepository.readByAccountId(
        accountId
      );
      if (account) {
        return account;
      } else {
        throw new HttpError(404, `Account with id "${accountId}" not found`);
      }
    } catch (error) {
      throw new HttpError(404, `Account with id "${accountId}" not found`);
    }
  }

  async getOptimizedAccount () {
    return await this.driveAccountRepository.findAccountWithSmallestDownloadToday()
  }

  async getAllAccountsExceptOne (accountId:string) {
    const allAccounts = await this.readAll()
    const filterAccounts = allAccounts.filter((account:any) => {
      return account.accountId !== accountId
    })
    return filterAccounts
  }

}