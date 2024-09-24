"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorIdSchema = exports.CategoryNameSchema = void 0;
const zod_1 = require("zod");
const nameRegex = /^[A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*$/;
exports.CategoryNameSchema = zod_1.z.object({
    name: zod_1.z.string().regex(nameRegex, "Please enter only words"),
});
exports.VendorIdSchema = zod_1.z.object({
    id: zod_1.z.number(),
});
