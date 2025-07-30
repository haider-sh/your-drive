import { Router } from "express";
import { createFolder, deleteFolder, displayFolderForm, displayUpdateForm, updateFolder,displayFolderFiles, displayFile, displayFileForm, saveUploadedFile, deleteFile, displayShareForm, shareFolder, getSharedFolder } from "../controllers/folder.controller.js";
import {upload, cloudinaryUpload} from "../config/upload.config.js";

const router = Router();

router.get("/create", displayFolderForm);
router.get("/:id/file/create", displayFileForm);
router.get("/:folderId/file/:id", displayFile);
router.get("/:id", displayFolderFiles);
router.get("/update/:id", displayUpdateForm);
router.get("/delete/:id", deleteFolder);
router.get("/shareFolder/:id", displayShareForm);
router.get("/share/:id", getSharedFolder);
router.get("/:folderId/file/delete/:id", deleteFile);

router.post("/create", createFolder);
router.post("/update/:id", updateFolder);
router.post("/shareFolder/:id", shareFolder);
router.post("/:id/file/create", upload.single("file"), cloudinaryUpload, saveUploadedFile);

export default router;