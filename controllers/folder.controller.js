import { createNewFolder, deleteUserFolder, getFolderById, updateUserFolder,getFilesByFolder, getFileById } from "../db/queries.js";

function displayFolderForm(req, res) {
    res.render("folderForm", { type: "Create" });
}

async function displayUpdateForm(req, res) {
    let { id } = req.params;
    const folder = await getFolderById(+id);
    res.render("folderForm", { type: "Update", folder });
}

async function displayFolderFiles(req, res) {
    let { id } = req.params;
    const files = await getFilesByFolder(+id);
    res.render("folderPage", { files });
}

async function displayFile(req, res) {
    let { id } = req.params;
    const file = await getFileById(+id);
    res.render("filePage", { file });
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

export {
    displayFolderForm,
    createFolder,
    displayUpdateForm,
    updateFolder,
    deleteFolder,
    displayFolderFiles,
    displayFile
}