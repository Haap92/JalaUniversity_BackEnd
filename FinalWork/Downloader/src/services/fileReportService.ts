import { HttpError } from "../middlewares/errorHandler";
import { FileReportRepository } from "../db/repositories/fileReportRepository";
import FileReport from "../db/entities/fileReport";
import { NewFileReportValues } from "../types";

export default class FileReportService {
  private fileReportRepository: FileReportRepository;
  constructor() {
    this.fileReportRepository = new FileReportRepository();
  }

  async create(fileReport: NewFileReportValues) {
    const newFileReport = new FileReport();
    newFileReport.uploaderId = fileReport.uploaderId;
    newFileReport.downloadsTotal = fileReport.downloadsTotal;
    newFileReport.downloadsToday = fileReport.downloadsToday;
    newFileReport.acumulatedSizeTotal = fileReport.acumulatedSizeTotal;
    newFileReport.acumulatedSizeDay = fileReport.acumulatedSizeDay;
    try {
      const createdFileReport = await this.fileReportRepository.create(
        newFileReport
      );
      return createdFileReport;
    } catch (error) {
      throw new HttpError(400, error.message);
    }
  }

  async updateFileReport(updateFile: FileReport) {
    const existingFile = await this.read(updateFile.id);
    if (!existingFile) {
      throw new Error("File not found");
    }

    existingFile.uploaderId = updateFile.uploaderId;
    existingFile.downloadsToday = updateFile.downloadsToday;
    existingFile.downloadsTotal = updateFile.downloadsTotal;
    existingFile.acumulatedSizeTotal = updateFile.acumulatedSizeTotal;
    existingFile.acumulatedSizeDay = updateFile.acumulatedSizeDay;

    return await this.fileReportRepository.update(existingFile);
  }

  async readAll() {
    return await this.fileReportRepository.readAll();
  }

  async read(id: number) {
    return await this.fileReportRepository.read(id);
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

  async dailyUpdateDownloads() {
    this.fileReportRepository.dailyUpdate();
  }
}
