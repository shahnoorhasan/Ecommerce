import { Router } from "express";
import {
  countVendorMyProductsHandler,
  countVendorPurchasesHandler,
  deleteProductByNameHandler,
  findProductByIdHandler,
  OutOfStockProductsHandler,
  vendorTotalEarningsHandler,
} from "./product.controller";
import { getAllProductHandler } from "./product.controller";
import { createProductHandler } from "./product.controller";
import { updateProductHandler } from "./product.controller";
import { getVendorProductsHandler } from "./product.controller";
import { vendorProductsPurchasedHandler } from "./product.controller";
import { protection } from "../../../middlewares/protection.middleware";

const vendorProductRoutes = Router();
vendorProductRoutes.get(
  "/find-product/:id",
  protection,
  findProductByIdHandler
);
vendorProductRoutes.get("/get-all-products", protection, getAllProductHandler);
vendorProductRoutes.post(
  "/create-product/:id",
  protection,
  createProductHandler
);
vendorProductRoutes.get(
  "/View-Vendor-Products/:vendorId",
  protection,
  getVendorProductsHandler
);
vendorProductRoutes.get(
  "/vendor-products-purchased/:vendorId",
  protection,
  vendorProductsPurchasedHandler
);
vendorProductRoutes.get(
  "/vendor-purchase-counts/:vendorId",
  protection,
  countVendorPurchasesHandler
);

vendorProductRoutes.get(
  "/out-of-products/:vendorId",
  protection,
  OutOfStockProductsHandler
);

vendorProductRoutes.get(
  "/my-products-count/:vendorId",
  protection,
  countVendorMyProductsHandler
);

vendorProductRoutes.get(
  "/total-vendor-earnings/:vendorId",
  protection,
  vendorTotalEarningsHandler
);
vendorProductRoutes.patch(
  "/update-product/:id",
  protection,
  updateProductHandler
);
vendorProductRoutes.delete(
  "/delete-product",
  protection,
  deleteProductByNameHandler
);
export { vendorProductRoutes as VendorProductRoutes };
