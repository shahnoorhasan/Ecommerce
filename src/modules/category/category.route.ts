import { Router } from "express";
import { findCategoryByIdHandler } from "./category.controller";
import { getAllCategoryHandler } from "./category.controller";
import { createCategoryHandler } from "./category.controller";
import { updateCategoryHandler } from "./category.controller";
import { deleteCategoryByIdHandler } from "./category.controller";
import { categoryWithProductHandler } from "./category.controller";

const categoryRoutes = Router();

categoryRoutes.get("/get-category-by-id:id", findCategoryByIdHandler);
categoryRoutes.get("/get-all-category", getAllCategoryHandler);
categoryRoutes.post("/create-category", createCategoryHandler);
categoryRoutes.patch("update-category/:id", updateCategoryHandler);
categoryRoutes.delete("/delete-category/:id", deleteCategoryByIdHandler);
categoryRoutes.get(
  "/get-category-with-product/:id",
  categoryWithProductHandler
);

export { categoryRoutes as categoryRoute };
