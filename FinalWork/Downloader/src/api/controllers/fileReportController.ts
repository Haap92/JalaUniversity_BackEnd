import { Request, Response, NextFunction } from "express";
import { HttpError } from "../../middlewares/errorHandler";
import FileReportService from "../../services/fileReportService";

const fileReportService = new FileReportService();

export class FileReportController {
  static async readAll(req: Request, res: Response, next: NextFunction) {
    try {
      const files = await fileReportService.readAll();
      res.status(200).json({
        message: "Files found",
        files: files,
      });
    } catch (error) {
      if (error instanceof HttpError) {
        next(error);
      } else {
        next(new HttpError(400, error.message));
      }
    }
  }

  static async readByUploaderId(req: Request, res: Response, next: NextFunction) {
    const { uploaderId } = req.params;
    try {
      const file = await fileReportService.readByUploaderId(uploaderId);
      const succesfulRead = {
        message: `File with id: "${uploaderId}".`,
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
}
