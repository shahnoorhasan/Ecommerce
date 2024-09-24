"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productNameSchema = void 0;
const zod_1 = require("zod");
const name_Regex = /^(?=.*[A-Za-z])[A-Za-z0-9\s!@#$%^&*()-_+=]*$/;
exports.productNameSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .regex(name_Regex, "Name must contain letters")
        .min(3, "Name must be greater 3 words length")
        .max(20, "Name Cannot be more than 20 letters"),
});
