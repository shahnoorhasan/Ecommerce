"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoute = void 0;
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const category_controller_2 = require("./category.controller");
const category_controller_3 = require("./category.controller");
const category_controller_4 = require("./category.controller");
const category_controller_5 = require("./category.controller");
const category_controller_6 = require("./category.controller");
const categoryRoutes = (0, express_1.Router)();
exports.categoryRoute = categoryRoutes;
categoryRoutes.get("/get-category-by-id:id", category_controller_1.findCategoryByIdHandler);
categoryRoutes.get("/get-all-category", category_controller_2.getAllCategoryHandler);
categoryRoutes.post("/create-category", category_controller_3.createCategoryHandler);
categoryRoutes.patch("update-category/:id", category_controller_4.updateCategoryHandler);
categoryRoutes.delete("/delete-category/:id", category_controller_5.deleteCategoryByIdHandler);
categoryRoutes.get("/get-category-with-product/:id", category_controller_6.categoryWithProductHandler);
