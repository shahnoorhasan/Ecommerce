"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategorySchema = exports.createCategorySchema = void 0;
const zod_1 = require("zod");
const nameRegex = /^[A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*$/;
exports.createCategorySchema = zod_1.z.object({
    name: zod_1.z.string().regex(nameRegex, "Please enter only words"),
});
exports.updateCategorySchema = zod_1.z.object({
    name: zod_1.z.string().regex(nameRegex, "Please enter only words").optional(),
});
