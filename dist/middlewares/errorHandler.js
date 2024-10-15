"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = exports.notFoundRouteHandler = void 0;
const sendResponse_1 = require("../utils/sendResponse");
const errorFormatter_1 = require("../app/helpers/errorFormatter");
const zod_1 = require("zod");
const library_1 = require("@prisma/client/runtime/library");
const deleteFiles_1 = require("../lib/file/deleteFiles");
const notFoundRouteHandler = (req, res, next) => {
    next({ message: "Route not found", statusCode: 404 });
};
exports.notFoundRouteHandler = notFoundRouteHandler;
// global error handler
const globalErrorHandler = (error, req, res, next) => {
    // if headers sended then return next(error);
    if (res.headersSent)
        next(error);
    // delete uploaded files first
    if (req.files) {
        if (Array.isArray(req.files)) {
            for (const file of req.files) {
                (0, deleteFiles_1.deleteFile)(file);
            }
        }
        else {
            for (const files of Object.values(req.files)) {
                if (Array.isArray(files)) {
                    for (const file of files) {
                        (0, deleteFiles_1.deleteFile)(file);
                    }
                }
            }
        }
    }
    if (req.file) {
        (0, deleteFiles_1.deleteFile)(req.file);
    }
    let message = (error === null || error === void 0 ? void 0 : error.name) || "Internal server error!";
    let errorMessages = [
        { path: req.originalUrl, message: error === null || error === void 0 ? void 0 : error.message },
    ];
    if (error instanceof library_1.PrismaClientKnownRequestError) {
        const simplifiedError = (0, errorFormatter_1.formatPrismaClientKnownError)(error, req);
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMessages = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessages;
    }
    else if (error instanceof library_1.PrismaClientValidationError) {
        const simplifiedError = (0, errorFormatter_1.formatPrismaValidationError)(error, req);
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMessages = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessages;
    }
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, errorFormatter_1.formatZodError)(error);
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    (0, sendResponse_1.sendResponse)({
        res,
        success: false,
        message,
        data: error === null || error === void 0 ? void 0 : error.data,
        statusCode: (error === null || error === void 0 ? void 0 : error.statusCode) || 500,
        errorMessages,
    });
};
exports.globalErrorHandler = globalErrorHandler;
