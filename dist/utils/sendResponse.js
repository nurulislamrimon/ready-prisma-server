"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = ({ res, success, message, data, meta, statusCode = 200, errorMessages, }) => {
    console.log(message);
    res.status(statusCode).json({
        success,
        message,
        meta,
        data,
        errorMessages,
    });
};
exports.sendResponse = sendResponse;
