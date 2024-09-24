import { Router } from "express";
import { getAllCategoryHandler } from "./category.controller";
import { categoryWithProductHandler } from "./category.controller";
import { protection } from "../../../middlewares/protection.middleware";

const vendorCategoryRoutes = Router();

vendorCategoryRoutes.get(
  "/get-all-category",
  protection,
  getAllCategoryHandler
);
vendorCategoryRoutes.post(
  "/get-category-with-product",
  protection,
  categoryWithProductHandler
);

export { vendorCategoryRoutes as VendorCategoryRoute };
