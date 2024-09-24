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
exports.totalUsersCount = totalUsersCount;
exports.allUsersPurchasingData = allUsersPurchasingData;
const db_util_1 = __importDefault(require("../../../utils/db.util"));
function totalUsersCount() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield db_util_1.default.user.count({ where: { role: "Customer" } });
            if (!users)
                throw new Error(`Error fetching Users`);
            return users;
        }
        catch (error) {
            console.error(error.message);
            throw new Error(`${error.message}`);
        }
    });
}
function allUsersPurchasingData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield db_util_1.default.purchasing.findMany({
                select: {
                    id: true,
                    status: true,
                    user: {
                        select: {
                            id: true,
                            fullName: true,
                            email: true,
                            country: true,
                            city: true,
                        },
                    },
                    product: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            category: { select: { name: true } },
                        },
                    },
                },
            });
            return result;
        }
        catch (error) {
            console.error(error.message);
            throw new Error(`${error.message}`);
        }
    });
}
