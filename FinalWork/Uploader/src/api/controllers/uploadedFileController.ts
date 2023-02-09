import { Request, Response } from "express";
import UploadedFileService from "../../Services/uploadedFileService";
import { UploadedFileValues } from "../../types";

const uploadedFileService = new UploadedFileService();

export default class UploadedFileController {
  static async create(req: Request, res: Response) {
    const { name, size, driveId, status } = req.body;
    const uploadedFileValues = {
      name,
      size,
      driveId,
      status,
    };
    try {
      const createdUploadedFile = await uploadedFileService.create(
        uploadedFileValues
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
    const updateUploadedFileValues: UploadedFileValues = {
      name: req.body.name || "",
      size: req.body.size || "",
      driveId: req.body.driveId || "",
      status: req.body.status || "",
    };
    try {
      const updatedUploadedFile = await uploadedFileService.update(
        id,
        updateUploadedFileValues
      );
      const succesfulUpdate = {
        message: "Uploaded File successfully updated.",
      };
      res.send(succesfulUpdate);
      return res.status(200);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deletedUploadedFileId = await uploadedFileService.delete(id);
      const succesfulDelete = {
        id: deletedUploadedFileId,
        message: "Uploaded File successfully deleted.",
      };
      res.send(succesfulDelete);
      return res.status(204);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
