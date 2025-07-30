import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createNewFolder(name, id) {
    const folder = await prisma.folder.create({
        data: {
            name: name,
            user_id: id
        }
    });

    return folder;
}

async function updateUserFolder(name, id) {
    const folder = await prisma.folder.update({
        data: {
            name: name,
        },
        where: {
            id: id
        }
    });

    return folder;
}

async function deleteUserFolder(id) {
    const folder = await prisma.folder.delete({
        include: {
            files: true
        },
        where: {
            id: id
        }
    });

    return folder;
}

async function deleteUserFile(id) {
    const file = await prisma.file.delete({
        where: {
            id: id
        }
    });

    return file;
}

async function getAllFolders() {
    const folders = await prisma.folder.findMany({
        include: {
            _count: {
                select: {
                    files: true
                }
            }
        }
    });
    const folderSums = await prisma.file.groupBy({
        by: ['folder_id'],
        _sum: {
            size: true,
        },
    });
    
    console.log(folderSums);
    return [folders, folderSums];
}

async function getFilesByFolder(folderId) {
    const files = await prisma.file.findMany({
        include: {
            folder: true
        },
        where: {
            folder_id: folderId
        }
    });

    return files;
}

async function getFileById(id) {
    const file = await prisma.file.findFirst({
        where: {
            id: id
        }
    });

    return file;
}

async function getFolderById(id) {
    const folder = await prisma.folder.findFirst({
        where: {
            id: id
        }
    });

    return folder;
}

async function saveFile(name, path, size, folder_id) {
    const file = await prisma.file.create({
        data: {
            name: name,
            path: path,
            size: size,
            folder_id: folder_id
        }
    });

    return file;
}


async function createNewUser(username, password) {
    const user = await prisma.user.create({
        data: {
            username: username,
            password: password
        }
    });

    return user;
}

async function getUserById(id) {
    const user = await prisma.user.findFirst({
        where: {
            id: id
        }
    });

    return user;
}

async function getUserByUsername(username) {
    const user = await prisma.user.findFirst({
        where: {
            username: username
        }
    });

    return user;
}

export {
    createNewFolder,
    updateUserFolder,
    deleteUserFolder,
    deleteUserFile,
    getFolderById,
    getFileById,
    getFilesByFolder,
    createNewUser,
    getUserById,
    getUserByUsername,
    getAllFolders,
    saveFile
}