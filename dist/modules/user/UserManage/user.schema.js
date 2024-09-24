"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
const fullnameRegex = /^[A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,20}$/; // must include letters and digits and special characters
const phonenumberRegex = /^(?:\+92|03)\d{9}$/;
const counrtyRegex = /^[a-zA-Z]+$/;
const cityRegex = /^[a-zA-Z]+$/;
exports.createUserSchema = zod_1.z.object({
    fullName: zod_1.z
        .string()
        .min(3, {
        message: "Full name too short",
    })
        .max(30, {
        message: "Full name too long, cant be more than 30 letters",
    })
        .regex(fullnameRegex, "Can Only contain Letters"),
    email: zod_1.z.string().endsWith("@gmail.com", {
        message: "only gmail domains are valid",
    }),
    password: zod_1.z
        .string()
        .regex(passwordRegex, "Password must inculde letters, digits and special characters"),
    phoneNumber: zod_1.z.string().regex(phonenumberRegex, "Invalid Phone Number"),
    country: zod_1.z
        .string()
        .regex(counrtyRegex, "Counrty name can only contain aplhabets"),
    city: zod_1.z.string().regex(cityRegex, "City name can only contain aplhabets"),
});
exports.updateUserSchema = zod_1.z.object({
    fullName: zod_1.z
        .string()
        .min(3, {
        message: "Full name too short",
    })
        .max(30, {
        message: "Full name too long, cant be more than 30 letters",
    })
        .regex(fullnameRegex, "Can Only contain Letters")
        .optional(),
    email: zod_1.z
        .string()
        .endsWith("@gmail.com", {
        message: "only gmail domains are valid",
    })
        .optional(),
    password: zod_1.z
        .string()
        .regex(passwordRegex, "Password must inculde letters, digits and special characters"),
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
