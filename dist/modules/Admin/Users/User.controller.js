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
exports.totalUsersCountHandler = totalUsersCountHandler;
exports.allUsersPurchasingDataHandler = allUsersPurchasingDataHandler;
const User_service_1 = require("./User.service");
function totalUsersCountHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, User_service_1.totalUsersCount)();
            res.status(200).json({
                status: 200,
                message: "Successfully retrieved user count",
                data: users,
                success: true,
            });
        }
        catch (error) {
            console.error(error.message);
            res.status(400).json({
                status: 400,
                message: error.message,
                data: null,
                success: false,
            });
        }
    });
}
function allUsersPurchasingDataHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, User_service_1.allUsersPurchasingData)();
            res.status(200).json({
                status: 200,
                message: "Successfully retrieved Purchasing Data",
                data: result,
                success: true,
            });
        }
        catch (error) {
            console.error(error.message);
            res.status(400).json({
                status: 400,
                message: error.message,
                data: null,
                success: false,
            });
        }
    });
}
