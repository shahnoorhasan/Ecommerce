"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
const name_Regex = /^(?=.*[A-Za-z])[A-Za-z0-9\s!@#$%^&*()-_+=]*$/;
exports.createProductSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .regex(name_Regex, "Name must contain letters")
        .min(3, "Name must be greater 3 words length")
        .max(20, "Name Cannot be more than 20 letters"),
    price: zod_1.z
        .number()
        .min(1, "price must be greater than 0")
        .max(999999, "Please recheck the price"),
    quantity: zod_1.z.number().min(1, "quantity must be greater than 0"),
    description: zod_1.z
        .string()
        .min(50, "description must be greater than 50 letters")
        .max(200, "description must be less 200 letters"),
});
exports.updateProductSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .nonempty("name is required")
        .regex(name_Regex, "Name must contain letters")
        .min(3, "Name must be greater 3 words length")
        .max(20, "Name Cannot be more than 20 letters")
        .optional(),
    price: zod_1.z
        .number()
        .min(1, "price must be greater than 0")
        .max(10, "Please Recheck the price")
        .optional(),
    quantity: zod_1.z
        .number()
        .min(1, "quantity must be greater than 0")
        .max(5, "Please Recheck quantity")
        .optional(),
    description: zod_1.z
        .string()
        .min(50, "description must be greater than 50 letters")
        .max(200, "description must be less 200 letters")
        .optional(),
    isActive: zod_1.z.boolean().optional(),
});
