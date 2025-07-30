import multer from "multer";
import path from "path";
import {v2 as cloudinary} from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";

dotenv.config("../.env");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

async function cloudinaryUpload(req, res, next) {
    try {
        console.log("uploading to cloudinary..");
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                (error, result) => {
                    if (result) resolve(result);
                    else reject(error);
                }
            );

            streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
        req.file.path = result.secure_url;
        next();
    } catch (error) {
        console.log("error uploading to cloudinary", error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function deleteCloudinaryFile(publicId){
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log(result);
        return result;
    } catch (error) {
        console.log("error deleting file from cloudinary", error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const upload = multer({storage: multer.memoryStorage()});
export {
    upload,
    cloudinaryUpload,
    deleteCloudinaryFile
};