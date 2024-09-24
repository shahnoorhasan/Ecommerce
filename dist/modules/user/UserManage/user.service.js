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
exports.getAnyUserById = getAnyUserById;
exports.getAllUserById = getAllUserById;
exports.updateAnyUser = updateAnyUser;
exports.deleteAnyUser = deleteAnyUser;
const db_util_1 = __importDefault(require("../../../utils/db.util"));
function getAnyUserById(id) {
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
function updateAnyUser(data, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield getAnyUserById(id);
        if (!existingUser)
            throw new Error(`User does not exist`);
        yield db_util_1.default.user.update({
            data: {
                fullName: data.fullName || existingUser.fullName,
                email: data.email || existingUser.email,
                password: data.password || existingUser.password,
                phoneNumber: data.phoneNumber || existingUser.phoneNumber,
                country: data.country || existingUser.country,
                city: data.city || existingUser.city,
            },
            where: { id },
        });
    });
}
function deleteAnyUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield getAnyUserById(id);
        if (!existingUser)
            throw new Error(`User does not exist`);
        yield db_util_1.default.user.delete({ where: { id } });
    });
}
