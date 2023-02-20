import express from "express";
import DownloadFileController from "../controllers/downloadFileController";

const router = express.Router();

router.post("/download-files", DownloadFileController.create)
router.get("/download-files/:id", DownloadFileController.read);
router.get("/download-files/", DownloadFileController.readAll);
router.get("/download-files/uploader/:uploaderId", DownloadFileController.readByUploaderId);
router.get("/download-files/download/:uploaderId", DownloadFileController.getWebLinksByUploaderId);
router.put("/download-files/:id", DownloadFileController.update);
router.delete("/download-files/:id", DownloadFileController.delete);

export default router;