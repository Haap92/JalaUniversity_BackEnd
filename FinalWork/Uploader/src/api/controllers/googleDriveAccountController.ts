import { Request, Response } from "express";
import GoogleDriveAccount from "../../model/entities/googleDriveAccount";
import GoogleDriveAccountService from "../../services/googleDriveAccountService";

const googleDriveAccountService = new GoogleDriveAccountService();

export default class GoogleDriveAccountController {
  static async create(req: Request, res: Response) {
    const { email, googleDriveKey } = req.body;
    const googleDriveAccount = new GoogleDriveAccount();
    googleDriveAccount.email = email;
    googleDriveAccount.googleDriveKey = googleDriveKey;
    try {
      const createdGoogleDriveAccount = await googleDriveAccountService.create(
        googleDriveAccount
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
    const googleDriveAccount = req.body;
    googleDriveAccount.id = id;
    try {
      await googleDriveAccountService.update(googleDriveAccount);
      return res.status(200).json(googleDriveAccount);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const message = await googleDriveAccountService.delete(id);
      return res.status(204).json({ message });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
