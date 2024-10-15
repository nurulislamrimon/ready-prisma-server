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
const config_1 = require("./config");
const orm_1 = __importDefault(require("./orm"));
const app_1 = __importDefault(require("./app/app"));
// app
const port = config_1.config.port || 5000;
// server
let server;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            server = app_1.default.listen(port, () => {
                console.log(`Example app listening on port ${port}`);
            });
        }
        catch (error) {
            yield orm_1.default.$disconnect();
            process.exit(1);
        }
    });
}
main().catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield orm_1.default.$disconnect();
    process.exit(1);
}));
// Graceful shutdown function
const gracefulShutdown = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (exitCode = 0) {
    if (server) {
        console.log("Graceful shutdown initiated");
        server.close();
        console.log("HTTP server closed");
        yield orm_1.default.$disconnect();
        console.log("Database connections closed");
        process.exit(exitCode);
    }
});
// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.error("Uncaught exception:", err);
    gracefulShutdown(1);
});
// Handle unhandled rejections
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    gracefulShutdown(1);
});
// Handle SIGINT and SIGTERM signals for graceful termination
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () { return yield gracefulShutdown(); }));
process.on("SIGTERM", () => __awaiter(void 0, void 0, void 0, function* () { return yield gracefulShutdown(); }));
