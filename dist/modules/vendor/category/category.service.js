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
exports.getCategoryByName = getCategoryByName;
exports.getAllCategory = getAllCategory;
exports.getCategoryByNameWithProducts = getCategoryByNameWithProducts;
const db_util_1 = __importDefault(require("../../../utils/db.util"));
function getCategoryByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = yield db_util_1.default.category.findUnique({ where: { name } });
        if (!category)
            throw new Error(`Category with ${name} does not exist`);
        return category;
    });
}
function getAllCategory() {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield db_util_1.default.category.findMany({ select: { name: true } });
        return categories;
    });
}
function getCategoryByNameWithProducts(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryWithProducts = yield db_util_1.default.category.findUnique({
            where: { name },
            include: { Product: true },
        });
        if (!categoryWithProducts)
            throw new Error(`Category not found`);
        return categoryWithProducts;
    });
}
