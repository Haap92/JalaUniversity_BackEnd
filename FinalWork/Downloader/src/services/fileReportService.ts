import { HttpError } from "../middlewares/errorHandler";
import { FileReportRepository } from "../db/repositories/fileReportRepository";
import FileReport from "../db/entities/fileReport";
import { NewFileReportValues } from "../types";



export default class FileReportService {
  private fileReportRepository : FileReportRepository
  constructor () {
    this.fileReportRepository = new FileReportRepository()
  }

  async create (fileReport: NewFileReportValues) {

    const newFileReport = new FileReport;
    newFileReport.uploaderId = fileReport.uploaderId;
    newFileReport.downloadsTotal = fileReport.downloadsTotal;
    newFileReport.downloadsToday = fileReport.downloadsToday;
    newFileReport.acumulatedSizeTotal = fileReport.acumulatedSizeTotal;
    newFileReport.acumulatedSizeDay = fileReport.acumulatedSizeDay;
    try {
      const createdFileReport = await this.fileReportRepository.create(newFileReport);
      return createdFileReport;
    } catch (error) {
        throw(new HttpError(400, error.message));
      }
  }

  async updateFileReportById (message: any) {
    const filetoUpdate: FileReport | undefined = await this.read(message.id)

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
