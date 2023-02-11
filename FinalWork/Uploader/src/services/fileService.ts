import File from "../db/entities/File";
import { FileRepository } from "../db/repositories/fileRepository";
import { FileValues } from "../types";
import { HttpError } from "../middlewares/errorHandler";

export default class FileService {
  protected fileRepository: FileRepository;
  constructor() {
    this.fileRepository = new FileRepository();
  }

  async create(fileValues: FileValues) {
    try {
      const file = new File();
      file.name = fileValues.name;
      file.formerName = fileValues.formerName;
      file.size = fileValues.size;
      file.mimetype = fileValues.mimetype;
      file.driveId = fileValues.driveId;
      file.status = fileValues.status;
      await this.fileRepository.create(file);
      return file;
    } catch (error) {
      throw new HttpError(400, "Bad request, file could not be created.");
    }
  }

  async read(id: string) {
    try {
      const File = await this.fileRepository.read(id);
      return File;
    } catch (error) {
      throw new HttpError(404, `File with id "${id}" not found`);
    }
  }

  async update(id: string, updateFile: FileValues) {
    try {
      const readedFile = await this.read(id);
      if (readedFile) {
        readedFile.name =
          updateFile.name === "" ? readedFile.name : updateFile.name;

        readedFile.formerName =
          updateFile.formerName === ""
            ? readedFile.formerName
            : updateFile.formerName;

        readedFile.size =
          updateFile.size === null ? readedFile.size : updateFile.size;

        readedFile.mimetype =
          updateFile.mimetype === ""
            ? readedFile.mimetype
            : updateFile.mimetype;

        readedFile.driveId =
          updateFile.driveId === "" ? readedFile.driveId : updateFile.driveId;

        readedFile.status =
          updateFile.status === "Pending"
            ? readedFile.status
            : updateFile.status;

        return await this.fileRepository.update(readedFile);
      }
    } catch (error) {
      throw new HttpError(
        404,
        `Failed to update File, File with id: "${id}" not found`
      );
    }
  }

  async delete(id: string) {
    try {
      return await this.fileRepository.delete(id);
    } catch (error) {
      throw new HttpError(
        404,
        `Failed to Delete File, File with id: "${id}" not found`
      );
    }
  }
}
