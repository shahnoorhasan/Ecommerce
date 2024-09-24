"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserRoute = void 0;
const express_1 = require("express");
const User_controller_1 = require("./User.controller");
const adminUserRoutes = (0, express_1.Router)();
exports.AdminUserRoute = adminUserRoutes;
adminUserRoutes.get("/Total-users", User_controller_1.totalUsersCountHandler);
adminUserRoutes.get("/Purchasing-Info", User_controller_1.allUsersPurchasingDataHandler);
