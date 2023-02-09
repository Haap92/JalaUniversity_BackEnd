import express from "express";
import UploadedFileController from "../controllers/uploadedFileController";
import GoogleDriveAccountController from "../controllers/googleDriveAccountController";

const router = express.Router();

router.post("/uploaded-files", UploadedFileController.create);
router.get("/uploaded-files/:id", UploadedFileController.read);
router.put("/uploaded-files/:id", UploadedFileController.update);
router.delete("/uploaded-files/:id", UploadedFileController.delete);

router.post("/google-drive-accounts", GoogleDriveAccountController.create);
router.get("/google-drive-accounts/:id", GoogleDriveAccountController.read);
router.put("/google-drive-accounts/:id", GoogleDriveAccountController.update);
router.delete(
  "/google-drive-accounts/:id",
  GoogleDriveAccountController.delete
);

export default router;
