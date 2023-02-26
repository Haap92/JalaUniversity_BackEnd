import { NextFunction, Request, Response } from "express";
import { HttpError } from "../../middlewares/errorHandler";
import GoogleDriveAccountService from "../../services/googleDriveAccountService";
import { GoogleDriveAccountValues } from "../../types";

const googleDriveAccountService = new GoogleDriveAccountService();

export default class GoogleDriveAccountController {
  static async create(req: Request, res: Response, next: NextFunction) {
    const { email, clientID, clientSecret, redirectUri, refreshToken } =
      req.body;
    if (!email || !clientID || !clientSecret || !redirectUri || !refreshToken) {
      return next(
        new HttpError(
          400,
          "Bad Request!! All fields are required to create a valid Google Drive Account."
        )
      );
    }
    const googleDriveAccountValues: GoogleDriveAccountValues = {
      email,
      clientID,
      clientSecret,
      redirectUri,
      refreshToken,
    };
    try {
      const createdGoogleDriveAccount = await googleDriveAccountService.create(
        googleDriveAccountValues
      );
      const succesfulCreate = {
        message: "Google Drive Account succesfully created.",
        account: createdGoogleDriveAccount,
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
      const googleDriveAccount = await googleDriveAccountService.read(id);
      const succesfulRead = {
        message: `Google Drive Account with id: "${id}".`,
        account: googleDriveAccount,
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
      const googleDriveAccounts = await googleDriveAccountService.readAll();
      res.status(200).json({
        message: "Accounts found",
        data: googleDriveAccounts,
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

  static async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const updateGoogleDriveAccountValues: GoogleDriveAccountValues = {
      email: req.body.email || "",
      clientID: req.body.clientID || "",
      clientSecret: req.body.clientSecret || "",
      redirectUri: req.body.redirectUri || "",
      refreshToken: req.body.refreshToken || "",
    };
    try {
      await googleDriveAccountService.update(
        id,
        updateGoogleDriveAccountValues
      );
      const succesfulUpdate = {
        message: "Google Drive Account successfully updated.",
        updatedFields: updateGoogleDriveAccountValues,
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
      const deletedGoogleDriveAccountId =
        await googleDriveAccountService.delete(id);
      const succesfulDelete = {
        message: "Google Drive Account qeued for deletion.",
        id: deletedGoogleDriveAccountId,
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
