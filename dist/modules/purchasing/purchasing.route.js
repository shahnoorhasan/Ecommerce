"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasingRoute = void 0;
const express_1 = require("express");
const purchasing_controller_1 = require("./purchasing.controller");
const protection_middleware_1 = require("../../middlewares/protection.middleware");
const purchasingRoutes = (0, express_1.Router)();
exports.PurchasingRoute = purchasingRoutes;
purchasingRoutes.post("/purchasing/:id", protection_middleware_1.protection, purchasing_controller_1.createPurchasingHandler);
