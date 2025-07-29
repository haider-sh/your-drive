import { Router } from "express";
import { createFolder, deleteFolder, displayFolderForm, displayUpdateForm, updateFolder,displayFolderFiles, displayFile } from "../controllers/folder.controller.js";

const router = Router();

router.get("/create", displayFolderForm);
router.get("/file/:id", displayFile);
router.get("/:id", displayFolderFiles);
router.get("/update/:id", displayUpdateForm);
router.get("/delete/:id", deleteFolder);

router.post("/create", createFolder);
router.post("/update/:id", updateFolder);

export default router;