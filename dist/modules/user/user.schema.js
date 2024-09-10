"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{2,19}$/; // starts with a letter can contain numbers
const phonenumberRegex = /^(?:\+92|03)\d{9}$/;
const counrtyRegex = /^[a-zA-Z]+$/;
const cityRegex = /^[a-zA-Z]+$/;
exports.createUserSchema = zod_1.z.object({
    username: zod_1.z.string().regex(usernameRegex, "Invalid Username"),
    email: zod_1.z.string().email(),
    phoneNumber: zod_1.z.string().regex(phonenumberRegex, "Invalid Phone Number"),
    country: zod_1.z
        .string()
        .regex(counrtyRegex, "Counrty name can only contain aplhabets"),
    city: zod_1.z.string().regex(cityRegex, "City name can only contain aplhabets"),
});
exports.updateUserSchema = zod_1.z.object({
    username: zod_1.z.string().regex(usernameRegex, "Invalid Username").optional(),
    email: zod_1.z.string().email({ message: "Invalid email address" }).optional(),
    phoneNumber: zod_1.z
        .string()
        .regex(phonenumberRegex, "Invalid Phone Number")
        .optional(),
    country: zod_1.z
        .string()
        .regex(counrtyRegex, "Counrty name can only contain aplhabets")
        .optional(),
    city: zod_1.z
        .string()
        .regex(cityRegex, "City name can only contain aplhabets")
        .optional(),
});
