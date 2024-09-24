import { Router } from "express";
import { vendorCategoryRequestHandler } from "./request.controller";
import { protection } from "../../../middlewares/protection.middleware";

const vendorRequestRoutes = Router();

vendorRequestRoutes.post(
  "/category-vendor-request/:vendorId",
  protection,
  vendorCategoryRequestHandler
);

export { vendorRequestRoutes as VendorRequestRoute };
