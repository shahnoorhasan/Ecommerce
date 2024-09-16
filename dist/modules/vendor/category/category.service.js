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
exports.getCategoryById = getCategoryById;
exports.getCategoryByName = getCategoryByName;
exports.getAllCategory = getAllCategory;
exports.createCategory = createCategory;
exports.updateCategory = updateCategory;
exports.deleteCategoryById = deleteCategoryById;
exports.getCategoryByIdWithProducts = getCategoryByIdWithProducts;
const db_util_1 = __importDefault(require("../../../utils/db.util"));
function getCategoryById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = yield db_util_1.default.category.findUnique({ where: { id } });
        if (!category)
            throw new Error(`Category at ${id} not exist`);
        return category;
    });
}
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
function createCategory(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const category = yield db_util_1.default.category.create({
                data: {
                    name: data.name,
                },
            });
            return;
        }
        catch (error) {
            if (error.code === "P2002") {
                const target = error.meta.target[0];
                throw new Error(`${target} Must be unique`);
            }
            throw error;
        }
    });
}
function updateCategory(data, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingCategory = yield getCategoryById(id);
        if (!existingCategory)
            throw new Error(`Category not found`);
        yield db_util_1.default.category.update({ data: { name: data.name }, where: { id } });
    });
}
function deleteCategoryById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingCategory = yield getCategoryById(id);
        if (!existingCategory)
            throw new Error(`Category not found`);
        yield db_util_1.default.category.delete({ where: { id } });
    });
}
function getCategoryByIdWithProducts(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const categorysWithProducts = yield db_util_1.default.category.findUnique({
            where: { id },
            include: { Product: true },
        });
        if (!categorysWithProducts)
            throw new Error(`Category not found`);
        return categorysWithProducts;
    });
}
