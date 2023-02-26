import { DriveAccountRepository } from "../db/repositories/driveAccountRepository"
import DriveAccount from '../db/entities/driveAccount';
import { HttpError } from "../middlewares/errorHandler";
import { NewAccountValues } from "../types";



export default class DriveAccountService {
  private driveAccountRepository : DriveAccountRepository
  constructor () {
    this.driveAccountRepository = new DriveAccountRepository()
  }
  async create (driveAccount: NewAccountValues) {

    const newDriveAccount = new DriveAccount;
    newDriveAccount.accountId = driveAccount.accountId;
    newDriveAccount.downloadsTotal = driveAccount.downloadsTotal;
    newDriveAccount.downloadsToday = driveAccount.downloadsToday;
    newDriveAccount.acumulatedSizeTotal = driveAccount.acumulatedSizeTotal;
    newDriveAccount.acumulatedSizeDay = driveAccount.acumulatedSizeDay;
    try {
      const createdFileReport = await this.driveAccountRepository.create(newDriveAccount);
      return createdFileReport;
    } catch (error) {
        throw(new HttpError(400, error.message));
      }
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

  async delete(id: number) {
    try {
      return await this.driveAccountRepository.delete(id);
    } catch (error) {
      throw new HttpError(
        404,
        `Failed to Delete the Drive Account, Drive Account with id: "${id}" not found`
      );
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

  async dailyUpdateDownloads () {
    this.driveAccountRepository.dailyUpdate()
  }

}
