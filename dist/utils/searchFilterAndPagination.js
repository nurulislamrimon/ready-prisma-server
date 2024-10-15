"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchFilterAndPagination = void 0;
const constants_1 = require("../constants");
// =============================================
// Pick the keys from an object
// =============================================
const pick = (obj, keys) => {
    const finalObj = {};
    for (const key of keys) {
        if (obj && Object.prototype.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key];
        }
    }
    return finalObj;
};
// ==========================================
// Search filter and pagination
// ==========================================
const searchFilterAndPagination = ({ req, searchableFields, filterableFields, }) => {
    const _a = req.query, { searchTerm, page = 1, limit = 10, sortBy, sortOrder } = _a, filterQuery = __rest(_a, ["searchTerm", "page", "limit", "sortBy", "sortOrder"]);
    // Pick filter fields from query
    const filterFields = pick(filterQuery, filterableFields.map(String));
    const where = {};
    // ------------------------------------
    // Filtering format for searchTerm
    // ------------------------------------
    if (typeof searchTerm === "string") {
        function removeNumberFields(arr1, arr2) {
            return arr1.filter((item) => {
                return typeof item === "string" && !arr2.includes(item);
            });
        }
        where.OR = removeNumberFields(searchableFields, [
            ...constants_1.numberFields,
            ...constants_1.dateFields,
        ]).map((field) => ({
            [field]: {
                contains: searchTerm,
            },
        }));
    }
    // -----------------------------------
    // Filtering format for filterFields
    // -----------------------------------
    if (Object.keys(filterFields).length > 0) {
        where.AND = Object.entries(filterFields).map(([key, value]) => {
            // ---------------------------------------- for boolean fields
            if (constants_1.booleanFields.includes(key)) {
                if (typeof value === "object" && value !== null) {
                    const parsedValues = Object.entries(value).reduce((acc, [k, v]) => {
                        acc[k] = Boolean(v);
                        return acc;
                    }, {});
                    return { [key]: parsedValues };
                }
            }
            if (constants_1.numberFields.includes(key)) {
                if (typeof value === "object" && value !== null) {
                    const parsedValues = Object.entries(value).reduce((acc, [k, v]) => {
                        acc[k] = parseFloat(v);
                        return acc;
                    }, {});
                    return { [key]: parsedValues };
                }
                return {
                    [key]: {
                        equals: typeof value === "string" ? parseFloat(value) : value,
                    },
                };
            }
            // ------------------------------------------ for date fields
            if (constants_1.dateFields.includes(key)) {
                if (typeof value === "object" && value !== null) {
                    const parsedValues = Object.entries(value).reduce((acc, [k, v]) => {
                        acc[k] = new Date(v);
                        return acc;
                    }, {});
                    return { [key]: parsedValues };
                }
                const parsedDate = typeof value === "string" ? new Date(value) : value;
                return {
                    [key]: {
                        equals: parsedDate,
                    },
                };
            }
            // ---------------------------------------- without boolean, number and date fields
            return {
                [key]: {
                    equals: value,
                },
            };
        });
    }
    // Validate sortBy
    const validatedSortBy = searchableFields.includes(sortBy)
        ? sortBy
        : "created_at";
    // Validate sortOrder
    const validatedSortOrder = sortOrder === "asc" || sortOrder === "desc"
        ? sortOrder
        : "desc";
    return {
        where,
        page: Number(page),
        limit: Number(limit),
        skip: (Number(page) - 1) * Number(limit),
        sortBy: validatedSortBy,
        sortOrder: validatedSortOrder,
    };
};
exports.searchFilterAndPagination = searchFilterAndPagination;
