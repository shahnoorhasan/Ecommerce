"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const env_schema = z.object({
//     PORT: z.number(),
//     DATABASE_URL: z.string(),
//     NAME: z.string()
// })
exports.ENV = {
    PORT: (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5001,
    JWT_SECRET: process.env.JWT_SECRET,
};
