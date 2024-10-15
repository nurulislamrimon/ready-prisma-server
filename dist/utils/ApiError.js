"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
// Custom error class
class ApiError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.ApiError = ApiError;
