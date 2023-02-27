import { Request, Response, NextFunction } from "express";
import multer from "multer";
import File from "../../db/entities/File";
import { HttpError } from "../../middlewares/errorHandler";
import FileService from "../../services/fileService";
import { FileValues, status } from "../../types";

const fileService = new FileService();

export default class FileController {
  static async create(req: Request, res: Response, next: NextFunction) {
    const { filename, originalname, size, mimetype } = req.file;
    const status: status = "Pending";
    if (!filename || !originalname || !size || !mimetype || !status) {
      return next(
        new HttpError(
          400,
          "Bad Request!! Something went wrong with the file to upload, try with another file."
        )
      );
    }
    const file = new File();
    file.filename = filename;
    file.originalname = originalname;
    file.size = size;
    file.mimetype = mimetype;
    file.status = status;
    try {
      const createdFile = await fileService.create(file);
      const succesfulCreate = {
        message: "File succesfully created.",
        data: createdFile,
      };
      return res.status(201).json(succesfulCreate);
    } catch (error) {
      if (error instanceof HttpError || error instanceof multer.MulterError) {
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

  static async readAll(req: Request, res: Response, next: NextFunction) {
    try {
      const files = await fileService.readAll();
      res.status(200).json({
        message: "Files found",
        data: files,
      });
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
      filename: req.body.filename || "",
      originalname: req.body.originalname || "",
      size: req.body.size || null,
      mimetype: req.body.mimetype || "",
      driveId: req.body.driveId || "",
      status: req.body.status || "Pending",
    };
    try {
      await fileService.update(id, fileValues);
      const succesfulUpdate = {
        message: "File successfully updated.",
        updatedFields: fileValues,
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
      return res.status(200).json(succesfulDelete);
    } catch (error) {
      if (error instanceof HttpError) {
        next(error);
      } else {
        next(new HttpError(400, error.message));
      }
    }
  }
}
