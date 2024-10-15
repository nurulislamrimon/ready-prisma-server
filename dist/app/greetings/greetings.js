"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse_1 = require("../../utils/sendResponse");
const greetings = (req, res) => {
    (0, sendResponse_1.sendResponse)({
        res,
        success: true,
        message: "Welcome to the combination of power api!",
        data: "Thank you for using our service.",
        statusCode: 200,
    });
};
exports.default = greetings;
