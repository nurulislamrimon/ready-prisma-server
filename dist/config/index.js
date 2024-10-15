"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// find .env file in root and load the environment variables from it.
dotenv_1.default.config({ path: process.cwd() + "/.env" });
//  exports from "./config";
exports.config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    // mail configuration
    mailHost: process.env.MAIL_HOST,
    mailPort: process.env.MAIL_PORT,
    isMailPortSecure: process.env.IS_MAIL_PORT_SECURE || true,
    mailUser: process.env.MAIL_USER,
    mailPass: process.env.MAIL_PASS,
};
