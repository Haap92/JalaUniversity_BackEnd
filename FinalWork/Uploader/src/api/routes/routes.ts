import express from "express";
import FileController from "../controllers/fileController";
import GoogleDriveAccountController from "../controllers/googleDriveAccountController";
import { upload, handleFileUpload } from "../../services/gridFsService";

const router = express.Router();

router.post("/files", upload.single("file"), handleFileUpload)
router.get("/files/:id", FileController.read);
router.get("/files/", FileController.readAll);
router.put("/files/:id", FileController.update);
router.delete("/files/:id", FileController.delete);

router.post("/google-drive-accounts", GoogleDriveAccountController.create);
router.get("/google-drive-accounts/:id", GoogleDriveAccountController.read);
router.get("/google-drive-accounts/", GoogleDriveAccountController.readAll);
router.put("/google-drive-accounts/:id", GoogleDriveAccountController.update);
router.delete(
  "/google-drive-accounts/:id",
  GoogleDriveAccountController.delete
);

export default router;