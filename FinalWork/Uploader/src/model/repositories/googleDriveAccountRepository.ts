import GoogleDriveAccount from "../entities/googleDriveAccount"

export interface GoogleDriveAccountRepository {

    create: (googleDriveAccount: GoogleDriveAccount) => Promise<GoogleDriveAccount>
    read: (id: string) => Promise<GoogleDriveAccount>
    update:(googleDriveAccount: GoogleDriveAccount) => Promise<void | Error>
    delete:(id: string) => Promise<string | Error>

}