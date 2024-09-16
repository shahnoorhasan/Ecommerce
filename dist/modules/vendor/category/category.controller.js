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
exports.findCategoryByIdHandler = findCategoryByIdHandler;
exports.getAllCategoryHandler = getAllCategoryHandler;
exports.createCategoryHandler = createCategoryHandler;
exports.updateCategoryHandler = updateCategoryHandler;
exports.deleteCategoryByIdHandler = deleteCategoryByIdHandler;
exports.categoryWithProductHandler = categoryWithProductHandler;
const category_service_1 = require("./category.service");
const category_service_2 = require("./category.service");
const category_service_3 = require("./category.service");
const category_service_4 = require("./category.service");
const category_service_5 = require("./category.service");
const category_schema_1 = require("./category.schema");
const zod_1 = require("zod");
function findCategoryByIdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id))
                throw new Error("Id must be a number");
            const category = yield (0, category_service_1.getCategoryById)(id);
            res
                .status(200)
                .json({ status: 200, message: "Success", data: category, success: true });
        }
        catch (error) {
            console.error(error.message);
            res.status(400).json({
                status: 200,
                message: error.message,
                data: null,
                success: false,
            });
        }
    });
}
function getAllCategoryHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            /*const id = Number(req.params.id);
                if (Number.isNaN(id)) throw new Error('Id must be a number');*/
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
function createCategoryHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            /*const id = Number(req.params.id);
                if (Number.isNaN(id)) throw new Error('Id must be a number');*/
            const data = category_schema_1.createCategorySchema.parse(req.body);
            const category = yield (0, category_service_3.createCategory)(data);
            res.json({
                status: 200,
                message: "Success",
                data: category,
                success: true,
            });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const messageJSON = JSON.parse(error.message);
                const message = `${messageJSON[0].path[0]} is ${messageJSON[0].message}`;
                console.error(message);
                return res.json({
                    status: 400,
                    message: message,
                    data: null,
                    success: false,
                });
                // console.log(error);
            }
            console.error(error.message);
            return res.status(400).json({
                status: 400,
                message: error.message,
                data: null,
                success: false,
            });
        }
    });
}
function updateCategoryHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id))
                throw new Error("Id must be a number");
            const data = category_schema_1.updateCategorySchema.parse(req.body);
            const category = yield (0, category_service_4.updateCategory)(data, id);
            res
                .status(200)
                .json({ status: 200, message: "Success", data: category, success: true });
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
function deleteCategoryByIdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id))
                throw new Error("Id must be a number");
            yield (0, category_service_5.deleteCategoryById)(id);
            res.status(200).json({
                status: 200,
                message: "Successfully deleted",
                data: id,
                success: true,
            });
        }
        catch (error) {
            console.error(error.message);
            res.status(400).json({
                status: 200,
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
            const id = Number(req.params.id);
            if (Number.isNaN(id))
                throw new Error("Id must be a number");
            const categoryProduct = yield (0, category_service_1.getCategoryByIdWithProducts)(id);
            res.status(200).json({
                status: 200,
                message: "success",
                data: categoryProduct,
                success: true,
            });
        }
        catch (error) {
            // {
            //     if (error instanceof ZodError) {
            //         const messageJSON = JSON.parse(error.message);
            //         const message = `${messageJSON[0].path[0]} is ${messageJSON[0].message}`;
            //         console.error(message);
            //         return res.status(400).json({ message: message })
            //     }
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
