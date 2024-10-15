"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
// prisma client
const prisma = new client_1.PrismaClient({
    // log: config.env === "production" ? [] : ["query", "info", "warn", "error"],
    log: [],
});
exports.default = prisma;
