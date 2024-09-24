"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVendorRequestSchema = void 0;
const zod_1 = require("zod");
const email_Regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
exports.sendVendorRequestSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .regex(email_Regex, "invalid email, only @gmail domains are available")
        .max(60, "Email cannot be more than 60 letters"),
});
