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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_service_1 = require("./user.service");
const constants_1 = require("../../constants");
const sendResponse_1 = require("../../utils/sendResponse");
const catchAsync_1 = require("../../utils/catchAsync");
const ApiError_1 = require("../../utils/ApiError");
const jwt_1 = require("../helpers/jwt");
const config_1 = require("../../config");
/**
 *@api{GET}/ GET Request.
 *@apiDescription This is a GET request for / api.
 *@apiPermission Admin
 *@apiHeader accessToken
 *@apiBody none
 *@apiParam none
 *@apiQuery fieldName, limit,sort,page
 *@apiSuccess Array - Array of users
 *@apiError 401 unauthorized or 401 or 403 forbidden or 404 not found
 */
const getAllUsers = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getAllUsers(req);
    (0, sendResponse_1.sendResponse)({
        res,
        success: true,
        message: "Users retrieved successfully!",
        data: result.users,
        meta: result.meta,
        statusCode: 200,
    });
}));
/**
 *@api{POST}/add POST Request.
 *@apiDescription This is a POST request for /add api.
 *@apiPermission Admin
 *@apiHeader accessToken
 *@apiBody Object - user data
 *@apiParam none
 *@apiQuery none,
 *@apiSuccess Object - user data
 *@apiError 401 unauthorized or 401 or 403 forbidden or 404 not found
 */
const addUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.body;
    const isAlreadyExist = yield user_service_1.userService.getAnUser({
        where: { email: newUser.email },
    });
    if (isAlreadyExist) {
        throw new ApiError_1.ApiError(403, "User already exist");
    }
    // hash the password
    newUser.password = yield bcrypt_1.default.hash(newUser.password, 10);
    const result = yield user_service_1.userService.addUsers({
        data: newUser,
    });
    if (!result) {
        throw new ApiError_1.ApiError(404, "Something went wrong");
    }
    const { password } = result, rest = __rest(result, ["password"]);
    (0, sendResponse_1.sendResponse)({
        res,
        success: true,
        message: "Users added successfully!",
        data: rest,
        statusCode: 200,
    });
}));
/**
 *@api{POST}/update POST Request.
 *@apiDescription This is a POST request for /update api.
 *@apiPermission Admin
 *@apiHeader accessToken
 *@apiBody Object - user data
 *@apiParam none
 *@apiQuery none,
 *@apiSuccess Object - user data
 *@apiError 401 unauthorized or 401 or 403 forbidden or 404 not found
 */
const updateUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const newUser = req.body;
    const isAlreadyExist = yield user_service_1.userService.getAnUser({
        where: { email: user === null || user === void 0 ? void 0 : user.email },
    });
    if (!isAlreadyExist) {
        throw new ApiError_1.ApiError(404, "User not found!");
    }
    if (newUser === null || newUser === void 0 ? void 0 : newUser.password) {
        newUser.password = yield bcrypt_1.default.hash(newUser.password, 10);
    }
    // hash the password
    const result = yield user_service_1.userService.updateUsers({
        where: { email: user === null || user === void 0 ? void 0 : user.email },
        data: newUser,
    });
    if (!result) {
        throw new ApiError_1.ApiError(404, "Something went wrong");
    }
    const { password } = result, rest = __rest(result, ["password"]);
    (0, sendResponse_1.sendResponse)({
        res,
        success: true,
        message: "Users updated successfully!",
        data: rest,
        statusCode: 200,
    });
}));
/**
 *@api{POST}/login POST Request.
 *@apiDescription This is a POST request for /login api.
 *@apiPermission none
 *@apiHeader none
 *@apiBody Object - {email, password}
 *@apiParam none
 *@apiQuery none
 *@apiSuccess Object - {accessToken, refreshToken, user}
 *@apiError 401 unauthorized or 401 or 403 forbidden or 404 not found
 */
const login = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const isUserExist = yield user_service_1.userService.getAnUser({
        where: { email },
    });
    if (!isUserExist) {
        throw new ApiError_1.ApiError(404, "User not found");
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(password, isUserExist.password);
    if (!isPasswordMatched) {
        throw new ApiError_1.ApiError(401, "Invalid credentials");
    }
    const { password: pass } = isUserExist, rest = __rest(isUserExist, ["password"]);
    // generate access token
    const accessToken = (0, jwt_1.generateToken)(isUserExist, config_1.config.accessTokenSecret, constants_1.accessTokenExpireTime);
    // generate refresh token
    const refreshToken = (0, jwt_1.generateToken)(isUserExist, config_1.config.refreshTokenSecret, constants_1.refreshTokenExpireTime);
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: config_1.config.env === "production",
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: config_1.config.env === "production",
    });
    (0, sendResponse_1.sendResponse)({
        res,
        success: true,
        message: "User logged in successfully!",
        data: { user: rest, accessToken, refreshToken },
        statusCode: 200,
    });
}));
/**
 *@api{delete}/update delete Request.
 *@apiDescription This is a delete request for /update api.
 *@apiPermission Admin
 *@apiHeader accessToken
 *@apiBody Object - user data
 *@apiParam none
 *@apiQuery none,
 *@apiSuccess Object - user data
 *@apiError 401 unauthorized or 401 or 403 forbidden or 404 not found
 */
const deleteUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const isAlreadyExist = yield user_service_1.userService.getAnUser({
        where: { id: Number(id) },
    });
    if (!isAlreadyExist) {
        throw new ApiError_1.ApiError(404, "User not found!");
    }
    // hash the password
    const result = yield user_service_1.userService.deleteUsers({
        where: { id: Number(id) },
    });
    if (!result) {
        throw new ApiError_1.ApiError(404, "Something went wrong");
    }
    const { password } = result, rest = __rest(result, ["password"]);
    (0, sendResponse_1.sendResponse)({
        res,
        success: true,
        message: "Users deleted successfully!",
        data: rest,
        statusCode: 200,
    });
}));
// export user controller
exports.userController = {
    getAllUsers,
    addUser,
    login,
    updateUser,
    deleteUser,
};
