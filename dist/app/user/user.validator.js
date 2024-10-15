"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidate = void 0;
const zod_1 = require("zod");
exports.userValidate = zod_1.z
    .object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ invalid_type_error: "Invalid email type!" })
            .email({ message: "Invalid email address!" }),
        phoneNumber: zod_1.z.string({
            invalid_type_error: "Invalid Phone number!",
        }),
        password: zod_1.z.string({
            required_error: "Password is required!",
            invalid_type_error: "Invalid password type!",
        }),
    }),
})
    .refine((data) => data.body.email || data.body.phoneNumber, {
    message: "Either email or phoneNumber is required!",
});
