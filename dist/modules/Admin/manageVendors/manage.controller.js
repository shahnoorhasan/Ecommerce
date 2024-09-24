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
exports.getTotalVendorsCountHandler = getTotalVendorsCountHandler;
exports.getAllVendorDataHandler = getAllVendorDataHandler;
exports.getVendorsByCategoryNameHandler = getVendorsByCategoryNameHandler;
exports.revertVendorHandler = revertVendorHandler;
exports.deactivateVendorProductsHandler = deactivateVendorProductsHandler;
exports.deleteVendorCategoryRequestsHandler = deleteVendorCategoryRequestsHandler;
const manage_service_1 = require("./manage.service");
const manage_service_2 = require("./manage.service");
const manage_schema_1 = require("./manage.schema");
const zod_1 = require("zod");
function getTotalVendorsCountHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendorCount = yield (0, manage_service_1.getTotalVendorsCount)();
            res.status(200).json({
                status: 200,
                message: "Successfully Returned vendor count",
                data: vendorCount,
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
function getAllVendorDataHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendorsData = yield (0, manage_service_1.getAllVendorData)();
            res.status(200).json({
                status: 200,
                message: "Successfully retrieved all vendors",
                data: vendorsData,
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
function getVendorsByCategoryNameHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name } = manage_schema_1.CategoryNameSchema.parse(req.body);
            const vendors = yield (0, manage_service_2.getVendorsByCategoryName)(name);
            if (vendors.length === 0) {
                return res.status(400).json({
                    status: 400,
                    message: "Category does not exist",
                    data: null,
                    success: false,
                });
            }
            res.status(200).json({
                status: 200,
                message: "Successfully retrieved vendors by category name",
                data: vendors,
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
        }
    });
}
function revertVendorHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = manage_schema_1.VendorIdSchema.parse(req.body);
            const vendor = yield (0, manage_service_1.revertVendor)(id);
            res.status(200).json({
                status: 200,
                message: "Successfully Changed vendor Role",
                data: vendor,
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
function deactivateVendorProductsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = manage_schema_1.VendorIdSchema.parse(req.body);
            const vendor = yield (0, manage_service_1.deactivatedVendorProducts)(id);
            res.status(200).json({
                status: 200,
                message: "Successfully deactivated Products",
                data: vendor,
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
function deleteVendorCategoryRequestsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = manage_schema_1.VendorIdSchema.parse(req.body);
            const vendor = yield (0, manage_service_1.deleteVendorCategoryRequests)(id);
            res.status(200).json({
                status: 200,
                message: "Successfully deleted Vendor Category Requests",
                data: vendor,
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
