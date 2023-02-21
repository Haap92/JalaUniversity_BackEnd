import { AppDataSource } from "../db-source"
import FileReport from "../entities/fileReport"


export class FileReportRepository {
  protected repository = AppDataSource.getRepository(FileReport)

  async create (newFile: FileReport) {
    await this.repository.insert(newFile)
    return newFile
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

  async readByUploaderId(uploaderId: string) {
    const readedUploadId = await this.repository.findOne({ where: { uploaderId: uploaderId } });
    if (readedUploadId){
    return readedUploadId
    }
  }

  async update (updateFile: FileReport) {
    const response = await this.repository.save(updateFile)
    return response
  }

  async delete (id: number) {
    const deleteFile = await this.repository.delete({ id })

    if (deleteFile) {
      return deleteFile
    }
  }
}
