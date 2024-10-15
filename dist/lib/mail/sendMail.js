"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../../config");
const sendMail = (to_1, subject_1, html_1, ...args_1) => __awaiter(void 0, [to_1, subject_1, html_1, ...args_1], void 0, function* (to, subject, html, platformName = "Expert Squad", attachments) {
    try {
        if (!config_1.config.mailHost || !config_1.config.mailUser || !config_1.config.mailPass) {
            throw new Error("Mail configuration is missing");
        }
        const transporterConfig = {
            host: config_1.config.mailHost,
            port: Number(config_1.config.mailPort) || 465,
            secure: config_1.config.isMailPortSecure !== "false",
            auth: {
                user: config_1.config.mailUser,
                pass: config_1.config.mailPass,
            },
            // service: "gmail",
            // auth: {
            //   user: config.emailUser,
            //   pass: config.emailPass,
            // },
        };
        const transporter = nodemailer_1.default.createTransport(transporterConfig);
        const info = yield transporter.sendMail({
            // from: `${config.mail}`,
            from: `${platformName} <${config_1.config.mailUser}>`,
            to,
            subject,
            html,
            attachments: attachments || [],
        });
        return info;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.sendMail = sendMail;
