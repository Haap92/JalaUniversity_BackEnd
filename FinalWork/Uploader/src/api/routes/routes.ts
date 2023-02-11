import express from "express";
import FileController from "../controllers/fileController";
import GoogleDriveAccountController from "../controllers/googleDriveAccountController";

const router = express.Router();

router.post("/files", FileController.create);
router.get("/files/:id", FileController.read);
router.put("/files/:id", FileController.update);
router.delete("/files/:id", FileController.delete);

router.post("/google-drive-accounts", GoogleDriveAccountController.create);
router.get("/google-drive-accounts/:id", GoogleDriveAccountController.read);
router.put("/google-drive-accounts/:id", GoogleDriveAccountController.update);
router.delete(
  "/google-drive-accounts/:id",
  GoogleDriveAccountController.delete
);

export default router;
