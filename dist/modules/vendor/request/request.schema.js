"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorCategoryRequestSchema = void 0;
const zod_1 = require("zod");
const nameRegex = /^[A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*$/;
exports.vendorCategoryRequestSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .regex(nameRegex, "Please enter words only")
        .min(3, "Category Name must be more than 3 letters")
        .max(20, "Category Name cannot be of more than 20 letters"),
});
