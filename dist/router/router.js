"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../app/user/user.route");
const router = (0, express_1.Router)();
const routes = [
    {
        path: "/administrators",
        element: user_route_1.userRoute,
    },
];
routes.forEach((route) => router.use(route.path, route.element));
exports.default = router;
