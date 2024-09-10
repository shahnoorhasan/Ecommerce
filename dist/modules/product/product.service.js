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
exports.getProductById = getProductById;
exports.getAllProduct = getAllProduct;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProductById = deleteProductById;
const db_util_1 = __importDefault(require("../../utils/db.util"));
function getProductById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield db_util_1.default.product.findUnique({ where: { id } });
        if (!product)
            throw new Error(`Product at ID:${id} not exist in category`);
        return product;
    });
}
function getAllProduct() {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield db_util_1.default.product.findMany({ orderBy: { id: "desc" } });
        return products;
    });
}
function createProduct(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield db_util_1.default.product.create({
                data: {
                    name: data.name,
                    price: data.price,
                    categoryId: data.categoryId,
                },
            });
            return product;
        }
        catch (error) {
            if (error.code === "P2002") {
                const target = error.meta.target[0];
                throw new Error(`Same ${target} Product is already exist, Must be Unique`);
            }
            throw error;
        }
    });
}
function updateProduct(data, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingProduct = yield getProductById(id);
        if (!existingProduct)
            throw new Error("Product not found");
        yield db_util_1.default.product.update({
            data: {
                name: data.name || existingProduct.name,
                price: data.price || existingProduct.price,
            },
            where: { id },
        });
    });
}
function deleteProductById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingProduct = yield getProductById(id);
        if (!existingProduct)
            throw new Error(`Product not found`);
        yield db_util_1.default.product.delete({ where: { id } });
    });
}
