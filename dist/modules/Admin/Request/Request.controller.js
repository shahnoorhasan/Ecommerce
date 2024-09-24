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
exports.getVendorRequestsHandler = getVendorRequestsHandler;
exports.approveVendorRequestHandler = approveVendorRequestHandler;
exports.getVendorCategoryRequestsHandler = getVendorCategoryRequestsHandler;
exports.approveCategoryRequestHandler = approveCategoryRequestHandler;
const Request_service_1 = require("./Request.service");
const Request_service_2 = require("./Request.service");
const zod_1 = require("zod");
function getVendorRequestsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const requests = yield (0, Request_service_1.getPendingVendorRequests)();
            res.status(200).json({
                status: 200,
                message: "Pending vendor requests retrieved",
                data: requests,
                success: true,
            });
        }
        catch (error) {
            console.error("Error fetching vendor requests:", error.message);
            res.status(500).json({
                status: 500,
                message: "Could not retrieve vendor requests",
                success: false,
            });
        }
    });
}
function approveVendorRequestHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { requestId, action } = req.body;
            if (!["accept", "reject"].includes(action)) {
                return res.status(400).json({
                    status: 400,
                    message: "Invalid action. Must be either 'accept' or 'reject'.",
                    data: null,
                    success: false,
                });
            }
            const result = yield (0, Request_service_2.approveVendorRequest)(requestId, action);
            res.status(200).json({
                status: 200,
                message: result.message,
                data: result.message,
                success: true,
            });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const messageJSON = JSON.parse(error.message);
                const message = `${messageJSON[0].path[0]} is ${messageJSON[0].message}`;
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
function getVendorCategoryRequestsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const requests = yield (0, Request_service_1.getPendingVendorCategoryRequests)();
            res.status(200).json({
                status: 200,
                message: "Pending vendor category requests retrieved",
                data: requests,
                success: true,
            });
        }
        catch (error) {
            console.error("Error fetching vendor category requests:", error.message);
            res.status(500).json({
                status: 500,
                message: "Could not retrieve vendor category requests",
                success: false,
            });
        }
    });
}
function approveCategoryRequestHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { requestId, action } = req.body;
            if (!requestId || !["accept", "reject"].includes(action)) {
                return res.status(400).json({
                    status: 400,
                    message: "Invalid requestId or action",
                    data: null,
                    success: false,
                });
            }
            const result = yield (0, Request_service_1.approveCategoryRequests)(requestId, action);
            res.status(200).json({
                status: 200,
                message: "Action Performed",
                data: result.message,
                success: true,
            });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const messageJSON = JSON.parse(error.message);
                const message = `${messageJSON[0].path[0]} is ${messageJSON[0].message}`;
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
