"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSelectedFields = exports.userRoles = exports.userSearchableFields = exports.userFilterableFields = void 0;
exports.userFilterableFields = [
    "id",
    "name",
    "phone_number",
    "email",
    "role",
    "created_at",
    "updated_at",
    "deleted_at",
];
exports.userSearchableFields = [
    "name",
    "phone_number",
    "email",
];
// ------------------------------------
// user roles
// ------------------------------------
exports.userRoles = {
    SUPER_ADMIN: "super_admin",
    ADMIN: "admin",
    MANAGER: "manager",
    USER: "user",
};
exports.userSelectedFields = {
    id: true,
    name: true,
    phone_number: true,
    email: true,
    role: true,
    //   password:true,
    created_at: true,
    //   updated_at:true,
    //   deleted_at:true,
};
