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
exports.findProductByNameHandler = findProductByNameHandler;
exports.getAllProductHandler = getAllProductHandler;
const product_service_1 = require("./product.service");
const product_schema_1 = require("./product.schema");
const zod_1 = require("zod");
function findProductByNameHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name } = product_schema_1.productNameSchema.parse(req.body);
            const product = yield (0, product_service_1.getProductByName)(name);
            res.status(200).json({
                status: 200,
                message: "Found Successfully",
                data: product,
                success: true,
            });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const messageJSON = JSON.parse(error.message);
                const message = ` ${messageJSON[0].message}`;
                console.error(message);
                return res
                    .status(400)
                    .json({ status: 400, message: message, data: null, success: false });
            }
            console.error(error);
            return res.status(500).json({
                status: 500,
                message: `${error}`,
                data: null,
                success: false,
            });
        }
    });
}
function getAllProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield (0, product_service_1.getAllProduct)();
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
