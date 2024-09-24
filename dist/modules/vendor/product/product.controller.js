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
exports.getAllProductHandler = getAllProductHandler;
exports.getVendorProductsHandler = getVendorProductsHandler;
exports.createProductHandler = createProductHandler;
exports.updateProductHandler = updateProductHandler;
exports.deleteProductByNameHandler = deleteProductByNameHandler;
exports.vendorProductsPurchasedHandler = vendorProductsPurchasedHandler;
exports.countVendorPurchasesHandler = countVendorPurchasesHandler;
exports.OutOfStockProductsHandler = OutOfStockProductsHandler;
exports.countVendorMyProductsHandler = countVendorMyProductsHandler;
exports.vendorTotalEarningsHandler = vendorTotalEarningsHandler;
const product_service_1 = require("./product.service");
const product_service_2 = require("./product.service");
const product_service_3 = require("./product.service");
const product_service_4 = require("./product.service");
const product_schema_1 = require("./product.schema");
const zod_1 = require("zod");
function getAllProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield (0, product_service_2.getAllProduct)();
            res
                .status(200)
                .json({ status: 200, message: "Success", data: product, success: false });
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
function getVendorProductsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendorId = parseInt(req.params.vendorId);
            const products = yield (0, product_service_1.getVendorProducts)(vendorId);
            res.status(200).json({
                status: 200,
                message: "successful",
                data: products,
                success: true,
            });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const messageJSON = JSON.parse(error.message);
                const message = `${messageJSON[0].message}`;
                console.log(message);
                return res.status(400).json({
                    status: 400,
                    message: message,
                    data: null,
                    success: false,
                });
            }
            console.error(error.message);
            return res.status(500).json({
                status: 500,
                message: error.message,
                data: null,
                success: false,
            });
        }
    });
}
function createProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id))
                throw new Error("vendorID must be a number");
            const { categoryName, name, price, quantity, description } = req.body;
            product_schema_1.createProductSchema.parse({ name, price, quantity, description });
            const product = yield (0, product_service_3.createProduct)(id, categoryName, {
                name,
                price,
                quantity,
                description,
            });
            res
                .status(200)
                .json({ status: 200, message: "Success", data: product, success: true });
            console.log("Request Body:", req.body);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const messageJSON = JSON.parse(error.message);
                const message = `${messageJSON[0].message}`;
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
function updateProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id))
                throw new Error("Id must be a number");
            const { categoryName, name, price, quantity, description, isActive } = req.body;
            const parsedData = product_schema_1.updateProductSchema.parse({
                name,
                price,
                quantity,
                description,
                isActive,
            });
            const product = yield (0, product_service_4.updateProduct)(categoryName, parsedData, id);
            res.status(200).json({
                status: 200,
                message: `Successfully Updated`,
                data: product,
                success: true,
            });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const messageJSON = JSON.parse(error.message);
                const message = `${messageJSON[0].message}`;
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
function deleteProductByNameHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name } = req.body;
            if (!name || typeof name !== "string") {
                throw new Error("Invalid name provided");
            }
            yield (0, product_service_1.deleteProductByName)(name);
            res.status(200).json({
                status: 200,
                message: "Successfully deleted",
                data: name,
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
function vendorProductsPurchasedHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendorId = Number(req.params.vendorId);
            if (Number.isNaN(vendorId))
                throw new Error("vendorID must be a number");
            const purchasedProducts = yield (0, product_service_1.vendorProductsPurchased)(vendorId);
            res.status(200).json({
                status: 200,
                message: "Successfully retrieved purchased products",
                data: purchasedProducts,
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
function countVendorPurchasesHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendorId = Number(req.params.vendorId);
            if (Number.isNaN(vendorId))
                throw new Error("vendorID must be a number");
            const purchaseCount = yield (0, product_service_1.countVendorPurchases)(vendorId);
            res.status(200).json({
                status: 200,
                message: `Successfully retrieved purchase count for vendor ${vendorId}`,
                data: { purchaseCount },
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
function OutOfStockProductsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendorId = Number(req.params.vendorId);
            if (Number.isNaN(vendorId))
                throw new Error("vendorID must be a number");
            const OutOfStockCount = yield (0, product_service_1.OutOfStockProducts)(vendorId);
            res.status(200).json({
                status: 200,
                message: `Successfully retrieved  out of stock products for vendor ${vendorId}`,
                data: { OutOfStockCount },
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
function countVendorMyProductsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendorId = Number(req.params.vendorId);
            if (Number.isNaN(vendorId))
                throw new Error("vendorID must be a number");
            const ProductCount = yield (0, product_service_1.countVendorMyProducts)(vendorId);
            res.status(200).json({
                status: 200,
                message: `Successfully retrieved Product count for vendor ${vendorId}`,
                data: { ProductCount },
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
function vendorTotalEarningsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendorId = Number(req.params.vendorId);
            if (Number.isNaN(vendorId))
                throw new Error("vendorID must be a number");
            const purchasedProducts = yield (0, product_service_1.vendorTotalEarnings)(vendorId);
            res.status(200).json({
                status: 200,
                message: `Successfully retrieved Total earnings for vendor ${vendorId}`,
                data: { purchasedProducts },
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
