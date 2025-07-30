import { createNewFolder, deleteUserFolder, getFolderById, updateUserFolder, getFilesByFolder, getFileById, saveFile, deleteUserFile } from "../db/queries.js";
import { format } from "date-fns";
import dotenv from "dotenv";
import { deleteCloudinaryFile } from "../config/upload.config.js";

dotenv.config("../.env");

function displayFolderForm(req, res) {
    res.render("folderForm", { type: "Create" });
}

function displayFileForm(req, res) {
    res.render("fileForm");
}

async function displayUpdateForm(req, res) {
    let { id } = req.params;
    const folder = await getFolderById(+id);
    res.render("folderForm", { type: "Update", folder });
}

function formatDateFileGrid(date) {
    return format(date, "dd.MM.yyyy");
}

function formatDateFileCard(date) {
    return format(date, "dd LLL yyyy");
}

async function displayFolderFiles(req, res) {
    let { id } = req.params;
    const files = await getFilesByFolder(+id);
    res.render("folderPage", { files, folder: files.length ? files[0].folder.name: "My Folder", id, formatDateFileGrid });
}

async function displayFile(req, res) {
    let { id } = req.params;
    const file = await getFileById(+id);

    const publicId = file.path.split("/").splice(7);
    const cloudName = process.env.CLOUDINARY_CLOUD;

    res.render("filePage", { file, publicId, cloudName, formatDateFileCard });
}

async function createFolder(req, res) {
    try {
        let { foldername } = req.body;
        let userId = req.user.id;

        let folder = await createNewFolder(foldername, userId);
        console.log("Folder created:", folder);

        res.status(200).redirect("/");

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function updateFolder(req, res) {
    try {
        let { foldername } = req.body;
        let { id } = req.params;

        let folder = await updateUserFolder(foldername, +id);
        console.log("Folder updated:", folder);

        res.status(200).redirect("/");

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function deleteFolder(req, res) {
    try {
        let { id } = req.params;

        let folder = await deleteUserFolder(+id);
        console.log("Folder deleted:", folder);

        res.status(200).redirect("/");

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function saveUploadedFile(req, res) {
    try {
        let fileName = req.file.originalname;
        let filePath = req.file.path;
        let fileSize = req.file.size;
        let { id } = req.params;

        const file = await saveFile(fileName, filePath, fileSize, +id);
        console.log("File saved in db: ", file);

        res.status(200).redirect(`/folder/${id}`);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function deleteFile(req, res) {
    try {
        let { id, folderId } = req.params;
        const file = await deleteUserFile(+id);
        console.log("Deleting file...", file.name, file.path);

        const publicId = file.path.split("/").splice(7)[0].split(".")[0];
        const { result } = await deleteCloudinaryFile(publicId);
        if (result !== "ok") {
            return res.status(500).json({
                success: false,
                message: "Couldn't delete file from cloudinary"
            });
        }
        res.status(200).redirect(`/folder/${folderId}`);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export {
    displayFolderForm,
    displayFileForm,
    createFolder,
    displayUpdateForm,
    updateFolder,
    deleteFolder,
    displayFolderFiles,
    displayFile,
    saveUploadedFile,
    deleteFile
}