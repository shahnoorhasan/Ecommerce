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
exports.protection = protection;
const env_util_1 = require("../utils/env.util");
const jsonwebtoken_1 = require("jsonwebtoken");
function protection(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader)
                throw new Error(`Unauthorized Access`);
            const [bearer, token] = authorizationHeader.split(" ");
            if (bearer !== "Bearer")
                throw new Error(`Unauthorized Access`);
            if (!token)
                throw new Error(`Unauthorized Access`);
            const payload = (0, jsonwebtoken_1.verify)(token, env_util_1.ENV.JWT_SECRET);
            const userId = payload.user_id;
            req["userId"] = userId;
            next();
        }
        catch (error) {
            res.status(401).json({
                status: 401,
                message: "Unauthorized",
                data: null,
                success: false,
            });
        }
    });
}
