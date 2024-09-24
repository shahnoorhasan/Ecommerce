"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCategoryRoute = void 0;
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const category_controller_2 = require("./category.controller");
const category_controller_3 = require("./category.controller");
const category_controller_4 = require("./category.controller");
const category_controller_5 = require("./category.controller");
const category_controller_6 = require("./category.controller");
const adminCategoryRoutes = (0, express_1.Router)();
exports.AdminCategoryRoute = adminCategoryRoutes;
adminCategoryRoutes.get("/get-category-by-id:id", category_controller_1.findCategoryByIdHandler);
adminCategoryRoutes.get("/get-all-category", category_controller_2.getAllCategoryHandler);
adminCategoryRoutes.post("/create-category", category_controller_3.createCategoryHandler);
adminCategoryRoutes.patch("update-category/:id", category_controller_4.updateCategoryHandler);
adminCategoryRoutes.delete("/delete-category/:id", category_controller_5.deleteCategoryByIdHandler);
adminCategoryRoutes.get("/get-category-with-product/:id", category_controller_6.categoryWithProductHandler);
