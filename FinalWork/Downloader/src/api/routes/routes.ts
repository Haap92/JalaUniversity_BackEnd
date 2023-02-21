import express from "express";
import DownloadFileController from "../controllers/downloadFileController";
import { DriveAccountController } from "../controllers/driveAccountController";
import { FileReportController } from "../controllers/fileReportController";

const router = express.Router();

router.post("/download-files", DownloadFileController.create)
router.get("/download-files/:id", DownloadFileController.read);
router.get("/download-files", DownloadFileController.readAll);
router.get("/download-files/uploader/:uploaderId", DownloadFileController.readByUploaderId);
router.get("/download-files/download/:uploaderId", DownloadFileController.getWebLinksByUploaderId);
router.put("/download-files/:id", DownloadFileController.update);
router.delete("/download-files/:id", DownloadFileController.delete);

router.get("/drive-accounts", DriveAccountController.readAll);
router.get("/drive-accounts/account/:accountId", DriveAccountController.readByAccountId);

router.get("/file-reports", FileReportController.readAll);
router.get("/file-reports/file/:uploaderId", FileReportController.readByUploaderId);

export default router;