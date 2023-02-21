import { HttpError } from "../middlewares/errorHandler";
import { FileReportRepository } from "../db/repositories/fileReportRepository";
import FileReport from "../db/entities/fileReport";



export default class FileReportService {
  private fileReportRepository : FileReportRepository
  constructor () {
    this.fileReportRepository = new FileReportRepository()
  }

  async updateOrCreateFileByUploaderId (message: any) {
    const fileFromDb: FileReport | undefined = await this.read(message.id)
    const filetoUpdate: FileReport = fileFromDb || new FileReport()

    filetoUpdate.uploaderId = message.uploaderId
    filetoUpdate.downloadsToday = message.downloadsToday
    filetoUpdate.downloadsTotal = message.downloadsTotal
    filetoUpdate.acumulatedSizeTotal = message.acumulatedSizeTotal
    filetoUpdate.acumulatedSizeDay = message.acumulatedSizeDay

    return await this.fileReportRepository.update(filetoUpdate)
  }

  async readAll () {
    return await this.fileReportRepository.readAll()
  }

  async read(id:number) {
    return await this.fileReportRepository.read(id)
  }

  async readByUploaderId(uploaderId: string) {
    try {
      const file: FileReport = await this.fileReportRepository.readByUploaderId(
        uploaderId
      );
      if (file) {
        return file;
      } else {
        throw new HttpError(404, `File with id "${uploaderId}" not found`);
      }
    } catch (error) {
      throw new HttpError(404, `File with id "${uploaderId}" not found`);
    }
  }
}
