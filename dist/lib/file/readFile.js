"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path = __importStar(require("path"));
function readFileWithValidation(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Step 1: Validate if the file path is provided
            if (!filePath) {
                throw new Error("File path is not provided.");
            }
            // Step 2: Resolve the absolute path
            const resolvedPath = path.resolve(process.cwd() + "/public" + filePath);
            // Step 3: Check if the file exists and is accessible
            const fileStats = yield fs_1.promises.stat(resolvedPath);
            // Step 4: Ensure that the path is a valid file (not a directory)
            if (!fileStats.isFile()) {
                throw new Error(`The path provided is not a file: ${resolvedPath}`);
            }
            // Step 5: Read the file content
            const fileContent = yield fs_1.promises.readFile(resolvedPath, "utf-8");
            // Step 6: Return the file content
            return fileContent;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.default = readFileWithValidation;
