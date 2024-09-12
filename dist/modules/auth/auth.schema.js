"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnyUserSignInSchema = exports.AnyUserSignUpSchema = void 0;
const zod_1 = require("zod");
const full_nameRegex = /^[A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*$/;
const password_Regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,20}$/; // must include letters and digits and special characters
const phone_numberRegex = /^(?:\+92|03)\d{9}$/;
const country_Regex = /^[A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*$/;
const city_Regex = /^[A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*$/;
exports.AnyUserSignUpSchema = zod_1.z.object({
    fullName: zod_1.z
        .string()
        .min(3, {
        message: "Full name too short",
    })
        .max(30, {
        message: "Full name too long, cant be more than 30 letters",
    })
        .regex(full_nameRegex, "Can Only contain Letters"),
    email: zod_1.z.string().endsWith("@gmail.com", {
        message: "only gmail domains are valid",
    }),
    password: zod_1.z
        .string()
        .regex(password_Regex, "Password must include letters, digits and special characters"),
    phoneNumber: zod_1.z.string().regex(phone_numberRegex, "Invalid Phone Number"),
    country: zod_1.z
        .string()
        .regex(country_Regex, "Country name can only contain alphabets"),
    city: zod_1.z.string().regex(city_Regex, "City name can only contain alphabets"),
});
exports.AnyUserSignInSchema = zod_1.z.object({
    email: zod_1.z.string().endsWith("@gmail.com", {
        message: "only gmail domains are valid",
    }),
    password: zod_1.z
        .string()
        .regex(password_Regex, "Password must include letters, digits and special characters"),
});
