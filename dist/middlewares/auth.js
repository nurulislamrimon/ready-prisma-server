"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = exports.authentication = void 0;
const ApiError_1 = require("../utils/ApiError");
const config_1 = require("../config");
const jwt_1 = require("../app/helpers/jwt");
const authentication = (req, res, next) => {
    var _a;
    try {
        const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!accessToken) {
            throw new ApiError_1.ApiError(403, "Access forbidden!");
        }
        //   verify accessToken
        const payload = (0, jwt_1.verifyToken)(accessToken, config_1.config.accessTokenSecret);
        req.user = payload;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authentication = authentication;
const authorization = (...roles) => {
    return (req, res, next) => {
        // Call authentication first
        (0, exports.authentication)(req, res, (authError) => {
            if (authError) {
                return next(authError);
            }
            if (!req.user) {
                return next(new ApiError_1.ApiError(401, "Unauthorized"));
            }
            // Check if req.user has the role property
            if (typeof req.user === "object" && "role" in req.user) {
                const user = req.user;
                if (!roles.includes(user.role)) {
                    return next(new ApiError_1.ApiError(403, "Access forbidden!"));
                }
            }
            else {
                return next(new ApiError_1.ApiError(403, "Access forbidden!"));
            }
            next();
        });
    };
};
exports.authorization = authorization;
