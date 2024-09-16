"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorCategoryRequestSchema = exports.sendVendorRequestSchema = void 0;
const zod_1 = require("zod");
const email_Regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
exports.sendVendorRequestSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .regex(email_Regex, "invalid email, only @gmail domains are available")
        .max(60, "Email cannot be more than 60 letters"),
});
const nameRegex = /^[A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*$/;
exports.vendorCategoryRequestSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .regex(nameRegex, "Please enter words only")
        .min(3, "Category Name must be more than 3 letters")
        .max(20, "Category Name cannot be of more than 20 letters"),
});
