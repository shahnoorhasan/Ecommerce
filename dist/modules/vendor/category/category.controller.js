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
exports.getAllCategoryHandler = getAllCategoryHandler;
exports.categoryWithProductHandler = categoryWithProductHandler;
const category_service_1 = require("./category.service");
const category_service_2 = require("./category.service");
const category_schema_1 = require("./category.schema");
const zod_1 = require("zod");
function getAllCategoryHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const category = yield (0, category_service_2.getAllCategory)();
            res
                .status(200)
                .json({ status: 200, message: "Success", data: category, success: true });
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
function categoryWithProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name } = category_schema_1.createCategorySchema.parse(req.body);
            const categoryProduct = yield (0, category_service_1.getCategoryByNameWithProducts)(name);
            res.status(200).json({
                status: 200,
                message: "success",
                data: categoryProduct,
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
