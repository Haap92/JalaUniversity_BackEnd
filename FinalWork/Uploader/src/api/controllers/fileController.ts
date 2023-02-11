import { Request, Response, NextFunction } from "express";
import { HttpError } from "../../middlewares/errorHandler";
import FileService from "../../services/fileService";
import { FileValues, status } from "../../types";

const fileService = new FileService();

export default class FileController {
  static async create(req: Request, res: Response, next: NextFunction) {
    const { name, formerName, size, mimetype } = req.body;
    const status: status = "Pending";
    if (!name || !formerName || !size || !mimetype || !status) {
      return next(
        new HttpError(
          400,
          "Bad Request!! Something went wrong with the file to upload, try with another file."
        )
      );
    }
    const fileValues: FileValues = {
      name,
      formerName,
      size,
      mimetype,
      status,
    };
    try {
      const createdFile = await fileService.create(fileValues);
      const succesfulCreate = {
        message: "File succesfully created.",
        file: createdFile,
      };
      return res.status(201).json(succesfulCreate);
    } catch (error) {
      if (error instanceof HttpError) {
        next(error);
      } else {
        next(new HttpError(400, error.message));
      }
    }
  }

  static async read(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const file = await fileService.read(id);
      const succesfulRead = {
        message: `File with id: "${id}".`,
        file: file,
      };
      return res.status(200).json(succesfulRead);
    } catch (error) {
      if (error instanceof HttpError) {
        next(error);
      } else {
        next(new HttpError(400, error.message));
      }
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const fileValues: FileValues = {
      name: req.body.name || "",
      formerName: req.body.formerName || "",
      size: req.body.size || null,
      mimetype: req.body.mimetype || "",
      driveId: req.body.driveId || "",
      status: req.body.status || "Pending",
    };
    try {
      await fileService.update(id, fileValues);
      const succesfulUpdate = {
        message: "File successfully updated.",
        file: fileValues,
      };
      return res.status(200).json(succesfulUpdate);
    } catch (error) {
      if (error instanceof HttpError) {
        next(error);
      } else {
        next(new HttpError(400, error.message));
      }
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const deletedFileId = await fileService.delete(id);
      const succesfulDelete = {
        message: "File successfully deleted.",
        id: deletedFileId,
      };
      return res.status(204).json(succesfulDelete);
    } catch (error) {
      if (error instanceof HttpError) {
        next(error);
      } else {
        next(new HttpError(400, error.message));
      }
    }
  }
}
