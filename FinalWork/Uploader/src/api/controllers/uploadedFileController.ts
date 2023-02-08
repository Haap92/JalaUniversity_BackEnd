import { Request, Response } from "express";
import UploadedFile from "../../model/entities/uploadedFile";
import UploadedFileService from "../../Services/uploadedFileService";

const uploadedFileService = new UploadedFileService();

export default class UploadedFileController {
  static async create(req: Request, res: Response) {
    const { name, size, driveId, status } = req.body;
    const uploadedFile = new UploadedFile();
    uploadedFile.name = name;
    uploadedFile.size = size;
    uploadedFile.driveId = driveId;
    uploadedFile.status = status;
    try {
      const createdUploadedFile = await uploadedFileService.create(
        uploadedFile
      );
      return res.status(201).json(createdUploadedFile);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async read(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const uploadedFile = await uploadedFileService.read(id);
      return res.status(200).json(uploadedFile);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const uploadedFile = req.body;
    uploadedFile.id = id;
    try {
      await uploadedFileService.update(uploadedFile);
      return res.status(200).json(uploadedFile);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const message = await uploadedFileService.delete(id);
      return res.status(204).json({ message });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
