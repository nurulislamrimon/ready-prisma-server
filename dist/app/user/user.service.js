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
exports.userService = void 0;
const user_constants_1 = require("./user.constants");
const searchFilterAndPagination_1 = require("../../utils/searchFilterAndPagination");
const orm_1 = __importDefault(require("../../orm"));
// -----------------------------
// get all users
// -----------------------------
const getAllUsers = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const query = (0, searchFilterAndPagination_1.searchFilterAndPagination)({
        req,
        filterableFields: user_constants_1.userFilterableFields,
        searchableFields: user_constants_1.userSearchableFields,
    });
    const users = yield orm_1.default.user.findMany({
        where: query.where,
        select: user_constants_1.userSelectedFields,
        skip: query.skip,
        take: query.limit,
        orderBy: {
            [query.sortBy]: query.sortOrder,
        },
    });
    const total = yield orm_1.default.user.count({
        where: query.where,
    });
    return {
        users,
        meta: { total, page: query.page, limit: query.limit },
    };
});
// -----------------------------
// add new user
// -----------------------------
const addUsers = (_a) => __awaiter(void 0, [_a], void 0, function* ({ data }) {
    const users = yield orm_1.default.user.create({
        data,
    });
    return users;
});
// ---------------------------------------------
// get a user by query
// ---------------------------------------------
const getAnUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield orm_1.default.user.findFirst(query);
    return users;
});
// -----------------------------
// update an user
// -----------------------------
const updateUsers = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield orm_1.default.user.update(data);
    return users;
});
// -----------------------------
// delete an user
// -----------------------------
const deleteUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield orm_1.default.user.delete(query);
    return users;
});
// export
exports.userService = {
    getAllUsers,
    addUsers,
    getAnUser,
    updateUsers,
    deleteUsers,
};
