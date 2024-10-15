"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFiles = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const ApiError_1 = require("../../utils/ApiError");
const uploadFiles = ({ folder, size = 2000000, file_types = ["image/png", "image/jpg", "image/jpeg"], }) => {
    const UPLOAD_FOLDER = "/public/" + folder;
    // Function to create folder if it doesn't exist
    const createFolderIfNotExist = (folderPath) => {
        if (!fs_1.default.existsSync(folderPath)) {
            fs_1.default.mkdirSync(folderPath, { recursive: true });
        }
    };
    // multer upload destination and files name
    const storage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            const folderPath = process.cwd() + UPLOAD_FOLDER;
            createFolderIfNotExist(folderPath); // Create folder if it doesn't exist
            cb(null, folderPath);
        },
        filename: (req, file, cb) => {
            const fileExt = path_1.default.extname(file.originalname);
            const filename = file.originalname
                .replace(fileExt, "")
                .toLowerCase()
                .split(" ")
                .join("-") +
                Date.now() +
                fileExt;
            // add the file path to the req
            req.uploadedFolder = folder;
            cb(null, filename);
        },
    });
    // multer upload functionality
    return (0, multer_1.default)({
        storage,
        limits: { fileSize: size },
        fileFilter(req, file, cb) {
            if (file_types.includes(file.mimetype)) {
                cb(null, true);
            }
            else {
                cb(new ApiError_1.ApiError(400, "The file format is not allowed!"));
            }
        },
    });
};
exports.uploadFiles = uploadFiles;
