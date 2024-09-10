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
exports.findUserByIdHandler = findUserByIdHandler;
exports.getAllUserByIdHandler = getAllUserByIdHandler;
exports.createUserHandler = createUserHandler;
exports.updateUserHandler = updateUserHandler;
exports.deleteUserHandler = deleteUserHandler;
const user_service_1 = require("./user.service");
const user_service_2 = require("./user.service");
const user_service_3 = require("./user.service");
const user_service_4 = require("./user.service");
const user_service_5 = require("./user.service");
const user_schema_1 = require("./user.schema");
const zod_1 = require("zod");
function findUserByIdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id))
                throw new Error(`User Id does not exist`);
            const user = yield (0, user_service_1.getUserById)(id);
            res.status(200).json({
                status: 200,
                message: "Found Success",
                data: user,
                success: true,
            });
        }
        catch (error) {
            console.log(error.message);
            res.status(400).json({
                status: 400,
                message: error.message,
                data: null,
                success: false,
            });
        }
    });
}
function getAllUserByIdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, user_service_2.getAllUserById)();
            res
                .status(200)
                .json({ status: 200, message: "Success", data: null, success: true });
        }
        catch (error) {
            console.log(error.message);
            res.status(400).json({
                status: 400,
                message: error.message,
                data: null,
                success: false,
            });
        }
    });
}
function createUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = user_schema_1.createUserSchema.parse(req.body);
            const user = yield (0, user_service_3.createUser)(data);
            res
                .status(200)
                .json({ status: 200, message: "Success", data: user, success: true });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const messageJSON = JSON.parse(error.message);
                const message = `Key name must be written correctly, ${messageJSON[0].path[0]} is ${messageJSON[0].message}`;
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
function updateUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id))
                throw new Error(` User Id must be a number`);
            const data = user_schema_1.updateUserSchema.parse(req.body);
            const user = yield (0, user_service_4.updateUser)(data, id);
            res.status(200).json({
                status: 200,
                message: "Successfully Updated",
                data: user,
                success: "true",
            });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError)
                if (error instanceof zod_1.ZodError) {
                    const messageJSON = JSON.parse(error.message);
                    const message = `${messageJSON[0].path[0]} is ${messageJSON[0].message}`;
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
function deleteUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id))
                throw new Error(`User Id does not exist`);
            yield (0, user_service_5.deleteUser)(id);
            res.status(200).json({
                status: 200,
                message: "Successfully Deleted",
                data: id,
                success: true,
            });
        }
        catch (error) {
            console.log(error.message);
            res.status(400).json({
                status: 200,
                message: error.message,
                data: null,
                success: false,
            });
        }
    });
}
