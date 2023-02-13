import express from "express";
import DownloadFileController from "../controllers/DownloadFileController";

const router = express.Router();

router.post("/download-files", DownloadFileController.create)
router.get("/download-files/:id", DownloadFileController.read);
router.get("/download-files/", DownloadFileController.readAll);
router.get("/download-files/uploader/:uploaderId", DownloadFileController.readByUploaderId);
router.put("/download-files/:id", DownloadFileController.update);
router.delete("/download-files/:id", DownloadFileController.delete);

export default router;