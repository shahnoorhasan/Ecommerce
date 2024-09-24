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
exports.vendorCategoryRequestHandler = vendorCategoryRequestHandler;
const request_service_1 = require("./request.service");
const zod_1 = require("zod");
const request_schema_1 = require("./request.schema");
function vendorCategoryRequestHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendorId = Number(req.params.vendorId);
            if (Number.isNaN(vendorId))
                throw new Error("vendorID must be a number");
            const { name } = req.body;
            request_schema_1.vendorCategoryRequestSchema.parse({ name });
            const vendorData = yield (0, request_service_1.CategoryRequestVendor)(vendorId, {
                name,
            });
            // Check if the vendor data is returned successfully
            if ((vendorData === null || vendorData === void 0 ? void 0 : vendorData.id) && vendorData.name) {
                res.status(200).json({
                    status: 200,
                    message: "Vendor Category request sent successfully",
                    data: vendorData,
                    success: true,
                });
            }
            else {
                res.status(400).json({
                    status: 400,
                    message: "Unable to send vendor category request",
                    data: null,
                    success: false,
                });
            }
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const message = error.errors
                    .map((e) => `${e.path[0]}: ${e.message}`)
                    .join(", ");
                console.log(message);
                return res.status(400).json({
                    status: 400,
                    message: message, // Detailed message from Zod
                    data: null,
                    success: false,
                });
            }
            // Handle other errors
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
