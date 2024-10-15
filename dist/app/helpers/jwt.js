"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// -----------------------------------------
// generate token
// -----------------------------------------
const generateToken = (user, tokenSecret, expiresIn) => {
    const token = jsonwebtoken_1.default.sign({ email: user.email, role: user.role }, tokenSecret, {
        expiresIn,
    });
    return token;
};
exports.generateToken = generateToken;
// --------------------------------------
// verify the token
// --------------------------------------
const verifyToken = (token, tokenSecret) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, tokenSecret);
        return decoded;
    }
    catch (error) {
        throw error;
    }
};
exports.verifyToken = verifyToken;
