import "reflect-metadata";
import { AppDataSource } from "./db/db-source";
import DriveAccount from "./db/entities/driveAccount";
import { DriveAccountRepository } from "./db/repositories/driveAccountRepository";



class Test {
    async initializeDB(){

      await AppDataSource.initialize();
        const account1 = new DriveAccount();
        account1.accountId = "63e70f69672c6f4f7cd86414";
        account1.downloadsTotal = 0;
        account1.downloadsToday = 0;
        account1.consecutiveDownloads = 0;
        account1.acumulatedSizeTotal = 0;
        account1.acumulatedSizeDay = 0;
        account1.activeAccount = 'yes';
    
        const account2 = new DriveAccount();
        account2.accountId = "63e71004672c6f4f7cd86415";
        account2.downloadsTotal = 0;
        account2.downloadsToday = 0;
        account2.consecutiveDownloads = 0;
        account2.acumulatedSizeTotal = 0;
        account2.acumulatedSizeDay = 0;
        account2.activeAccount = 'yes'
    
        const account3 = new DriveAccount();
        account3.accountId = "63e7103e672c6f4f7cd86416";
        account3.downloadsTotal = 0;
        account3.downloadsToday = 0;
        account3.consecutiveDownloads = 0;
        account3.acumulatedSizeTotal = 0;
        account3.acumulatedSizeDay = 0;
        account3.activeAccount = 'no'

        const dataAccess = new DriveAccountRepository
    
        await dataAccess.create(account1)
        await dataAccess.create(account2)
        await dataAccess.create(account3)
    
        return [account1, account2, account3];
    }
}

new Test().initializeDB();
