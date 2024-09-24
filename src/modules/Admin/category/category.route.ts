import { Router } from "express";
import { findCategoryByIdHandler } from "./category.controller";
import { getAllCategoryHandler } from "./category.controller";
import { createCategoryHandler } from "./category.controller";
import { updateCategoryHandler } from "./category.controller";
import { deleteCategoryByIdHandler } from "./category.controller";
import { categoryWithProductHandler } from "./category.controller";

const adminCategoryRoutes = Router();

adminCategoryRoutes.get("/get-category-by-id:id", findCategoryByIdHandler);
adminCategoryRoutes.get("/get-all-category", getAllCategoryHandler);
adminCategoryRoutes.post("/create-category", createCategoryHandler);
adminCategoryRoutes.patch("update-category/:id", updateCategoryHandler);
adminCategoryRoutes.delete("/delete-category/:id", deleteCategoryByIdHandler);
adminCategoryRoutes.get(
  "/get-category-with-product/:id",
  categoryWithProductHandler
);

export { adminCategoryRoutes as AdminCategoryRoute };
