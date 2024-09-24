"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorRequestRoute = void 0;
const express_1 = require("express");
const request_controller_1 = require("./request.controller");
const protection_middleware_1 = require("../../../middlewares/protection.middleware");
const vendorRequestRoutes = (0, express_1.Router)();
exports.VendorRequestRoute = vendorRequestRoutes;
vendorRequestRoutes.post("/category-vendor-request/:vendorId", protection_middleware_1.protection, request_controller_1.vendorCategoryRequestHandler);
