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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnyUserSignUpHandler = AnyUserSignUpHandler;
exports.AnyUserSignInHandler = AnyUserSignInHandler;
const auth_service_1 = require("./auth.service");
const auth_service_2 = require("./auth.service");
const auth_schema_1 = require("./auth.schema");
const zod_1 = require("zod");
function AnyUserSignUpHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = auth_schema_1.AnyUserSignUpSchema.parse(req.body);
            const user = yield (0, auth_service_1.AnyUserSignUp)(data);
            res.status(200).json({
                status: 200,
                message: "Success",
                data: user,
                success: true,
            });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const messageJSON = JSON.parse(error.message);
                const message = `${messageJSON[0].message}`;
                console.error(message);
                return res
                    .status(400)
                    .json({ status: 400, message: message, data: null, success: false });
            }
            console.error(error.message);
            res.status(400).json({ message: error.message });
        }
    });
}
function AnyUserSignInHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = auth_schema_1.AnyUserSignInSchema.parse(req.body);
            if (!email || !password) {
                return res.status(400).json({
                    Status: 400,
                    message: "Email and Password are required",
                    data: null,
                    success: false,
                });
            }
            const result = yield (0, auth_service_2.AnyUserSignIn)(email, password);
            if ((result === null || result === void 0 ? void 0 : result.user.email) === undefined) {
                return res.status(400).json({
                    Status: 400,
                    message: "Invalid Credentials",
                    data: null,
                    success: false,
                });
            }
            if (result.user.email && result.user.password) {
                return res
                    .status(200)
                    .json({ status: 200, message: "success", data: result, Success: true });
            }
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const messageJSON = JSON.parse(error.message);
                const message = `${messageJSON[0].message}`;
                console.error(message);
                return res
                    .status(400)
                    .json({ status: 400, message: message, data: null, success: false });
            }
            console.error(error.message);
            res.status(400).json({ message: error.message });
        }
    });
}
