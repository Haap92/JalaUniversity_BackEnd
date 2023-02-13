import { Request, Response, NextFunction } from "express";
import multer from "multer";
import DownloadFile from "../../db/entities/downloadFile";
import { HttpError } from "../../middlewares/errorHandler";
import DownloadFileService from "../../services/downloadFileService";
import { DownloadFileValues } from "../../types";

const downloadFileService = new DownloadFileService();

export default class DownloadFileController {

  static async create(req: Request, res: Response, next: NextFunction) {
    const { uploaderId, driveId, webViewLink, webContentLink, size, accountIndex} = req.body;
    if (!uploaderId || !driveId || !webViewLink || !webContentLink || !webContentLink ||!size ||!accountIndex) {
      return next(
        new HttpError(
          400,
          "Bad Request!! Something went wrong with the file to upload, try with another file."
        )
      );
    }
    const downloadFile = new DownloadFile();
    downloadFile.uploaderId = uploaderId;
    downloadFile.driveId = driveId;
    downloadFile.webViewLink = webViewLink;
    downloadFile.webContentLink = webContentLink;
    downloadFile.size = size;
    downloadFile.accountIndex = accountIndex;
    try {
      const createdDownloadFile = await downloadFileService.create(downloadFile);
      const succesfulCreate = {
        message: "File succesfully created.",
        data: createdDownloadFile,
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
    const id = parseInt(req.params.id);
    try {
      const file = await downloadFileService.read(id);
      const succesfulRead = {
        message: `Download File with id: "${id}".`,
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
      const files = await downloadFileService.readAll();
      res.status(200).json({
        message: "Files found",
        data: files,
      });
    } catch (error) {
      if(error instanceof HttpError) {
        next(error);
      }
      else {
        next(new HttpError(400, error.message))
      }
    }
  }

  static async readByUploaderId(req: Request, res: Response, next: NextFunction) {
    const { uploaderId } = req.params;
    try {
      const file = await downloadFileService.readByUploaderId(uploaderId);
      const succesfulRead = {
        message: `Download Files with Uploader id: "${uploaderId}".`,
        files: file,
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
    const id = parseInt(req.params.id);
    const downloadFileValues: DownloadFileValues = {
      uploaderId: req.body.uploaderId || "",
      driveId: req.body.driveId || "",
      webViewLink: req.body.webViewLink || "",
      webContentLink: req.body.webContentLink || "",
      size: req.body.size || null,
      accountIndex: req.body.accountIndex || null,
    };
    try {
      await downloadFileService.update(id, downloadFileValues);
      const succesfulUpdate = {
        message: "Download File successfully updated.",
        updatedFields: downloadFileValues,
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
    const id = parseInt(req.params.id);
    try {
      const deletedFileId = await downloadFileService.delete(id);
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
