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
exports.findProductByIdHandler = findProductByIdHandler;
exports.getAllProductHandler = getAllProductHandler;
exports.createProductHandler = createProductHandler;
exports.updateProductHandler = updateProductHandler;
exports.deleteProductByIdHandler = deleteProductByIdHandler;
const product_service_1 = require("./product.service");
const product_service_2 = require("./product.service");
const product_service_3 = require("./product.service");
const product_service_4 = require("./product.service");
const product_service_5 = require("./product.service");
const product_schema_1 = require("./product.schema");
const zod_1 = require("zod");
function findProductByIdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id))
                throw new Error("Id must be a number");
            const product = yield (0, product_service_1.getProductById)(id);
            res
                .status(200)
                .json({
                status: 200,
                message: "Found Successfully",
                data: product,
                success: true,
            });
        }
        catch (error) {
            console.error(error.message);
            res
                .status(400)
                .json({
                status: 400,
                message: error.message,
                data: null,
                success: false,
            });
        }
    });
}
function getAllProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            /*const id = Number(req.params.id);
                if (Number.isNaN(id)) throw new Error('Id must be a number');*/
            const product = yield (0, product_service_2.getAllProduct)();
            res
                .status(200)
                .json({ status: 200, message: "Success", data: product, success: false });
        }
        catch (error) {
            console.error(error.message);
            res
                .status(400)
                .json({
                status: 400,
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
            /*const id = Number(req.params.id);
                if (Number.isNaN(id)) throw new Error('Id must be a number');*/
            const data = product_schema_1.createProductSchema.parse(req.body);
            const product = yield (0, product_service_3.createProduct)(data);
            res
                .status(200)
                .json({ status: 200, message: "Success", data: product, success: true });
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
function updateProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id))
                throw new Error("Id must be a number");
            const data = product_schema_1.updateProductSchema.parse(req.body);
            const product = yield (0, product_service_4.updateProduct)(data, id);
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
function deleteProductByIdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id))
                throw new Error("Id must be a number");
            yield (0, product_service_5.deleteProductById)(id);
            res
                .status(200)
                .json({
                status: 200,
                message: "Successfully deleted",
                data: id,
                success: true,
            });
        }
        catch (error) {
            console.error(error.message);
            res
                .status(400)
                .json({
                status: 400,
                message: error.message,
                data: null,
                success: false,
            });
        }
    });
}
