"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userToVendorRequestRoute = void 0;
const express_1 = require("express");
const request_controller_1 = require("./request.controller");
const protection_middleware_1 = require("../../../middlewares/protection.middleware");
const UserToVendorRequestRoute = (0, express_1.Router)();
exports.userToVendorRequestRoute = UserToVendorRequestRoute;
UserToVendorRequestRoute.post("/send-vendor-request", protection_middleware_1.protection, request_controller_1.sendVendorRequestHandler);
