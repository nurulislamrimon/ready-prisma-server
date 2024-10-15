"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = void 0;
const fs_1 = __importDefault(require("fs"));
// ===========================
// delete existing file=======
// ===========================
const deleteFile = (filePath) => {
    try {
        if (typeof filePath !== "string") {
            filePath = filePath.path;
        }
        else {
            filePath = process.cwd() + "/public/" + filePath;
        }
        if (fs_1.default.existsSync(filePath)) {
            fs_1.default.unlink(filePath, (err) => {
                if (err) {
                    if (err.code === "ENOENT") {
                        console.log(`${filePath} does not exist.`);
                        return true; // File doesn't exist, return true
                    }
                    else {
                        console.log(`Error deleting file ${filePath}: ${err}`);
                        return false; // Failed to delete file, return false
                    }
                }
                else {
                    console.log(`${filePath} deleted successfully.`);
                    return true; // File deleted successfully
                }
            });
        }
        else {
            console.log(`${filePath} does not exist.`);
            return true; // File doesn't exist, return true
        }
    }
    catch (error) {
        console.log(`Error deleting file ${filePath}: ${error}`);
        return false; // Failed to delete file, return false
    }
};
exports.deleteFile = deleteFile;
