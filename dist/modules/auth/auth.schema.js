"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnyUserSignInSchema = exports.AnyUserSignUpSchema = void 0;
const zod_1 = require("zod");
const full_nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
const password_Regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]*$/; // must include letters and digits and special characters
const phone_numberRegex = /^(?:\+92|03)\d{9}$/;
const country_Regex = /^[A-Za-z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*$/;
const city_Regex = /^[A-Za-z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*$/;
const email_Regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
exports.AnyUserSignUpSchema = zod_1.z.object({
    fullName: zod_1.z
        .string()
        .min(3, {
        message: "Full name too short, Must be more than 3 letters",
    })
        .max(30, {
        message: "Full name too long, cant be more than 30 letters",
    })
        .regex(full_nameRegex, "Can Only contain Letters"),
    email: zod_1.z
        .string()
        .email()
        .regex(email_Regex, "invalid email, only @gmail domains are available")
        .max(60, "Email cannot be more than 60 letters"),
    password: zod_1.z
        .string()
        .regex(password_Regex, "Password must include letters, digits and special characters")
        .min(8, "Password must be of length more than 8 ")
        .max(20, "Password must be of length less than 20 "),
    phoneNumber: zod_1.z.string().regex(phone_numberRegex, "Invalid Phone Number"),
    country: zod_1.z
        .string()
        .regex(country_Regex, "Country name can only contain alphabets")
        .min(3, "Country name must more than 3 letters")
        .max(50, "Country Name cannot be more than 50 letters"),
    city: zod_1.z
        .string()
        .regex(city_Regex, "City name can only contain alphabets")
        .min(1, "City name must more than 1 letters")
        .max(50, "City name cannot be more than 50 letters"),
});
exports.AnyUserSignInSchema = zod_1.z.object({
    email: zod_1.z.string().regex(email_Regex).max(60),
    password: zod_1.z.string().regex(password_Regex).min(8).max(20),
});
