import { Request, Response } from "express";
import GoogleDriveAccountService from "../../services/googleDriveAccountService";
import { GoogleDriveAccountValues } from '../../types';

const googleDriveAccountService = new GoogleDriveAccountService();

export default class GoogleDriveAccountController {
  static async create(req: Request, res: Response) {
    const { email, googleDriveKey } = req.body;
    const googleDriveAccountValues = {
      email,
      googleDriveKey,
    };
    try {
      const createdGoogleDriveAccount = await googleDriveAccountService.create(
        googleDriveAccountValues
      );
      return res.status(201).json(createdGoogleDriveAccount);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async read(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const googleDriveAccount = await googleDriveAccountService.read(id);
      return res.status(200).json(googleDriveAccount);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const updateGoogleDriveAccountValues: GoogleDriveAccountValues = {
      email: req.body.email || "",
      googleDriveKey: req.body.googleDriveKey || "",
    };
    try {
      const updatedGoogleDriveAccount = await googleDriveAccountService.update(
        id,
        updateGoogleDriveAccountValues
      );
      const succesfulUpdate = {
        message: "Google Drive Account successfully updated.",
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
      const deletedGoogleDriveAccountId =
        await googleDriveAccountService.delete(id);
      const succesfulDelete = {
        id: deletedGoogleDriveAccountId,
        message: "Google Drive Account successfully deleted.",
      };
      res.send(succesfulDelete);
      return res.status(204);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  }
}
