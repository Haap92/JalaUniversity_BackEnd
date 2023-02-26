import { Request, Response, NextFunction } from "express";
import { HttpError } from "../../middlewares/errorHandler";
import DriveAccountService from "../../services/driveAccountService";

const driveAccountService = new DriveAccountService();

export class DriveAccountController {
  static async readAll(req: Request, res: Response, next: NextFunction) {
    try {
      const accounts = await driveAccountService.readAll();
      res.status(200).json({
        message: "Accounts found",
        accounts: accounts,
      });
    } catch (error) {
      if (error instanceof HttpError) {
        next(error);
      } else {
        next(new HttpError(400, error.message));
      }
    }
  }

  static async readActiveAccounts(req: Request, res: Response, next: NextFunction) {
    try {
      const accounts = await driveAccountService.readActiveAccounts();
      res.status(200).json({
        message: "Accounts found",
        accounts: accounts,
      });
    } catch (error) {
      if (error instanceof HttpError) {
        next(error);
      } else {
        next(new HttpError(400, error.message));
      }
    }
  }

  static async readByAccountId(req: Request, res: Response, next: NextFunction) {
    const { accountId } = req.params;
    try {
      const account = await driveAccountService.readByAccountId(accountId);
      const succesfulRead = {
        message: `Account with id: "${accountId}".`,
        account: account,
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
