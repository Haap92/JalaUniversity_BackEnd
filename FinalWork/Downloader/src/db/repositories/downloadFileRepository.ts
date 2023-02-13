import { AppDataSource } from "../db-source";
import DownloadFile from "../entities/downloadFile";

export default class DownloadFileRepository {
  protected repository = AppDataSource.getRepository(DownloadFile);

  async create(downloadFile: DownloadFile) {
    await this.repository.save(downloadFile);
    return downloadFile;
  }

  async read(id: number) {
    return await this.repository.findOneBy({
      id: id,
    });
  }

  async readAll() {
    const downloadFiles = await this.repository.find();
    return downloadFiles
      ? downloadFiles.map((downloadFile) => downloadFile as DownloadFile)
      : undefined;
  }

  async readByUploaderId(uploaderId: string) {
    const readedUploaderId = await this.repository.find({ where: { uploaderId: uploaderId } });
    if (readedUploaderId){
    return readedUploaderId
    }
  }

  async update(downloadFile: DownloadFile) {
    return await this.repository.save(downloadFile);
  }

  async delete(id: number) {
    const deletedFile = await this.repository.delete({
      id: id,
    });
    if (deletedFile) {
      return deletedFile;
    } else {
      throw new Error(`Uploaded File with id:${id} not found`);
    }
  }
}
