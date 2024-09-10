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
exports.getUserById = getUserById;
exports.getAllUserById = getAllUserById;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
const db_util_1 = __importDefault(require("../../utils/db.util"));
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield db_util_1.default.user.findUnique({ where: { id } });
        if (!user)
            throw new Error(`User at id: ${id} does not exist`);
        return user;
    });
}
function getAllUserById() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield db_util_1.default.user.findMany({ orderBy: { id: "desc" } });
        return users;
    });
}
function createUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield db_util_1.default.user.create({
                data: {
                    username: data.username,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    country: data.country,
                    city: data.city,
                },
            });
            return user;
        }
        catch (error) {
            throw new Error(`The error is ${error}`);
        }
    });
}
function updateUser(data, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield getUserById(id);
        if (!existingUser)
            throw new Error(`User does not exist`);
        yield db_util_1.default.user.update({
            data: {
                username: data.username || existingUser.username,
                email: data.email || existingUser.email,
                phoneNumber: data.phoneNumber || existingUser.phoneNumber,
                country: data.country || existingUser.country,
                city: data.city || existingUser.city,
            },
            where: { id },
        });
    });
}
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield getUserById(id);
        if (!existingUser)
            throw new Error(`User does not exist`);
        yield db_util_1.default.user.delete({ where: { id } });
    });
}
