"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("../middlewares/errorHandler");
const router_1 = __importDefault(require("../router/router"));
const greetings_1 = __importDefault(require("./greetings/greetings"));
const app = (0, express_1.default)();
// static path or origin
app.use(express_1.default.static("public"));
// middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// initial route
app.get("/", greetings_1.default);
// routers
app.use("/api/v1", router_1.default);
// not found route handler middleware
app.use(errorHandler_1.notFoundRouteHandler);
// error handler middleeware
app.use(errorHandler_1.globalErrorHandler);
exports.default = app;
