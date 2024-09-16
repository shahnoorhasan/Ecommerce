"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnyUserSignUp = AnyUserSignUp;
exports.AnyUserSignIn = AnyUserSignIn;
const db_util_1 = __importDefault(require("../../utils/db.util"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_util_1 = require("../../utils/env.util");
function AnyUserSignUp(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const enc_password = yield bcryptjs_1.default.hash(data.password, 10);
            const user = yield db_util_1.default.user.create({
                data: {
                    fullName: data.fullName,
                    email: data.email,
                    password: enc_password,
                    phoneNumber: data.phoneNumber,
                    country: data.country,
                    city: data.city,
                },
            });
            return user;
        }
        catch (error) {
            if (error.code === "P2002") {
                const target = error.meta.target[0];
                throw new Error(`Same ${target} already exists, Must be Unique`);
            }
            throw error;
        }
    });
}
function AnyUserSignIn(email, current_password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield db_util_1.default.user.findUnique({ where: { email } });
            if (!user)
                throw new Error(`Invalid credentials `);
            const passwordMatch = yield bcryptjs_1.default.compare(current_password, user.password);
            if (!passwordMatch)
                throw new Error(`Invalid credentials`);
            const token = jsonwebtoken_1.default.sign({
                user_id: user.id,
                email: user.email,
            }, env_util_1.ENV.JWT_SECRET, { expiresIn: "1h" });
            return { user, token };
        }
        catch (error) {
            console.log(error);
            return undefined;
        }
    });
}
