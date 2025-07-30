import { createNewFolder, deleteUserFolder, getFolderById, updateUserFolder, getFilesByFolder, getFileById, saveFile, deleteUserFile, createSharedFolder, getSharedFolderById } from "../db/queries.js";
import { addDays, compareAsc, format } from "date-fns";
import dotenv from "dotenv";
import { deleteCloudinaryFile } from "../config/upload.config.js";
import { v4 as uuidv4 } from "uuid";

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

function convertToLocalTime(timestamp) {
    const date = new Date(timestamp);

    const options = {
        timeZone: 'Asia/Karachi',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };

    const formatted = new Intl.DateTimeFormat('en-US', options).format(date);
    console.log(formatted);
    return formatted;

}

async function displayFolderFiles(req, res) {
    let { id } = req.params;
    console.log(id);
    const files = await getFilesByFolder(+id);
    res.render("folderPage", { files, folder: files.length ? files[0].folder : null, id, formatDateFileGrid });
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

function displayShareForm(req, res) {
    let { id } = req.params;
    res.render("shareForm", { id });
}

async function shareFolder(req, res) {
    try {
        let { id } = req.params;
        let { duration } = req.body;
        let share_id = uuidv4();

        let shared = await createSharedFolder(+id, share_id, +duration);
        console.log("Created shared folder", shared);
        const link = req.host + req.baseUrl + "/share/" + shared.id;
        res.status(200).render("linkPage", {link});
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function getSharedFolder(req, res) {
    try {
        let { id } = req.params;
        let shared = await getSharedFolderById(id);

        if (!shared) {
            return res.status(400).json({
                success: false,
                message: "Invalid link."
            });
        }

        let validity = addDays(shared.start_time, shared.duration);
        validity = convertToLocalTime(validity);
        let currentDate = convertToLocalTime(new Date());
        console.log("Current Date:", currentDate, "Valid until: ", validity);
        if (compareAsc(currentDate, validity) === 1) {
            return res.status(400).json({
                success: false,
                message: "This link has expired."
            });
        }
        res.status(200).render("folderPage", { files: shared.folder.files, folder: shared.folder, id, formatDateFileGrid });

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
    deleteFile,
    displayShareForm,
    shareFolder,
    getSharedFolder
}