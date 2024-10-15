"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatZodError = exports.formatPrismaValidationError = void 0;
exports.formatPrismaClientKnownError = formatPrismaClientKnownError;
// ------------------------------------------
// format prisma error
// ------------------------------------------
const formatPrismaValidationError = (error, req) => {
    const errors = [
        {
            path: req.originalUrl,
            message: error.message,
        },
    ];
    return {
        message: "Validation Error",
        errorMessages: errors,
    };
};
exports.formatPrismaValidationError = formatPrismaValidationError;
function formatPrismaClientKnownError(error, req) {
    var _a;
    let errorMessages = [];
    let message = error.name;
    if (error.code === "P2025") {
        message = ((_a = error.meta) === null || _a === void 0 ? void 0 : _a.cause) || "Record not found!";
        errorMessages = [
            {
                path: "",
                message,
            },
        ];
    }
    else if (error.code === "P2003") {
        if (error.message.includes("delete()` invocation:")) {
            message = "Delete failed";
            errorMessages = [
                {
                    path: "",
                    message,
                },
            ];
        }
    }
    else {
        errorMessages = [
            {
                path: req.originalUrl,
                message: (error === null || error === void 0 ? void 0 : error.message) || "An unknown error occurred",
            },
        ];
    }
    return { message, errorMessages };
}
// ------------------------------------------
// format zod error
// ------------------------------------------
const formatZodError = (error) => {
    const errors = error.issues.map((issue) => {
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
            message: issue === null || issue === void 0 ? void 0 : issue.message,
        };
    });
    return {
        message: "Validation Error",
        errorMessages: errors,
    };
};
exports.formatZodError = formatZodError;
