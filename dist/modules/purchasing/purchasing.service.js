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
exports.createPurchasing = createPurchasing;
const db_util_1 = __importDefault(require("../../utils/db.util"));
const user_service_1 = require("../user/UserManage/user.service");
function createPurchasing(name, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield db_util_1.default.product.findUnique({
            where: { name },
            select: {
                id: true,
                isActive: true,
                name: true,
                price: true,
                categoryId: true,
            },
        });
        if (!product)
            throw new Error(`Product name invalid`);
        if (product.isActive === false)
            throw new Error(`Product is not up for sale`);
        const userinfo = yield (0, user_service_1.getAnyUserById)(userId);
        if (!userinfo)
            throw new Error(`User does not exist`);
        yield db_util_1.default.product.update({
            data: {
                quantity: {
                    decrement: 1,
                },
            },
            where: { name },
        });
        const purchasing = yield db_util_1.default.purchasing.create({
            data: {
                productId: product.id,
                userId: userinfo.id,
            },
        });
        return [product, userinfo];
    });
}
