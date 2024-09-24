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
exports.getProductByName = getProductByName;
exports.getAllProduct = getAllProduct;
exports.getVendorProducts = getVendorProducts;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProductByName = deleteProductByName;
exports.vendorProductsPurchased = vendorProductsPurchased;
exports.countVendorPurchases = countVendorPurchases;
exports.OutOfStockProducts = OutOfStockProducts;
exports.countVendorMyProducts = countVendorMyProducts;
exports.vendorTotalEarnings = vendorTotalEarnings;
const db_util_1 = __importDefault(require("../../../utils/db.util"));
const user_service_1 = require("../../user/UserManage/user.service");
const category_service_1 = require("../category/category.service");
function getProductById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield db_util_1.default.product.findUnique({ where: { id } });
        if (!product)
            throw new Error(`Product at ID:${id} not exist in category`);
        return product;
    });
}
function getProductByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = yield db_util_1.default.product.findUnique({ where: { name } });
        if (!category)
            throw new Error(`Product with ${name} does not exist`);
        return category;
    });
}
function getAllProduct() {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield db_util_1.default.product.findMany({
            orderBy: { id: "desc" },
            where: { isActive: true },
        });
        return products;
    });
}
function getVendorProducts(vendorId) {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield db_util_1.default.product.findMany({
            where: { vendorId },
        });
        return products;
    });
}
function createProduct(vendorId, categoryName, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendorInfo = yield (0, user_service_1.getAnyUserById)(vendorId);
            const category = yield (0, category_service_1.getCategoryByName)(categoryName);
            const product = yield db_util_1.default.product.create({
                data: {
                    name: data.name,
                    price: data.price,
                    quantity: data.quantity,
                    description: data.description,
                    categoryId: category.id,
                    vendorId: vendorInfo.id,
                },
            });
            return product;
        }
        catch (error) {
            if (error.code === "P2002") {
                const target = error.meta.target[0];
                throw new Error(`Same ${target} Product already exists, Must be Unique`);
            }
            throw error;
        }
    });
}
function updateProduct(categoryName, data, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existingProduct = yield getProductById(id);
            if (!existingProduct)
                throw new Error("Product not found");
            let categoryId = existingProduct.categoryId;
            if (categoryName) {
                const category = yield (0, category_service_1.getCategoryByName)(categoryName);
                if (!category)
                    throw new Error("Category not found");
                categoryId = category.id;
            }
            const updatedProduct = yield db_util_1.default.product.update({
                where: { id },
                data: {
                    name: data.name || existingProduct.name,
                    price: data.price || existingProduct.price,
                    quantity: data.quantity || existingProduct.quantity,
                    description: data.description || existingProduct.description,
                    isActive: data.isActive !== undefined
                        ? data.isActive
                        : existingProduct.isActive,
                    categoryId: categoryId,
                },
            });
            return updatedProduct;
        }
        catch (error) {
            if (error.code === "P2002") {
                const target = error.meta.target[0];
                throw new Error(`Same ${target} Product already exists, Must be Unique`);
            }
            throw error;
        }
    });
}
function deleteProductByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingProduct = yield getProductByName(name);
        if (!existingProduct)
            throw new Error(`Product not found`);
        yield db_util_1.default.product.delete({ where: { name } });
    });
}
function vendorProductsPurchased(vendorID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allPurchasedProducts = yield db_util_1.default.product.findMany({
                where: {
                    vendorId: vendorID,
                    Purchasing: {
                        some: {},
                    },
                },
                select: {
                    name: true,
                    price: true,
                    category: {
                        select: {
                            name: true,
                        },
                    },
                    Purchasing: {
                        select: {
                            user: {
                                select: {
                                    fullName: true,
                                    email: true,
                                    country: true,
                                    city: true,
                                },
                            },
                            status: true,
                        },
                    },
                },
            });
            return allPurchasedProducts;
        }
        catch (error) {
            console.error(error);
            throw new Error("Error fetching purchased vendor products");
        }
    });
}
function countVendorPurchases(vendorID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const purchaseCount = yield db_util_1.default.purchasing.count({
                where: {
                    product: {
                        vendorId: vendorID,
                    },
                },
            });
            return purchaseCount;
        }
        catch (error) {
            console.error(error);
            throw new Error("Error counting vendor purchases");
        }
    });
}
function OutOfStockProducts(vendorId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const outOfStock = yield db_util_1.default.product.count({
                where: { id: vendorId, quantity: 0 },
            });
            return outOfStock;
        }
        catch (error) {
            console.error("Error counting out of stock products:", error);
            throw new Error("Error counting out of stock products");
        }
    });
}
function countVendorMyProducts(vendorID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const productCount = yield db_util_1.default.product.count({
                where: { vendorId: vendorID },
            });
            return productCount;
        }
        catch (error) {
            console.error(error);
            throw new Error("Error counting vendor products");
        }
    });
}
function vendorTotalEarnings(vendorID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const purchasedProducts = yield db_util_1.default.purchasing.findMany({
                where: {
                    product: {
                        vendorId: vendorID,
                    },
                },
                select: {
                    product: {
                        select: {
                            price: true,
                        },
                    },
                },
            });
            const totalEarnings = purchasedProducts.reduce((acc, purchase) => acc + purchase.product.price, 0);
            return totalEarnings;
        }
        catch (error) {
            console.error(error);
            throw new Error("Error counting vendor purchases");
        }
    });
}
